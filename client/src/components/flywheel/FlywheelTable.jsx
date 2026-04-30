import React from 'react';
import { Trash2, Table as TableIcon } from 'lucide-react';

export default function FlywheelTable({ trials, removeTrial }) {
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col h-full">
      <div className="p-4 border-b border-slate-700 bg-slate-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TableIcon className="text-lab-accent2" size={18} />
          <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider">Observation Table</h3>
        </div>
        <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-slate-400 font-bold border border-slate-700 uppercase">
          {trials.length} Trials Recorded
        </span>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-slate-900/80 backdrop-blur-sm z-10">
            <tr>
              <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-700">#</th>
              <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-700 text-center">Mass (kg)</th>
              <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-700 text-center">t₁ (s)</th>
              <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-700 text-center">n₁</th>
              <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-700 text-center">t₂ (s)</th>
              <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-700 text-center">n₂</th>
              <th className="p-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-700 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {trials.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-sm text-slate-500 italic">
                  No observations recorded yet. Click 'Release' to start.
                </td>
              </tr>
            ) : (
              trials.map((trial, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                  <td className="p-3 text-xs font-mono text-slate-400">{idx + 1}</td>
                  <td className="p-3 text-xs font-mono text-white text-center">{trial.mass.toFixed(2)}</td>
                  <td className="p-3 text-xs font-mono text-emerald-400 text-center">{trial.t1.toFixed(2)}</td>
                  <td className="p-3 text-xs font-mono text-white text-center">{trial.n1}</td>
                  <td className="p-3 text-xs font-mono text-amber-400 text-center">{trial.t2.toFixed(2)}</td>
                  <td className="p-3 text-xs font-mono text-white text-center">{trial.n2.toFixed(1)}</td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => removeTrial(idx)}
                      className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded transition-all opacity-0 group-hover:opacity-100"
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
