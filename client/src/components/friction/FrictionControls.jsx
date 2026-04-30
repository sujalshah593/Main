import React from 'react';
import { Layers, Weight, Zap, Info } from 'lucide-react';

export default function FrictionControls({
  mass, setMass,
  surfaceType, setSurfaceType,
  appliedForce, setAppliedForce,
  isPlaying, setIsPlaying
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
              onClick={() => setSurfaceType(s)}
              className={`px-3 py-2.5 rounded-lg text-xs font-semibold transition-all border ${surfaceType === s ? 'bg-sky-500 border-sky-400 text-white shadow-lg shadow-sky-500/20' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Mass Control */}
      <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Weight size={14} className="text-amber-400" /> Mass of Block
          </label>
          <span className="text-sm font-mono text-amber-400 font-bold">{mass.toFixed(1)} kg</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="10"
          step="0.5"
          value={mass}
          onChange={(e) => setMass(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
        />
        <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-bold">
          <span>0.5 kg</span>
          <span>10 kg</span>
        </div>
      </div>

      {/* Applied Force Control */}
      <div className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50">
        <div className="flex justify-between items-center mb-4">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Zap size={14} className="text-emerald-400" /> Applied Pulling Force
          </label>
          <span className="text-sm font-mono text-emerald-400 font-bold">{appliedForce.toFixed(1)} N</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={appliedForce}
          onChange={(e) => setAppliedForce(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-bold">
          <span>0 N</span>
          <span>100 N</span>
        </div>
      </div>

      <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 flex gap-3">
        <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-200/70 leading-relaxed">
          Increase the <b>Applied Force</b> gradually until the block starts moving. Note the force at the exact moment of motion for <b>Static Friction</b>.
        </p>
      </div>
    </div>
  );
}
