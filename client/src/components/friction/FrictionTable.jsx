import React from 'react';
import { Trash2, ClipboardList } from 'lucide-react';

export default function FrictionTable({ trials, removeTrial }) {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
          <ClipboardList size={16} className="text-sky-400" /> Observation Table
        </h3>
        <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-1 rounded-full font-bold">
          {trials.length} Trials
        </span>
      </div>

      <div className="overflow-auto flex-1 custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-slate-900/90 backdrop-blur-sm z-10">
            <tr className="text-[10px] text-slate-500 uppercase font-bold tracking-widest border-b border-slate-800">
              <th className="p-4">#</th>
              <th className="p-4">Surface</th>
              <th className="p-4">Normal (N)</th>
              <th className="p-4">Friction (N)</th>
              <th className="p-4">Type</th>
              <th className="p-4 text-center">μ</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {trials.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-500">
                    <ClipboardList size={32} strokeWidth={1} />
                    <p className="text-xs">No observations recorded yet.</p>
                  </div>
                </td>
              </tr>
            ) : (
              trials.map((t, i) => (
                <tr key={i} className="text-xs text-slate-300 hover:bg-slate-700/30 transition-colors">
                  <td className="p-4 font-mono text-slate-500">{i + 1}</td>
                  <td className="p-4 font-semibold text-white">{t.surfaceType}</td>
                  <td className="p-4 font-mono">{(t.normalForce).toFixed(2)}</td>
                  <td className="p-4 font-mono text-amber-400">{(t.frictionForce).toFixed(2)}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${t.isStatic ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                      {t.isStatic ? 'Static' : 'Kinetic'}
                    </span>
                  </td>
                  <td className="p-4 text-center font-bold text-sky-400">
                    {(t.frictionForce / t.normalForce).toFixed(3)}
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => removeTrial(i)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
