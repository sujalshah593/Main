import React from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

export default function FrictionCalculations({ trials }) {
  const lastTrial = trials[trials.length - 1];

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full">
      <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
        <Calculator size={16} className="text-amber-400" /> Computation Engine
      </h3>

      {!lastTrial ? (
        <div className="flex flex-col items-center justify-center py-10 text-slate-500 gap-3">
          <Calculator size={40} strokeWidth={1} />
          <p className="text-xs text-center px-6 leading-relaxed">Add an observation to see the mathematical derivation.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <h4 className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-3">Recent Result</h4>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Surface</span>
                <span className="text-xs font-bold text-white">{lastTrial.surfaceType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Normal Force (N)</span>
                <span className="text-xs font-mono font-bold text-amber-400">{lastTrial.normalForce.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">Friction Force (F)</span>
                <span className="text-xs font-mono font-bold text-emerald-400">{lastTrial.frictionForce.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Step-by-Step Math</h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 text-slate-400">1</div>
                <div className="text-[11px] text-slate-300 leading-relaxed">
                  Calculate Normal Reaction (N):
                  <div className="mt-1 p-2 bg-slate-900 rounded font-mono text-amber-400">
                    N = m × g = {lastTrial.mass} × 9.81 = {lastTrial.normalForce.toFixed(2)} N
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 text-slate-400">2</div>
                <div className="text-[11px] text-slate-300 leading-relaxed">
                  Identify Frictional Force (F) from applied force at motion:
                  <div className="mt-1 p-2 bg-slate-900 rounded font-mono text-emerald-400">
                    F = {lastTrial.frictionForce.toFixed(2)} N
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-slate-700 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 text-slate-400">3</div>
                <div className="text-[11px] text-slate-300 leading-relaxed">
                  Compute Coefficient of Friction (μ):
                  <div className="mt-1 p-2 bg-slate-900 rounded font-mono text-sky-400">
                    μ = F / N = {lastTrial.frictionForce.toFixed(2)} / {lastTrial.normalForce.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex justify-between items-center p-3 bg-sky-500/10 rounded-lg border border-sky-500/20">
                  <span className="text-xs font-bold text-sky-300">Final Result (μ)</span>
                  <span className="text-xl font-mono font-black text-sky-400">
                    {(lastTrial.frictionForce / lastTrial.normalForce).toFixed(3)}
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
