import React from 'react';
import { Ruler, Wind, Zap } from 'lucide-react';

export default function PendulumControls({ 
  length, setLength, 
  isDampingEnabled, setIsDampingEnabled, 
  isReactionErrorEnabled, setIsReactionErrorEnabled,
  isPlaying 
}) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
          <Ruler size={16} className="text-sky-400" /> Apparatus Controls
        </h3>
        
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-600">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-slate-300 font-semibold">String Length (L)</label>
            <span className="text-lg font-mono text-sky-400 bg-black/40 px-2 py-1 rounded">{length.toFixed(2)} m</span>
          </div>
          <input 
            type="range" 
            min="0.1" 
            max="1.0" 
            step="0.05" 
            value={length} 
            onChange={(e) => setLength(parseFloat(e.target.value))}
            disabled={isPlaying}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <p className="text-xs text-slate-500 mt-2">Adjustable from 0.1m to 1.0m</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
          <Zap size={16} className="text-amber-400" /> Error Simulation
        </h3>
        
        <div className="space-y-3">
          <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${isReactionErrorEnabled ? 'bg-amber-500/10 border-amber-500/30' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}>
            <div className="relative flex items-center mt-0.5">
              <input 
                type="checkbox" 
                className="peer sr-only"
                checked={isReactionErrorEnabled}
                onChange={() => setIsReactionErrorEnabled(!isReactionErrorEnabled)}
              />
              <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-200">Human Reaction Error</div>
              <div className="text-xs text-slate-400 mt-0.5">Adds a random delay (±0.1s - 0.2s) to your stopwatch clicks.</div>
            </div>
          </label>

          <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${isDampingEnabled ? 'bg-sky-500/10 border-sky-500/30' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}>
            <div className="relative flex items-center mt-0.5">
              <input 
                type="checkbox" 
                className="peer sr-only"
                checked={isDampingEnabled}
                onChange={() => setIsDampingEnabled(!isDampingEnabled)}
              />
              <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-500"></div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-200 flex items-center gap-2">Air Resistance <Wind size={14} className={isDampingEnabled ? 'text-sky-400' : 'text-slate-500'} /></div>
              <div className="text-xs text-slate-400 mt-0.5">Simulates slight damping, reducing amplitude over time.</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
