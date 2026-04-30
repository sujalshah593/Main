import React from 'react';

export default function CalculationEngine({ trials, trueValue }) {
  if (trials.length === 0) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex items-center justify-center min-h-[300px]">
        <p className="text-slate-400">Perform at least one measurement to see calculations.</p>
      </div>
    );
  }

  const mean = trials.reduce((sum, t) => sum + t.measuredValue, 0) / trials.length;
  const absoluteErrors = trials.map(t => Math.abs(t.measuredValue - mean));
  const meanAbsoluteError = absoluteErrors.reduce((sum, e) => sum + e, 0) / trials.length;
  const relativeError = meanAbsoluteError / mean;
  const percentageError = relativeError * 100;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h3 className="text-lg font-bold text-slate-300 mb-6">Calculation Engine</h3>
      
      <div className="space-y-6">
        {/* Mean */}
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
          <div className="flex justify-between items-start mb-2">
            <span className="font-semibold text-sky-400">Mean Value (x̄)</span>
            <span className="font-mono text-lg">{mean.toFixed(4)}</span>
          </div>
          <div className="text-xs text-slate-400 font-mono bg-black/30 p-2 rounded">
            (Σx) / n = ({trials.map(t => t.measuredValue.toFixed(2)).join(' + ')}) / {trials.length}
          </div>
        </div>

        {/* Absolute Error */}
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
          <div className="flex justify-between items-start mb-2">
            <span className="font-semibold text-amber-400">Mean Absolute Error (Δx)</span>
            <span className="font-mono text-lg">{meanAbsoluteError.toFixed(4)}</span>
          </div>
          <div className="text-xs text-slate-400 font-mono bg-black/30 p-2 rounded overflow-x-auto custom-scrollbar whitespace-nowrap">
            (Σ|x - x̄|) / n = ({absoluteErrors.map(e => e.toFixed(2)).join(' + ')}) / {trials.length}
          </div>
        </div>

        {/* Relative & Percentage Error */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <div className="text-sm font-semibold text-emerald-400 mb-1">Relative Error</div>
            <div className="font-mono text-lg">{relativeError.toFixed(5)}</div>
            <div className="text-[10px] text-slate-500 mt-1">Δx / x̄</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
            <div className="text-sm font-semibold text-rose-400 mb-1">Percentage Error</div>
            <div className="font-mono text-lg">{percentageError.toFixed(2)}%</div>
            <div className="text-[10px] text-slate-500 mt-1">(Δx / x̄) * 100</div>
          </div>
        </div>

        {/* Final Representation */}
        <div className="mt-6 pt-4 border-t border-slate-700">
          <div className="text-center">
            <span className="text-sm text-slate-400 uppercase tracking-wider block mb-2">Final Measured Value</span>
            <span className="text-2xl font-mono font-bold text-white bg-slate-900 px-6 py-3 rounded-xl border border-slate-600 inline-block">
              {mean.toFixed(2)} ± {meanAbsoluteError.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
