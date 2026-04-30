import React from 'react';
import { Settings, Zap } from 'lucide-react';

export default function MotionControls({ 
  initialVelocity, setInitialVelocity,
  acceleration, setAcceleration,
  isNoiseEnabled, setIsNoiseEnabled,
  isPlaying 
}) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h3 className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-2">
            <Settings size={12} className="text-sky-400" /> Parameters
          </h3>
          
          <div className="space-y-3">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-600">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] text-slate-400 font-semibold">Initial Vel (u)</label>
                <span className="text-[10px] font-mono text-sky-400 bg-black/40 px-1.5 py-0.5 rounded">{initialVelocity} m/s</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="20" 
                step="1" 
                value={initialVelocity} 
                onChange={(e) => setInitialVelocity(parseFloat(e.target.value))}
                disabled={isPlaying}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-600">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] text-slate-400 font-semibold">Accel (a)</label>
                <span className="text-[10px] font-mono text-emerald-400 bg-black/40 px-1.5 py-0.5 rounded">{acceleration} m/s²</span>
              </div>
              <input 
                type="range" 
                min="-5" 
                max="10" 
                step="0.5" 
                value={acceleration} 
                onChange={(e) => setAcceleration(parseFloat(e.target.value))}
                disabled={isPlaying}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-2">
            <Zap size={12} className="text-amber-400" /> Errors
          </h3>
          
          <label className={`flex items-start gap-2 p-2 rounded-lg border cursor-pointer transition-colors h-full ${isNoiseEnabled ? 'bg-amber-500/5 border-amber-500/20' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}>
            <div className="relative flex items-center mt-0.5 scale-75">
              <input 
                type="checkbox" 
                className="peer sr-only"
                checked={isNoiseEnabled}
                onChange={() => setIsNoiseEnabled(!isNoiseEnabled)}
              />
              <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-300">Sensor Noise</div>
              <div className="text-[9px] text-slate-500 mt-0.5 leading-tight">Adds random scatter to velocity/displacement logs.</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
