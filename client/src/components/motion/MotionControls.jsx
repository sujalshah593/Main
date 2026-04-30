import React from 'react';
import { Settings, Zap } from 'lucide-react';

export default function MotionControls({ 
  initialVelocity, setInitialVelocity,
  acceleration, setAcceleration,
  isNoiseEnabled, setIsNoiseEnabled,
  isPlaying 
}) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col gap-6">
      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
          <Settings size={16} className="text-sky-400" /> Motion Parameters
        </h3>
        
        <div className="space-y-4">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-600">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-slate-300 font-semibold">Initial Velocity (u)</label>
              <span className="text-sm font-mono text-sky-400 bg-black/40 px-2 py-1 rounded">{initialVelocity.toFixed(1)} m/s</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="20" 
              step="1" 
              value={initialVelocity} 
              onChange={(e) => setInitialVelocity(parseFloat(e.target.value))}
              disabled={isPlaying}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="bg-slate-900 p-4 rounded-lg border border-slate-600">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-slate-300 font-semibold">Acceleration (a)</label>
              <span className="text-sm font-mono text-emerald-400 bg-black/40 px-2 py-1 rounded">{acceleration.toFixed(1)} m/s²</span>
            </div>
            <input 
              type="range" 
              min="-5" 
              max="10" 
              step="0.5" 
              value={acceleration} 
              onChange={(e) => setAcceleration(parseFloat(e.target.value))}
              disabled={isPlaying}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
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
            <div className="text-sm font-bold text-slate-200">Measurement Noise</div>
            <div className="text-xs text-slate-400 mt-0.5">Simulates real-world sensor inaccuracies by adding slight random deviations to velocity and displacement logs.</div>
          </div>
        </label>
      </div>
    </div>
  );
}
