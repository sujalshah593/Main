import React from 'react';
import { Calculator, Zap, ShieldAlert } from 'lucide-react';

export default function EnergyCalculations({ metrics, isFrictionEnabled }) {
  const { h, v, pe, ke } = metrics;
  const total = pe + ke;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col gap-6">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
        <Calculator size={16} className="text-purple-400" /> Calculation Engine
      </h3>
      
      <div className="space-y-4">
        {/* Instantaneous Values */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Potential (U)</div>
            <div className="text-sm font-mono text-rose-400 font-bold">{pe.toFixed(2)} J</div>
            <div className="text-[9px] text-slate-600 font-mono mt-1">m·g·h</div>
          </div>
          <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Kinetic (K)</div>
            <div className="text-sm font-mono text-emerald-400 font-bold">{ke.toFixed(2)} J</div>
            <div className="text-[9px] text-slate-600 font-mono mt-1">½·m·v²</div>
          </div>
        </div>

        {/* Total Energy Analysis */}
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
           <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Mechanical Energy</span>
              <div className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/10 text-white uppercase tracking-tighter">
                E = K + U
              </div>
           </div>
           
           <div className="text-3xl font-mono text-white font-bold text-center py-2">
              {total.toFixed(2)} <span className="text-sm font-normal text-slate-500">Joules</span>
           </div>

           <div className="mt-4 pt-4 border-t border-slate-800">
              {isFrictionEnabled ? (
                <div className="flex items-start gap-2 text-amber-500/80 italic">
                  <ShieldAlert size={14} className="mt-0.5 shrink-0" />
                  <p className="text-[10px]">Non-conservative forces (friction) are causing energy to dissipate as heat. Total energy will decrease over time.</p>
                </div>
              ) : (
                <div className="flex items-start gap-2 text-emerald-500/80 italic">
                  <Zap size={14} className="mt-0.5 shrink-0" />
                  <p className="text-[10px]">Ideal system: Total mechanical energy remains constant as it oscillates between Potential and Kinetic forms.</p>
                </div>
              )}
           </div>
        </div>

        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
           <p className="text-[11px] text-blue-300 leading-relaxed italic">
             "Energy cannot be created or destroyed, only transformed from one form to another."
           </p>
        </div>
      </div>
    </div>
  );
}
