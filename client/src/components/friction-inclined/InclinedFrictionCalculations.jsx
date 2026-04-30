import React from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export default function InclinedFrictionCalculations({ trials }) {
  const lastTrial = trials[trials.length - 1];

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full">
      <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
        <Calculator size={16} className="text-amber-400" /> Mathematical Derivation
      </h3>

      {!lastTrial ? (
        <div className="flex flex-col items-center justify-center py-10 text-slate-500 gap-3">
          <Calculator size={40} strokeWidth={1} />
          <p className="text-xs text-center px-6 leading-relaxed">Record an angle of repose to see the calculation steps.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <h4 className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-3">Recorded State</h4>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Critical Angle (θ)</span>
                <span className="text-xs font-mono font-bold text-amber-400">{lastTrial.angle.toFixed(1)}°</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Normal Reaction (N)</span>
                <span className="text-xs font-mono font-bold text-slate-300">mg cos({lastTrial.angle.toFixed(1)}°)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Sliding Force (F)</span>
                <span className="text-xs font-mono font-bold text-slate-300">mg sin({lastTrial.angle.toFixed(1)}°)</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Logic Breakdown</h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 text-slate-400">1</div>
                <div className="text-[11px] text-slate-300 leading-relaxed">
                  At the limiting state, sliding force = limiting friction:
                  <div className="mt-1 p-2 bg-slate-900 rounded font-mono text-amber-400 text-center">
                    mg sin θ = μ mg cos θ
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 text-slate-400">2</div>
                <div className="text-[11px] text-slate-300 leading-relaxed">
                  Simplify the equation by canceling 'mg':
                  <div className="mt-1 p-2 bg-slate-900 rounded font-mono text-sky-400 text-center">
                    sin θ / cos θ = μ
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 text-slate-400">3</div>
                <div className="text-[11px] text-slate-300 leading-relaxed">
                  Apply trigonometric identity:
                  <div className="mt-1 p-2 bg-slate-900 rounded font-mono text-emerald-400 text-center">
                    μ = tan(θ) = tan({lastTrial.angle.toFixed(1)}°)
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex justify-between items-center p-3 bg-sky-500/10 rounded-lg border border-sky-500/20">
                  <span className="text-xs font-bold text-sky-300">Final Coefficient (μ)</span>
                  <span className="text-xl font-mono font-black text-sky-400">
                    {lastTrial.mu.toFixed(3)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
