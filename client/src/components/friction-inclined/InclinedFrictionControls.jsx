import React from 'react';
import { Layers, Compass, RotateCcw, Info } from 'lucide-react';

export default function InclinedFrictionControls({
  angle, setAngle,
  surfaceType, setSurfaceType,
  resetBlock
}) {
  const SURFACES = [
    'Wood on Wood',
    'Metal on Metal',
    'Rubber on Concrete',
    'Ice on Ice'
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Surface Selection */}
      <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
        <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          <Layers size={14} className="text-sky-400" /> Surface Material
        </label>
        <div className="grid grid-cols-2 gap-2">
          {SURFACES.map(s => (
            <button
              key={s}
              onClick={() => { setSurfaceType(s); resetBlock(); }}
              className={`px-3 py-2.5 rounded-lg text-xs font-semibold transition-all border ${surfaceType === s ? 'bg-sky-500 border-sky-400 text-white shadow-lg shadow-sky-500/20' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Angle Control */}
      <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Compass size={14} className="text-amber-400" /> Inclination Angle (θ)
          </label>
          <span className="text-sm font-mono text-amber-400 font-bold">{angle.toFixed(1)}°</span>
        </div>
        <input
          type="range"
          min="0"
          max="60"
          step="0.1"
          value={angle}
          onChange={(e) => setAngle(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-bold">
          <span>0°</span>
          <span>60°</span>
        </div>
        
        <div className="mt-6 flex gap-2">
           <button 
             onClick={() => setAngle(prev => Math.max(0, prev - 0.1))}
             className="flex-1 py-2 bg-slate-900 border border-slate-700 text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-800"
           >
             -0.1°
           </button>
           <button 
             onClick={() => setAngle(prev => Math.min(60, prev + 0.1))}
             className="flex-1 py-2 bg-slate-900 border border-slate-700 text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-800"
           >
             +0.1°
           </button>
        </div>
      </div>

      <button 
        onClick={resetBlock}
        className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
      >
        <RotateCcw size={18} /> Reset Position
      </button>

      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 flex gap-3">
        <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-200/70 leading-relaxed">
          Increase the angle slowly until the block <b>just begins to slide</b>. This critical angle is the <b>Angle of Repose</b>.
        </p>
      </div>
    </div>
  );
}
