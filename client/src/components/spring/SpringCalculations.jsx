import React from 'react';
import { Calculator, CheckCircle2, XCircle } from 'lucide-react';

export default function SpringCalculations({ dataPoints, theoreticalK }) {
  if (dataPoints.length === 0) return null;

  const validPoints = dataPoints.filter(p => p.extension > 0);
  const kValues = validPoints.map(p => p.force / p.extension);
  const avgK = kValues.length > 0 ? kValues.reduce((a, b) => a + b, 0) / kValues.length : 0;
  
  const percentError = Math.abs((avgK - theoreticalK) / theoreticalK) * 100;
  const isVerified = percentError < 10; // Within 10%

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col gap-6">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
        <Calculator size={16} className="text-purple-400" /> Calculation Engine
      </h3>
      
      <div className="space-y-4">
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
          <div className="text-[10px] text-slate-500 uppercase font-bold mb-2">Governing Equation</div>
          <div className="text-xl font-mono text-white text-center py-2 bg-slate-800 rounded">
            F = k · x
          </div>
          <div className="text-[10px] text-slate-400 mt-2 text-center">
            k = Force (F) / Extension (x)
          </div>
        </div>

        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
           <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400">Experimental k (Average)</span>
              {isVerified ? <CheckCircle2 size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-rose-500" />}
           </div>
           
           <div className="space-y-2">
              <div className="flex justify-between text-sm">
                 <span className="text-slate-500">Calculated k:</span>
                 <span className="text-purple-400 font-mono font-bold">{avgK.toFixed(2)} N/m</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="text-slate-500">Theoretical k:</span>
                 <span className="text-slate-400 font-mono">{theoreticalK.toFixed(2)} N/m</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-xs">
                 <span className="text-slate-500">Percentage Error:</span>
                 <span className={`${percentError < 5 ? 'text-emerald-400' : 'text-amber-400'} font-mono`}>
                    {percentError.toFixed(2)}%
                 </span>
              </div>
           </div>
        </div>

        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
           <p className="text-[11px] text-indigo-300 leading-relaxed italic">
             "The spring constant (k) represents the stiffness of the spring. A higher k means a stiffer spring requiring more force for the same extension."
           </p>
        </div>
      </div>
    </div>
  );
}
