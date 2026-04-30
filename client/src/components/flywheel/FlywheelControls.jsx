import React from 'react';
import { Settings, Weight, Radius, RotateCcw } from 'lucide-react';

export default function FlywheelControls({
  mass, setMass,
  radius, setRadius,
  numTurns, setNumTurns,
  isFrictionEnabled, setIsFrictionEnabled,
  isPlaying
}) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
        <Settings className="text-lab-accent3" size={20} />
        <h3 className="font-display font-bold text-white uppercase tracking-wider text-sm">Experiment Controls</h3>
      </div>

      {/* Mass Control */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
            <Weight size={14} className="text-lab-accent" /> Attached Mass (kg)
          </label>
          <span className="text-sm font-mono text-white font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
            {mass.toFixed(2)}
          </span>
        </div>
        <input 
          type="range" min="0.1" max="1.0" step="0.05"
          value={mass} onChange={(e) => setMass(parseFloat(e.target.value))}
          disabled={isPlaying}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-lab-accent"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
          <span>0.1 kg</span>
          <span>1.0 kg</span>
        </div>
      </div>

      {/* Radius Control */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
            <Radius size={14} className="text-lab-accent2" /> Axle Radius (m)
          </label>
          <span className="text-sm font-mono text-white font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
            {radius.toFixed(3)}
          </span>
        </div>
        <input 
          type="range" min="0.01" max="0.05" step="0.001"
          value={radius} onChange={(e) => setRadius(parseFloat(e.target.value))}
          disabled={isPlaying}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-lab-accent2"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
          <span>1 cm</span>
          <span>5 cm</span>
        </div>
      </div>

      {/* Number of Turns */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
            <RotateCcw size={14} className="text-amber-400" /> String Turns (N)
          </label>
          <span className="text-sm font-mono text-white font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
            {numTurns}
          </span>
        </div>
        <input 
          type="range" min="1" max="10" step="1"
          value={numTurns} onChange={(e) => setNumTurns(parseInt(e.target.value))}
          disabled={isPlaying}
          className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
          <span>1 Turn</span>
          <span>10 Turns</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3 mt-2">
        <label className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700 cursor-pointer hover:bg-slate-900 transition-colors">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">Bearing Friction</span>
          <div className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" checked={isFrictionEnabled} onChange={(e) => setIsFrictionEnabled(e.target.checked)}
              className="sr-only peer" disabled={isPlaying}
            />
            <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-lab-accent"></div>
          </div>
        </label>
      </div>
    </div>
  );
}
