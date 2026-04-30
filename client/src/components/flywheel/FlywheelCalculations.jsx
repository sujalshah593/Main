import React from 'react';
import { Calculator, Info } from 'lucide-react';

export default function FlywheelCalculations({ trials }) {
  if (trials.length === 0) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center justify-center min-h-[300px]">
        <Calculator size={48} className="text-slate-600 mb-4" />
        <p className="text-slate-400">Complete a trial to see calculations.</p>
      </div>
    );
  }

  const trial = trials[trials.length - 1];
  const g = 9.81;
  const h = 2 * Math.PI * trial.radius * trial.n1;
  const v = trial.radius * trial.omega;
  
  // I = m(2gh - v^2) / (omega^2 * (1 + n1/n2))
  const numerator = trial.mass * (2 * g * h - v * v);
  const denominator = trial.omega * trial.omega * (1 + trial.n1 / trial.n2);
  const I = numerator / denominator;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col gap-4">
      <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
        <Calculator className="text-emerald-400" size={20} />
        <h3 className="font-display font-bold text-white uppercase tracking-wider text-sm">Step-by-Step Calculations</h3>
      </div>

      <div className="space-y-6 text-sm">
        {/* Step 1 */}
        <div className="p-4 bg-slate-900 rounded-lg border-l-4 border-emerald-500">
          <p className="text-slate-400 font-bold mb-2 uppercase text-[10px] tracking-widest">Step 1: Angular Velocity (ω)</p>
          <div className="font-mono text-white space-y-1">
            <p>ω = 4πn₂ / t₂</p>
            <p>ω = (4 * π * {trial.n2}) / {trial.t2.toFixed(2)}</p>
            <p className="text-emerald-400 font-bold">= {trial.omega.toFixed(3)} rad/s</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="p-4 bg-slate-900 rounded-lg border-l-4 border-sky-500">
          <p className="text-slate-400 font-bold mb-2 uppercase text-[10px] tracking-widest">Step 2: Linear Velocity & Height</p>
          <div className="font-mono text-white space-y-2">
            <div>
              <p>h = 2πrn₁ = 2 * π * {trial.radius} * {trial.n1}</p>
              <p className="text-sky-400">= {h.toFixed(3)} m</p>
            </div>
            <div>
              <p>v = rω = {trial.radius} * {trial.omega.toFixed(2)}</p>
              <p className="text-sky-400">= {v.toFixed(3)} m/s</p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="p-4 bg-slate-900 rounded-lg border-l-4 border-amber-500">
          <p className="text-slate-400 font-bold mb-2 uppercase text-[10px] tracking-widest">Step 3: Moment of Inertia (I)</p>
          <div className="font-mono text-white text-xs space-y-2 overflow-x-auto pb-2">
            <p>I = [m(2gh - v²)] / [ω²(1 + n₁/n₂)]</p>
            <p>I = [{trial.mass}(2*9.81*{h.toFixed(2)} - {v.toFixed(2)}²)] / [{trial.omega.toFixed(2)}²(1 + {trial.n1}/{trial.n2})]</p>
            <p className="text-amber-400 font-bold text-lg">= {I.toFixed(4)} kg·m²</p>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-start gap-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <Info size={16} className="text-blue-400 mt-0.5 shrink-0" />
        <p className="text-[11px] text-blue-300/80 leading-relaxed">
          The formula accounts for potential energy conversion and energy lost to bearing friction during the rotation phase.
        </p>
      </div>
    </div>
  );
}
