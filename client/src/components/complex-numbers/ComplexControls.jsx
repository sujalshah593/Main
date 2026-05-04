import { motion } from 'framer-motion';
import { RefreshCcw, Plus, Minus, X, Save } from 'lucide-react';

export default function ComplexControls({ 
  z1, setZ1, 
  z2, setZ2, 
  operation, setOperation, 
  resetSimulator, addObservation 
}) {
  
  const handleZ1Change = (field, val) => {
    setZ1(prev => ({ ...prev, [field]: parseFloat(val) || 0 }));
  };

  const handleZ2Change = (field, val) => {
    setZ2(prev => ({ ...prev, [field]: parseFloat(val) || 0 }));
  };

  const handleSave = () => {
    // Calculate result based on operation
    let res = { real: 0, imag: 0 };
    if (operation === 'add') {
      res = { real: z1.real + z2.real, imag: z1.imag + z2.imag };
    } else if (operation === 'subtract') {
      res = { real: z1.real - z2.real, imag: z1.imag - z2.imag };
    } else if (operation === 'multiply') {
      res = { 
        real: z1.real * z2.real - z1.imag * z2.imag, 
        imag: z1.real * z2.imag + z1.imag * z2.real 
      };
    } else {
      res = { real: z1.real, imag: z1.imag };
    }

    const modulus = Math.sqrt(res.real ** 2 + res.imag ** 2).toFixed(2);

    addObservation({
      z1: `${z1.real} + ${z1.imag}i`,
      z2: operation === 'none' ? '-' : `${z2.real} + ${z2.imag}i`,
      op: operation.toUpperCase(),
      result: `${res.real.toFixed(2)} + ${res.imag.toFixed(2)}i`,
      real: res.real.toFixed(2),
      imag: res.imag.toFixed(2),
      modulus
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Inputs Panel */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 overflow-hidden min-w-0 flex flex-col gap-4">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3">Complex Number z₁</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-lab-muted">Re:</span>
              <input 
                type="number" 
                value={z1.real}
                onChange={(e) => handleZ1Change('real', e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-lab-muted">Im:</span>
              <input 
                type="number" 
                value={z1.imag}
                onChange={(e) => handleZ1Change('imag', e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className={`transition-all ${operation === 'none' ? 'opacity-30' : 'opacity-100'}`}>
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3">Complex Number z₂</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-lab-muted">Re:</span>
              <input 
                type="number" 
                value={z2.real}
                onChange={(e) => handleZ2Change('real', e.target.value)}
                disabled={operation === 'none'}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors disabled:opacity-50"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-lab-muted">Im:</span>
              <input 
                type="number" 
                value={z2.imag}
                onChange={(e) => handleZ2Change('imag', e.target.value)}
                disabled={operation === 'none'}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500/50 transition-colors disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Operation Selection */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 overflow-hidden min-w-0">
        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Mathematical Operation</h4>
        <div className="grid grid-cols-1 gap-2 h-full max-h-[140px] overflow-y-auto pr-1 custom-scrollbar">
          {[
            { id: 'none', label: 'Single Point Plot', icon: null },
            { id: 'add', label: 'Vector Addition', icon: <Plus size={14} /> },
            { id: 'subtract', label: 'Vector Subtraction', icon: <Minus size={14} /> },
            { id: 'multiply', label: 'Complex Multiplication', icon: <X size={14} /> },
          ].map((op) => (
            <button
              key={op.id}
              onClick={() => setOperation(op.id)}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-[11px] font-bold transition-all border ${
                operation === op.id 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                : 'bg-white/5 text-lab-muted border-white/5 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="truncate">{op.label}</span>
              {op.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="glass-panel p-4 rounded-xl border border-white/10 flex flex-col gap-3 overflow-hidden min-w-0">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">Actions & Records</h4>
        <p className="text-[10px] text-lab-muted leading-tight mb-2">Capture the current state to the observation table below.</p>
        
        <button
          onClick={handleSave}
          className="flex-1 min-h-[56px] flex flex-col items-center justify-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all shadow-lg shadow-indigo-600/20 border border-indigo-400/30 px-4 group"
        >
          <div className="flex items-center gap-2">
            <Save size={18} className="shrink-0 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold">Record Observation</span>
          </div>
          <span className="text-[10px] opacity-70 font-medium">Save z₁, z₂, and Result</span>
        </button>
        
        <button
          onClick={resetSimulator}
          className="h-10 flex items-center justify-center gap-2 bg-white/5 hover:bg-rose-500/10 text-lab-muted hover:text-rose-400 rounded-xl text-[12px] font-bold transition-all border border-white/10 px-4"
        >
          <RefreshCcw size={14} className="shrink-0" />
          Reset Workspace
        </button>
      </div>
    </div>
  );
}
