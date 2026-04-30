import React from 'react';
import { LineChart } from 'lucide-react';

export default function SpringGraphs({ dataPoints, theoreticalK }) {
  if (dataPoints.length < 2) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col items-center justify-center min-h-[300px]">
        <LineChart size={48} className="text-slate-600 mb-4" />
        <p className="text-slate-400">Log at least 2 data points to generate graph.</p>
      </div>
    );
  }

  // Find max bounds
  const maxX = Math.max(0.1, ...dataPoints.map(dp => dp.extension));
  const maxF = Math.max(1, ...dataPoints.map(dp => dp.force));
  
  const width = 300;
  const height = 200;
  const paddingX = 40;
  const paddingY = 30;

  const getX = (x) => paddingX + (x / maxX) * (width - paddingX * 2);
  const getY = (f) => height - paddingY - (f / maxF) * (height - paddingY * 2);

  // Paths
  const pointsPath = dataPoints
    .sort((a, b) => a.extension - b.extension)
    .map((dp, i) => `${i === 0 ? 'M' : 'L'} ${getX(dp.extension)} ${getY(dp.force)}`)
    .join(' ');

  // Theoretical line (Force = k * extension)
  const theoX = maxX;
  const theoF = theoreticalK * theoX;
  const theoLine = `M ${getX(0)} ${getY(0)} L ${getX(theoX)} ${getY(theoF)}`;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
      <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
        <LineChart size={16} className="text-rose-400" /> Force vs Extension
      </h3>
      
      <div className="bg-slate-900 rounded-lg border border-slate-600 p-2 flex-1 flex items-center justify-center relative min-h-[250px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-[300px] overflow-visible text-slate-400 text-[8px]">
          {/* Axes */}
          <line x1={paddingX} y1={10} x2={paddingX} y2={height - paddingY} stroke="currentColor" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="currentColor" />
          
          {/* Labels */}
          <text x={width/2} y={height - 5} textAnchor="middle" fill="#94a3b8">Extension (x) [m]</text>
          <text x={10} y={height/2} textAnchor="middle" fill="#94a3b8" transform={`rotate(-90 10 ${height/2})`}>Force (F) [N]</text>

          {/* Theoretical Line */}
          <path d={theoLine} stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.3" />
          
          {/* Data Line */}
          <path d={pointsPath} stroke="#38bdf8" strokeWidth="1.5" fill="none" />
          
          {/* Points */}
          {dataPoints.map((dp, i) => (
            <circle key={i} cx={getX(dp.extension)} cy={getY(dp.force)} r="3" fill="#38bdf8" />
          ))}
        </svg>

        <div className="absolute top-2 right-2 flex flex-col items-end text-[10px]">
           <span className="text-sky-400 flex items-center gap-1"><div className="w-2 h-0.5 bg-sky-400"></div> Exp. Data</span>
           <span className="text-rose-500/50 flex items-center gap-1"><div className="w-2 h-0.5 bg-rose-500/50 border-t border-dashed"></div> Theoretical</span>
        </div>
      </div>
      <p className="text-[10px] text-slate-500 mt-2 text-center italic">The slope of this graph equals the Spring Constant (k).</p>
    </div>
  );
}
