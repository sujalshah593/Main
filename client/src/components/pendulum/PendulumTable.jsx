import React from 'react';
import { Trash2 } from 'lucide-react';

export default function PendulumTable({ trials, removeTrial, oscillationsN }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-300 mb-4">Observation Table</h3>
      
      <div className="flex-1 overflow-auto custom-scrollbar rounded-lg border border-slate-700">
        <table className="w-full text-left text-sm text-slate-400 min-w-[500px]">
          <thead className="text-[11px] sm:text-xs text-slate-300 uppercase bg-slate-900/80 sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              <th className="px-3 py-3 font-semibold">Trial</th>
              <th className="px-3 py-3 font-semibold text-sky-400">Length (L) <br/><span className="lowercase text-[10px] text-slate-500">meters</span></th>
              <th className="px-3 py-3 font-semibold text-rose-400">Time for {oscillationsN} osc. (t) <br/><span className="lowercase text-[10px] text-slate-500">sec</span></th>
              <th className="px-3 py-3 font-semibold text-emerald-400">Time Period (T) <br/><span className="lowercase text-[10px] text-slate-500">T = t/{oscillationsN}</span></th>
              <th className="px-3 py-3 font-semibold text-amber-400">T² <br/><span className="lowercase text-[10px] text-slate-500">sec²</span></th>
              <th className="px-3 py-3 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {trials.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-slate-500 italic">
                  No readings yet. Perform an experiment.
                </td>
              </tr>
            ) : (
              trials.map((trial, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-3 py-3 font-mono">{index + 1}</td>
                  <td className="px-3 py-3 font-mono text-sky-200">{trial.length.toFixed(2)}</td>
                  <td className="px-3 py-3 font-mono text-rose-200">{trial.timeForN.toFixed(2)}</td>
                  <td className="px-3 py-3 font-mono text-emerald-200">{trial.timePeriod.toFixed(3)}</td>
                  <td className="px-3 py-3 font-mono text-amber-200">{trial.tSquared.toFixed(3)}</td>
                  <td className="px-3 py-3 text-center">
                    <button 
                      onClick={() => removeTrial(index)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                    >
                      <Trash2 size={16} />
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
