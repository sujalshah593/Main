import { useState } from 'react';
import { Table, CheckCircle, XCircle, Plus, Trash2 } from 'lucide-react';

export default function ObservationTable({ activeFunction, params, mode, challengeFunction }) {
  const [records, setRecords] = useState([]);
  const [inputX, setInputX] = useState('');
  const [inputY, setInputY] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const calculateTrueY = (x) => {
    const fnObj = challengeFunction || params; // In challenge mode, test against the mystery curve
    if (activeFunction === 'linear') {
      return fnObj.m * x + fnObj.c;
    } else if (activeFunction === 'quadratic') {
      return fnObj.a * x * x + fnObj.b * x + fnObj.k;
    } else if (activeFunction === 'exponential') {
      return fnObj.a * Math.exp(fnObj.b * x) + fnObj.k;
    } else if (activeFunction === 'logarithmic') {
      if (fnObj.b * x <= 0) return NaN;
      return fnObj.a * Math.log(fnObj.b * x) + fnObj.k;
    } else if (activeFunction === 'sigmoid') {
      return 1 / (1 + Math.exp(-fnObj.a * x));
    } else if (activeFunction === 'relu') {
      return Math.max(0, fnObj.a * x);
    }
    return 0;
  };

  const handleRecord = () => {
    setErrorMsg('');
    const x = parseFloat(inputX);
    const y = parseFloat(inputY);

    if (isNaN(x) || isNaN(y)) {
      setErrorMsg('Please enter valid numeric values for X and Y.');
      return;
    }

    const trueY = calculateTrueY(x);
    
    if (isNaN(trueY)) {
      setErrorMsg('Math Error: Function is undefined at this X value (e.g. logarithm of a negative number).');
      return;
    }

    // Allow a small tolerance for rounding errors
    const isCorrect = Math.abs(y - trueY) <= 0.1;

    const newRecord = {
      id: Date.now(),
      functionType: activeFunction,
      x: x,
      userY: y,
      trueY: trueY,
      isCorrect: isCorrect
    };

    setRecords([newRecord, ...records]);
    setInputX('');
    setInputY('');
  };

  const deleteRecord = (id) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const handleAutofill = (record) => {
    setInputX(record.x.toString());
    setInputY(record.trueY.toFixed(2));
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent2/50 shadow-lg flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
          <Table className="text-lab-accent2" size={20} />
          {mode === 'challenge' ? 'Challenge Observations' : 'Observation Table'}
        </h3>
        <span className="text-xs text-lab-muted bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
          {mode === 'challenge' ? 'Test points on the Mystery Curve' : 'Test your calculations'}
        </span>
      </div>

      {/* Data Entry Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end bg-[#0f172a]/60 p-4 rounded-xl border border-white/5">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-lab-muted">Enter X Value</label>
          <input 
            type="number" step="0.1" value={inputX} onChange={e => setInputX(e.target.value)}
            className="px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:border-lab-accent2 focus:outline-none transition-colors"
            placeholder="e.g. 2.5"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-lab-muted">Calculated Y Value</label>
          <div className="flex gap-2">
            <input 
              type="number" step="0.1" value={inputY} onChange={e => setInputY(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:border-lab-accent2 focus:outline-none transition-colors"
              placeholder="e.g. 5.0"
            />
            <button 
              onClick={handleRecord}
              className="h-[38px] px-3 bg-lab-accent2 text-slate-900 rounded-lg font-bold hover:bg-lab-accent2/90 transition-colors flex items-center justify-center"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {errorMsg && (
        <div className="text-red-400 text-xs font-bold bg-red-500/10 border border-red-500/20 py-2 px-3 rounded-lg">
          {errorMsg}
        </div>
      )}

      {/* Records Table */}
      <div className="overflow-x-auto rounded-xl border border-white/5 custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-white/5 text-xs uppercase tracking-wider text-lab-muted">
              <th className="p-4 font-semibold border-b border-white/5">Function</th>
              <th className="p-4 font-semibold border-b border-white/5">X</th>
              <th className="p-4 font-semibold border-b border-white/5">Your Y</th>
              <th className="p-4 font-semibold border-b border-white/5 text-center">Status</th>
              <th className="p-4 font-semibold border-b border-white/5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {records.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-lab-muted font-medium bg-black/20">
                  No observations recorded yet. Enter your calculations above.
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id} className="border-b border-white/5 bg-black/20 hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 text-white font-medium capitalize">{record.functionType}</td>
                  <td className="p-4 text-slate-300 font-mono">{record.x.toFixed(2)}</td>
                  <td className="p-4 text-slate-300 font-mono">{record.userY.toFixed(2)}</td>
                  <td className="p-4 text-center">
                    {record.isCorrect ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                        <CheckCircle size={14} /> Correct
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleAutofill(record)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold border border-red-500/20 hover:bg-red-500/20 transition-colors cursor-pointer"
                        title="Click to autofill correct answer"
                      >
                        <XCircle size={14} /> Incorrect
                      </button>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => deleteRecord(record.id)}
                      className="p-1.5 text-lab-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete Record"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
