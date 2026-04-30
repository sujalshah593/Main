import { useState } from 'react';
import { Table, CheckCircle, XCircle, Plus, Trash2, Trophy } from 'lucide-react';

export default function ObservationTable({ selectedObject, mode }) {
  const [records, setRecords] = useState([]);
  
  // User Inputs
  const [inputMass, setInputMass] = useState('');
  const [inputDim, setInputDim] = useState('');
  const [inputVolume, setInputVolume] = useState('');
  const [inputDensity, setInputDensity] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const handleRecord = () => {
    if (!selectedObject) return;
    setErrorMsg('');

    const mass = parseFloat(inputMass);
    const volume = parseFloat(inputVolume);
    const density = parseFloat(inputDensity);

    if (isNaN(mass) || isNaN(volume) || isNaN(density) || !inputDim) {
      setErrorMsg('Please fill out all numeric fields correctly.');
      return;
    }

    // Validation tolerances
    const isMassCorrect = Math.abs(mass - selectedObject.mass) <= 0.1;
    const isVolumeCorrect = Math.abs(volume - selectedObject.volume) <= 0.5;
    const isDensityCorrect = Math.abs(density - selectedObject.density) <= 0.1;

    let isDimCorrect = false;
    if (selectedObject.type === 'regular') {
      const inputDims = inputDim.toLowerCase().replace(/x|\*/g, ' ').split(/\s+/).filter(Boolean).map(s => parseFloat(s));
      const expectedDims = [...selectedObject.dimensions].sort();
      const sortedInputDims = [...inputDims].sort();
      
      if (inputDims.length === 3 && expectedDims.length === 3 && !sortedInputDims.some(isNaN)) {
        isDimCorrect = sortedInputDims.every((val, index) => Math.abs(val - expectedDims[index]) <= 0.1);
      }
    } else {
      const waterRise = parseFloat(inputDim);
      isDimCorrect = !isNaN(waterRise) && Math.abs(waterRise - selectedObject.volume) <= 0.5;
    }

    const isAllCorrect = isMassCorrect && isVolumeCorrect && isDensityCorrect && isDimCorrect;

    const newRecord = {
      id: Date.now(),
      objectName: selectedObject.name,
      mass,
      dimensions: inputDim,
      volume,
      density,
      isCorrect: isAllCorrect,
      trueDensity: selectedObject.density,
      trueMass: selectedObject.mass,
      trueVolume: selectedObject.volume,
      trueDim: selectedObject.type === 'regular' ? selectedObject.dimensions.join(' x ') : selectedObject.volume.toString()
    };

    setRecords([newRecord, ...records]);
    
    // Clear inputs
    setInputMass('');
    setInputDim('');
    setInputVolume('');
    setInputDensity('');
  };

  const deleteRecord = (id) => {
    setRecords(records.filter(r => r.id !== id));
  };

  const correctCount = records.filter(r => r.isCorrect).length;

  return (
    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent3/50 shadow-lg flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
          <Table className="text-lab-accent3" size={20} />
          Observation Table
        </h3>
        {mode === 'test' && (
          <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 font-bold text-sm shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Trophy size={16} /> Score: {correctCount} / {records.length}
          </div>
        )}
      </div>

      {/* Data Entry Form */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end bg-[#0f172a]/60 p-4 rounded-xl border border-white/5">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-lab-muted">Object</label>
          <div className="h-[38px] px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/50 flex items-center">
            {selectedObject?.name || 'None'}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-lab-muted">Mass (g)</label>
          <input 
            type="number" step="0.1" value={inputMass} onChange={e => setInputMass(e.target.value)}
            className="px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:border-lab-accent3 focus:outline-none transition-colors"
            placeholder="e.g. 50.0"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-lab-muted" title="For regular: LxBxH. For irregular: Water Rise">Dim/Rise</label>
          <input 
            type="text" value={inputDim} onChange={e => setInputDim(e.target.value)}
            className="px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:border-lab-accent3 focus:outline-none transition-colors"
            placeholder={selectedObject?.type === 'regular' ? "L x B x H" : "mL"}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-lab-muted">Vol (cm³)</label>
          <input 
            type="number" step="0.1" value={inputVolume} onChange={e => setInputVolume(e.target.value)}
            className="px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:border-lab-accent3 focus:outline-none transition-colors"
            placeholder="e.g. 10.0"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-lab-muted">Density (g/cm³)</label>
          <div className="flex gap-2">
            <input 
              type="number" step="0.01" value={inputDensity} onChange={e => setInputDensity(e.target.value)}
              className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:border-lab-accent3 focus:outline-none transition-colors"
              placeholder="e.g. 5.0"
            />
            <button 
              onClick={handleRecord}
              className="h-[38px] px-3 bg-lab-accent3 text-slate-900 rounded-lg font-bold hover:bg-lab-accent3/90 transition-colors flex items-center justify-center"
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
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-white/5 text-xs uppercase tracking-wider text-lab-muted">
              <th className="p-4 font-semibold border-b border-white/5">Object</th>
              <th className="p-4 font-semibold border-b border-white/5">Mass (g)</th>
              <th className="p-4 font-semibold border-b border-white/5">Dim/Rise</th>
              <th className="p-4 font-semibold border-b border-white/5">Vol (cm³)</th>
              <th className="p-4 font-semibold border-b border-white/5">Density (g/cm³)</th>
              <th className="p-4 font-semibold border-b border-white/5 text-center">Status</th>
              <th className="p-4 font-semibold border-b border-white/5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {records.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-lab-muted font-medium bg-black/20">
                  No observations recorded yet. Enter your calculations above.
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record.id} className="border-b border-white/5 bg-black/20 hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 text-white font-medium">{record.objectName}</td>
                  <td className="p-4 text-slate-300">{record.mass.toFixed(1)}</td>
                  <td className="p-4 text-slate-300 font-mono text-xs">{record.dimensions}</td>
                  <td className="p-4 text-slate-300">{record.volume.toFixed(1)}</td>
                  <td className="p-4 font-mono font-bold text-lab-accent3">{record.density.toFixed(2)}</td>
                  <td className="p-4 text-center">
                    {record.isCorrect ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                        <CheckCircle size={14} /> Correct
                      </div>
                    ) : (
                      <button 
                        onClick={() => {
                          setInputMass(record.trueMass.toString());
                          setInputDim(record.trueDim);
                          setInputVolume(record.trueVolume.toString());
                          setInputDensity(record.trueDensity.toString());
                        }}
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

      {records.length > 0 && records[0].isCorrect && (
        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4 flex items-center justify-center">
           <p className="text-emerald-400 font-bold font-display text-center">
              Result: The density of {records[0].objectName} is {records[0].trueDensity.toFixed(2)} g/cm³
           </p>
        </div>
      )}
    </div>
  );
}
