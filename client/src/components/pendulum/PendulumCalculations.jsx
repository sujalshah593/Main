import React from 'react';
import { Calculator } from 'lucide-react';

export default function PendulumCalculations({ trials, oscillationsN }) {
  if (trials.length === 0) {
    return null;
  }

  const latestTrial = trials[trials.length - 1];

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
      <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
        <Calculator size={16} className="text-emerald-400" /> Latest Trial Calculations
      </h3>
      
      <div className="space-y-4">
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
          <div className="text-xs font-semibold text-slate-400 mb-1">Time Period (T)</div>
          <div className="text-sm text-slate-300 font-mono">
            T = t / n <br/>
            T = {latestTrial.timeForN.toFixed(2)} / {oscillationsN} <br/>
            <span className="text-emerald-400 text-lg font-bold">T = {latestTrial.timePeriod.toFixed(3)} s</span>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
          <div className="text-xs font-semibold text-slate-400 mb-1">Square of Time Period (T²)</div>
          <div className="text-sm text-slate-300 font-mono">
            T² = ({latestTrial.timePeriod.toFixed(3)})² <br/>
            <span className="text-amber-400 text-lg font-bold">T² = {latestTrial.tSquared.toFixed(3)} s²</span>
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
          <div className="text-xs font-semibold text-slate-400 mb-1">Experimental Gravity (g)</div>
          <div className="text-sm text-slate-300 font-mono">
            g = 4π²L / T² <br/>
            g = 4(3.1415)²({latestTrial.length.toFixed(2)}) / {latestTrial.tSquared.toFixed(3)} <br/>
            <span className="text-sky-400 text-lg font-bold">
              g ≈ {((4 * Math.PI * Math.PI * latestTrial.length) / latestTrial.tSquared).toFixed(2)} m/s²
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
