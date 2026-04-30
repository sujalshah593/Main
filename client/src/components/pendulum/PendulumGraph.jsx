import React from 'react';
import { LineChart } from 'lucide-react';

export default function PendulumGraph({ trials }) {
  if (trials.length === 0) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center justify-center min-h-[300px]">
        <LineChart size={48} className="text-slate-600 mb-4" />
        <p className="text-slate-400">Record data to see the T² vs L graph.</p>
      </div>
    );
  }

  // Find max L and max T^2 for scaling
  const maxL = Math.max(1.0, ...trials.map(t => t.length));
  const maxT2 = Math.max(4.5, ...trials.map(t => t.tSquared));

  const width = 300;
  const height = 200;
  const paddingX = 40;
  const paddingY = 30;

  // Map data to SVG coordinates
  const getX = (L) => paddingX + (L / maxL) * (width - paddingX * 2);
  const getY = (T2) => height - paddingY - (T2 / maxT2) * (height - paddingY * 2);

  // Calculate line of best fit (y = mx + b)
  // Let's assume it passes through origin for simplicity: m = sum(xy) / sum(x^2)
  let sumXY = 0;
  let sumXX = 0;
  trials.forEach(t => {
    sumXY += t.length * t.tSquared;
    sumXX += t.length * t.length;
  });
  const m = sumXX === 0 ? 0 : sumXY / sumXX;

  // Best fit line points
  const lineX1 = getX(0);
  const lineY1 = getY(0);
  const lineX2 = getX(maxL);
  const lineY2 = getY(m * maxL);

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-300 mb-4 flex items-center gap-2">
        <LineChart size={20} className="text-amber-400" /> Graph: T² vs L
      </h3>
      
      <div className="flex-1 flex items-center justify-center bg-slate-900 rounded-lg border border-slate-600 p-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-[250px] overflow-visible text-slate-400 text-[10px]">
          {/* Axes */}
          <line x1={paddingX} y1={paddingY} x2={paddingX} y2={height - paddingY} stroke="currentColor" strokeWidth="1" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="currentColor" strokeWidth="1" />
          
          {/* Axis Labels */}
          <text x={width / 2} y={height - 5} fill="currentColor" textAnchor="middle">Length (m)</text>
          <text x={10} y={height / 2} fill="currentColor" transform={`rotate(-90 10 ${height / 2})`} textAnchor="middle">T² (s²)</text>

          {/* Grid lines & Tick Marks (approximate) */}
          {[0.2, 0.4, 0.6, 0.8, 1.0].map(val => (
             <React.Fragment key={`xtick-${val}`}>
               <line x1={getX(val)} y1={height - paddingY} x2={getX(val)} y2={height - paddingY + 4} stroke="currentColor" />
               <text x={getX(val)} y={height - paddingY + 14} fill="currentColor" textAnchor="middle">{val}</text>
             </React.Fragment>
          ))}
          {[1, 2, 3, 4].map(val => (
             <React.Fragment key={`ytick-${val}`}>
               <line x1={paddingX - 4} y1={getY(val)} x2={paddingX} y2={getY(val)} stroke="currentColor" />
               <text x={paddingX - 8} y={getY(val) + 3} fill="currentColor" textAnchor="end">{val}</text>
               <line x1={paddingX} y1={getY(val)} x2={width - paddingX} y2={getY(val)} stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2" />
             </React.Fragment>
          ))}

          {/* Line of Best Fit */}
          {trials.length > 1 && (
            <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY2} stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
          )}

          {/* Data Points */}
          {trials.map((t, i) => (
            <circle 
              key={i} 
              cx={getX(t.length)} 
              cy={getY(t.tSquared)} 
              r="4" 
              fill="#fbbf24" 
              className="cursor-pointer hover:r-6 transition-all duration-200"
            >
              <title>L: {t.length.toFixed(2)}m, T²: {t.tSquared.toFixed(2)}s²</title>
            </circle>
          ))}
        </svg>
      </div>

      {trials.length > 1 && (
        <div className="mt-4 text-xs text-slate-400 bg-slate-900 p-3 rounded-lg border border-slate-700">
          <p className="font-semibold text-sky-400 mb-1">Slope (m) = {m.toFixed(3)} s²/m</p>
          <p>Experimental g = 4π² / m = <span className="font-mono text-emerald-400">{((4 * Math.PI * Math.PI) / m).toFixed(2)} m/s²</span></p>
          <p className="text-[10px] mt-1 text-slate-500">(True g ≈ 9.81 m/s²)</p>
        </div>
      )}
    </div>
  );
}
