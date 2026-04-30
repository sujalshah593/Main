import React from 'react';
import { Table2, Camera } from 'lucide-react';

export default function EnergyTable({ readings, onSnapshot, isReleased }) {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-slate-300 flex items-center gap-2">
          <Table2 size={20} className="text-sky-400" /> Observation Table
        </h3>
        <button 
          onClick={onSnapshot}
          disabled={!isReleased}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg bg-sky-500 hover:bg-sky-600 text-white disabled:opacity-50 transition-all shadow-lg shadow-sky-500/20"
        >
          <Camera size={16} /> Capture Point
        </button>
      </div>
      
      <div className="flex-1 overflow-auto custom-scrollbar rounded-lg border border-slate-700">
        <table className="w-full text-left text-xs text-slate-400">
          <thead className="text-slate-300 uppercase bg-slate-900/80 sticky top-0 z-10 backdrop-blur-sm">
            <tr>
              <th className="px-3 py-3 font-semibold">Point</th>
              <th className="px-3 py-3 font-semibold text-sky-400">Height (m)</th>
              <th className="px-3 py-3 font-semibold text-amber-400">Velocity (m/s)</th>
              <th className="px-3 py-3 font-semibold text-rose-400">PE (J)</th>
              <th className="px-3 py-3 font-semibold text-emerald-400">KE (J)</th>
              <th className="px-3 py-3 font-semibold text-white">Total (J)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {readings.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-12 text-center text-slate-500 italic">
                  Capture points during motion to analyze energy transformation.
                </td>
              </tr>
            ) : (
              readings.map((r, i) => (
                <tr key={i} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-3 py-2 text-slate-500">{i + 1}</td>
                  <td className="px-3 py-2 font-mono text-sky-300">{r.h.toFixed(2)}</td>
                  <td className="px-3 py-2 font-mono text-amber-300">{r.v.toFixed(2)}</td>
                  <td className="px-3 py-2 font-mono text-rose-300">{r.pe.toFixed(2)}</td>
                  <td className="px-3 py-2 font-mono text-emerald-300">{r.ke.toFixed(2)}</td>
                  <td className="px-3 py-2 font-mono text-white font-bold">{r.total.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
