import React from 'react';
import { Settings, Zap, Plus, Minus } from 'lucide-react';

export default function SpringControls({ 
  mass, setMass, 
  isNoiseEnabled, setIsNoiseEnabled,
  onLogData
}) {
  const addMass = (val) => setMass(prev => Math.min(5, prev + val));
  const subMass = (val) => setMass(prev => Math.max(0, prev - val));

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
          <Settings size={16} className="text-sky-400" /> Load Controls
        </h3>
        
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-600 text-center">
             <div className="text-xs text-slate-500 uppercase font-bold mb-2 tracking-widest">Current Mass</div>
             <div className="text-3xl font-mono text-sky-400 font-bold mb-4">{mass.toFixed(2)} kg</div>
             
             <div className="grid grid-cols-2 gap-3">
                <button onClick={() => addMass(0.1)} className="flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 text-sky-400 border border-sky-500/30 rounded-lg transition-all text-xs font-bold">
                   <Plus size={14} /> 0.1kg
                </button>
                <button onClick={() => subMass(0.1)} className="flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 rounded-lg transition-all text-xs font-bold">
                   <Minus size={14} /> 0.1kg
                </button>
                <button onClick={() => addMass(0.5)} className="flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 text-sky-400 border border-sky-500/30 rounded-lg transition-all text-xs font-bold">
                   <Plus size={14} /> 0.5kg
                </button>
                <button onClick={() => subMass(0.5)} className="flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 border border-slate-700 rounded-lg transition-all text-xs font-bold">
                   <Minus size={14} /> 0.5kg
                </button>
             </div>
          </div>

          <button 
            onClick={onLogData}
            className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Log Current Reading
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
          <Zap size={16} className="text-amber-400" /> Error Simulation
        </h3>
        
        <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${isNoiseEnabled ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}>
          <div className="relative flex items-center mt-0.5">
            <input 
              type="checkbox" 
              className="peer sr-only"
              checked={isNoiseEnabled}
              onChange={() => setIsNoiseEnabled(!isNoiseEnabled)}
            />
            <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-200">Parallax Error</div>
            <div className="text-xs text-slate-400 mt-0.5">Introduces slight reading uncertainty in extension.</div>
          </div>
        </label>
      </div>
    </div>
  );
}
