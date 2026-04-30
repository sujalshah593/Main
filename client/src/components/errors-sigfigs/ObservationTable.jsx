import React from 'react';
import { Trash2 } from 'lucide-react';

export default function ObservationTable({ trials, removeTrial }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-300 mb-4">Observation Table</h3>
      
      <div className="flex-1 overflow-auto custom-scrollbar rounded-lg border border-slate-700">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="text-xs text-slate-300 uppercase bg-slate-900/80 sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              <th className="px-4 py-3 font-semibold">Trial</th>
              <th className="px-4 py-3 font-semibold">Measured Value</th>
              <th className="px-4 py-3 font-semibold text-rose-400">Total Error</th>
              <th className="px-4 py-3 font-semibold text-emerald-400">True Value (Ideal)</th>
              <th className="px-4 py-3 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {trials.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-slate-500 italic">
                  No readings yet. Perform a measurement.
                </td>
              </tr>
            ) : (
              trials.map((trial, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3 font-mono">{index + 1}</td>
                  <td className="px-4 py-3 font-mono text-white">{trial.measuredValue.toFixed(4)}</td>
                  <td className="px-4 py-3 font-mono text-rose-300">{trial.error.toFixed(4)}</td>
                  <td className="px-4 py-3 font-mono text-emerald-300">{(trial.measuredValue - trial.error).toFixed(4)}</td>
                  <td className="px-4 py-3 text-center">
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
