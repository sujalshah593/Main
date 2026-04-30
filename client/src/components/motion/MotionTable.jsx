import React from 'react';
import { Table, Trash2 } from 'lucide-react';

export default function MotionTable({ dataPoints, clearData }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 h-full flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2 uppercase tracking-tight">
          <Table size={16} className="text-sky-400" /> Logged Data
        </h3>
        <button 
          onClick={clearData}
          disabled={dataPoints.length === 0}
          className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-semibold rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 disabled:opacity-50 transition-colors"
        >
          <Trash2 size={12} /> Clear
        </button>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar rounded-lg border border-slate-700 max-h-[300px]">
        <table className="w-full text-left text-xs text-slate-400">
          <thead className="text-[10px] text-slate-400 uppercase bg-slate-900/80 sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              <th className="px-3 py-2 font-semibold border-b border-slate-700">Time (s)</th>
              <th className="px-3 py-2 font-semibold border-b border-slate-700 text-rose-400/80">Vel (m/s)</th>
              <th className="px-3 py-2 font-semibold border-b border-slate-700 text-emerald-400/80">Dist (m)</th>
            </tr>
          </thead>
          <tbody>
            {dataPoints.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-3 py-6 text-center text-slate-500 italic text-[11px]">
                  No data points logged yet.
                </td>
              </tr>
            ) : (
              dataPoints.map((dp, index) => (
                <tr key={index} className="border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors">
                  <td className="px-3 py-1.5 font-mono text-slate-300">{dp.time.toFixed(1)}</td>
                  <td className="px-3 py-1.5 font-mono text-rose-200">{dp.velocity.toFixed(2)}</td>
                  <td className="px-3 py-1.5 font-mono text-emerald-200">{dp.displacement.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
