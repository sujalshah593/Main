import React from 'react';
import { Play, RotateCcw, Zap, Settings2 } from 'lucide-react';

export default function EnergyControls({ 
  initialHeight, setInitialHeight,
  isFrictionEnabled, setIsFrictionEnabled,
  isReleased, setIsReleased,
  onReset
}) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
          <Settings2 size={16} className="text-sky-400" /> Setup Parameters
        </h3>
        
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-400 uppercase">Initial Height (h₀)</label>
              <span className="text-sky-400 font-mono font-bold bg-slate-900 px-2 py-1 rounded border border-slate-700">
                {initialHeight.toFixed(1)} m
              </span>
            </div>
            <input 
              type="range" 
              min="1" max="5" step="0.5"
              value={initialHeight}
              onChange={(e) => setInitialHeight(parseFloat(e.target.value))}
              disabled={isReleased}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500 disabled:opacity-50"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>1m</span>
              <span>5m</span>
            </div>
          </div>

          <div className="flex gap-3">
            {!isReleased ? (
              <button 
                onClick={() => setIsReleased(true)}
                className="flex-1 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Play size={16} /> Release Ball
              </button>
            ) : (
              <button 
                onClick={onReset}
                className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold transition-all border border-slate-600 flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} /> Reset Position
              </button>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
          <Zap size={16} className="text-amber-400" /> Environment Conditions
        </h3>
        
        <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${isFrictionEnabled ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}>
          <div className="relative flex items-center mt-0.5">
            <input 
              type="checkbox" 
              className="peer sr-only"
              checked={isFrictionEnabled}
              onChange={() => setIsFrictionEnabled(!isFrictionEnabled)}
            />
            <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-200">Friction & Air Resistance</div>
            <div className="text-xs text-slate-400 mt-0.5">Simulates energy loss over time (Real-world).</div>
          </div>
        </label>
      </div>
    </div>
  );
}
