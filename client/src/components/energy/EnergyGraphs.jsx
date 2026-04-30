import React from 'react';
import { Activity } from 'lucide-react';

export default function EnergyGraphs({ history }) {
  if (history.length < 5) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col items-center justify-center min-h-[300px]">
        <Activity size={48} className="text-slate-600 mb-4 animate-pulse" />
        <p className="text-slate-400 text-center text-sm">Release the ball and observe motion<br/>to generate real-time energy curves.</p>
      </div>
    );
  }

  // Filter to show a window of points
  const recentHistory = history.slice(-50);
  const maxE = Math.max(...recentHistory.map(p => p.pe + p.ke)) * 1.2;
  
  const width = 400;
  const height = 250;
  const padding = 40;

  const getX = (i) => padding + (i / (recentHistory.length - 1)) * (width - padding * 2);
  const getY = (e) => height - padding - (e / maxE) * (height - padding * 2);

  const pePath = recentHistory.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.pe)}`).join(' ');
  const kePath = recentHistory.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.ke)}`).join(' ');
  const tePath = recentHistory.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.pe + p.ke)}`).join(' ');

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
      <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
        <Activity size={16} className="text-emerald-400" /> Energy Transformation Graph
      </h3>
      
      <div className="bg-slate-900 rounded-lg border border-slate-600 p-2 flex-1 flex items-center justify-center relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-[300px] overflow-visible text-[10px]">
          {/* Grid Lines */}
          <line x1={padding} y1={getY(maxE/2)} x2={width-padding} y2={getY(maxE/2)} stroke="#1e293b" strokeDasharray="4 4" />
          
          {/* Axes */}
          <line x1={padding} y1={10} x2={padding} y2={height - padding} stroke="#475569" strokeWidth="2" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#475569" strokeWidth="2" />
          
          {/* Curves */}
          <path d={pePath} stroke="#f43f5e" strokeWidth="2" fill="none" className="transition-all duration-300" />
          <path d={kePath} stroke="#10b981" strokeWidth="2" fill="none" className="transition-all duration-300" />
          <path d={tePath} stroke="#ffffff" strokeWidth="2" strokeDasharray="5 5" fill="none" opacity="0.5" />

          {/* Labels */}
          <text x={width - padding} y={height - padding + 20} textAnchor="end" fill="#64748b" fontSize="10">Time →</text>
          <text x={padding - 10} y={20} textAnchor="end" fill="#64748b" transform={`rotate(-90 ${padding-10} 20)`} fontSize="10">Energy (Joules)</text>
        </svg>

        <div className="absolute top-4 right-4 flex flex-col gap-2 bg-slate-900/80 p-3 rounded-lg border border-slate-700 backdrop-blur-sm">
           <div className="flex items-center gap-2 text-[10px] font-bold text-rose-400">
              <div className="w-3 h-0.5 bg-rose-500"></div> Potential (U)
           </div>
           <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400">
              <div className="w-3 h-0.5 bg-emerald-500"></div> Kinetic (K)
           </div>
           <div className="flex items-center gap-2 text-[10px] font-bold text-white">
              <div className="w-3 h-0.5 border-t border-dashed border-white"></div> Total (E)
           </div>
        </div>
      </div>
      
      <p className="text-[10px] text-slate-500 mt-4 text-center italic">
        "Note how Potential Energy decreases as Kinetic Energy increases, maintaining a constant Total Energy."
      </p>
    </div>
  );
}
