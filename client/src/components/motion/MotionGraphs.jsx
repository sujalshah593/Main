import React from 'react';
import { LineChart, AreaChart } from 'lucide-react';

export default function MotionGraphs({ dataPoints, theoreticalU, theoreticalA }) {
  if (dataPoints.length < 2) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col items-center justify-center min-h-[400px]">
        <LineChart size={48} className="text-slate-600 mb-4" />
        <p className="text-slate-400">Record at least 2 data points to generate graphs.</p>
      </div>
    );
  }

  // Find max bounds for scaling
  const maxT = Math.max(1, ...dataPoints.map(dp => dp.time));
  const maxV = Math.max(1, theoreticalU + theoreticalA * maxT, ...dataPoints.map(dp => dp.velocity));
  const minV = Math.min(0, theoreticalU + theoreticalA * maxT, ...dataPoints.map(dp => dp.velocity));
  const maxS = Math.max(1, theoreticalU * maxT + 0.5 * theoreticalA * maxT * maxT, ...dataPoints.map(dp => dp.displacement));
  
  const width = 300;
  const height = 200;
  const paddingX = 40;
  const paddingY = 25;

  // Helpers to map data to SVG coordinates
  const getX = (t) => paddingX + (t / maxT) * (width - paddingX * 2);
  
  // v-t graph helpers
  const vRange = maxV - minV;
  const getY_v = (v) => height - paddingY - ((v - minV) / vRange) * (height - paddingY * 2);
  
  // s-t graph helpers
  const getY_s = (s) => height - paddingY - (s / maxS) * (height - paddingY * 2);

  // Path generators
  const vPointsPath = dataPoints.map((dp, i) => `${i === 0 ? 'M' : 'L'} ${getX(dp.time)} ${getY_v(dp.velocity)}`).join(' ');
  const sPointsPath = dataPoints.map((dp, i) => `${i === 0 ? 'M' : 'L'} ${getX(dp.time)} ${getY_s(dp.displacement)}`).join(' ');

  // Theoretical lines
  const vTheoPath = `M ${getX(0)} ${getY_v(theoreticalU)} L ${getX(maxT)} ${getY_v(theoreticalU + theoreticalA * maxT)}`;
  
  let sTheoPath = `M ${getX(0)} ${getY_s(0)}`;
  for (let t = 0; t <= maxT; t += maxT/20) {
    sTheoPath += ` L ${getX(t)} ${getY_s(theoreticalU * t + 0.5 * theoreticalA * t * t)}`;
  }

  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col gap-4 h-full">
      
      <div className="flex flex-col sm:flex-row gap-4 h-full">
        {/* V-T Graph */}
        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="text-[10px] font-bold text-slate-400 mb-1 flex items-center gap-2 uppercase">
            <LineChart size={12} className="text-rose-400" /> Velocity vs Time
          </h3>
          <div className="bg-slate-900 rounded-lg border border-slate-600 p-2 flex-1 flex items-center justify-center relative min-h-[150px]">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-[250px] overflow-visible text-slate-400 text-[8px]">
              {/* Zero line if minV < 0 */}
              {minV < 0 && <line x1={paddingX} y1={getY_v(0)} x2={width - paddingX} y2={getY_v(0)} stroke="#475569" strokeDasharray="2 2" />}
              
              {/* Axes */}
              <line x1={paddingX} y1={10} x2={paddingX} y2={height - paddingY} stroke="currentColor" />
              <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="currentColor" />
              
              {/* Theoretical Line */}
              <path d={vTheoPath} stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.5" />
              
              {/* Experimental Line */}
              <path d={vPointsPath} stroke="#fb7185" strokeWidth="1.5" fill="none" />
              
              {/* Data Points */}
              {dataPoints.map((dp, i) => (
                <circle key={i} cx={getX(dp.time)} cy={getY_v(dp.velocity)} r="2" fill="#fda4af" />
              ))}
            </svg>
            <div className="absolute top-1 right-1 flex flex-col items-end text-[7px]">
               <span className="text-rose-500 flex items-center gap-1"><div className="w-2 h-0.5 bg-rose-500"></div> Exp</span>
               <span className="text-rose-500/50 flex items-center gap-1"><div className="w-2 h-0.5 bg-rose-500/50 border-t border-dashed"></div> Theo</span>
            </div>
          </div>
        </div>

        {/* S-T Graph */}
        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="text-[10px] font-bold text-slate-400 mb-1 flex items-center gap-2 uppercase">
            <AreaChart size={12} className="text-emerald-400" /> Displacement vs Time
          </h3>
          <div className="bg-slate-900 rounded-lg border border-slate-600 p-2 flex-1 flex items-center justify-center relative min-h-[150px]">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-[250px] overflow-visible text-slate-400 text-[8px]">
              {/* Axes */}
              <line x1={paddingX} y1={10} x2={paddingX} y2={height - paddingY} stroke="currentColor" />
              <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="currentColor" />
              
              {/* Theoretical Line */}
              <path d={sTheoPath} stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.5" />
              
              {/* Experimental Line */}
              <path d={sPointsPath} stroke="#34d399" strokeWidth="1.5" fill="none" />
              
              {/* Data Points */}
              {dataPoints.map((dp, i) => (
                <circle key={i} cx={getX(dp.time)} cy={getY_s(dp.displacement)} r="2" fill="#6ee7b7" />
              ))}
            </svg>
            <div className="absolute top-1 right-1 flex flex-col items-end text-[7px]">
               <span className="text-emerald-500 flex items-center gap-1"><div className="w-2 h-0.5 bg-emerald-500"></div> Exp</span>
               <span className="text-emerald-500/50 flex items-center gap-1"><div className="w-2 h-0.5 bg-emerald-500/50 border-t border-dashed"></div> Theo</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
