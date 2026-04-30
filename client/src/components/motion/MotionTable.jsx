import React from 'react';
import { Table, Trash2 } from 'lucide-react';

export default function MotionTable({ dataPoints, clearData }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-300 flex items-center gap-2">
          <Table size={20} className="text-sky-400" /> Logged Data
        </h3>
        <button 
          onClick={clearData}
          disabled={dataPoints.length === 0}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 disabled:opacity-50 transition-colors"
        >
          <Trash2 size={14} /> Clear
        </button>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar rounded-lg border border-slate-700">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="text-[11px] sm:text-xs text-slate-300 uppercase bg-slate-900/80 sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-400">Time (t) <br/><span className="lowercase text-[10px]">s</span></th>
              <th className="px-4 py-3 font-semibold text-rose-400">Velocity (v) <br/><span className="lowercase text-[10px]">m/s</span></th>
              <th className="px-4 py-3 font-semibold text-emerald-400">Displacement (s) <br/><span className="lowercase text-[10px]">m</span></th>
            </tr>
          </thead>
          <tbody>
            {dataPoints.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-8 text-center text-slate-500 italic">
                  Run the simulation to log data.
                </td>
              </tr>
            ) : (
              dataPoints.map((dp, index) => (
                <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-2 font-mono text-slate-300">{dp.time.toFixed(1)}</td>
                  <td className="px-4 py-2 font-mono text-rose-200">{dp.velocity.toFixed(2)}</td>
                  <td className="px-4 py-2 font-mono text-emerald-200">{dp.displacement.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
