import React from 'react';
import { LineChart } from 'lucide-react';

export default function FlywheelGraph({ trials }) {
  if (trials.length === 0) {
    return (
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center justify-center min-h-[300px]">
        <LineChart size={48} className="text-slate-600 mb-4" />
        <p className="text-slate-400">Record trials to see the ω vs t graph.</p>
      </div>
    );
  }

  const width = 300;
  const height = 200;
  const paddingX = 40;
  const paddingY = 30;

  // We'll plot the latest trial or all trials? Let's plot the latest trial's acceleration and retardation
  const trial = trials[trials.length - 1];
  const maxT = trial.t1 + trial.t2;
  const maxOmega = trial.omega;

  const getX = (t) => paddingX + (t / maxT) * (width - paddingX * 2);
  const getY = (w) => height - paddingY - (w / maxOmega) * (height - paddingY * 2);

  // Points for the graph: (0,0) -> (t1, omega) -> (t1+t2, 0)
  const p1 = { x: getX(0), y: getY(0) };
  const p2 = { x: getX(trial.t1), y: getY(trial.omega) };
  const p3 = { x: getX(trial.t1 + trial.t2), y: getY(0) };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
      <h3 className="text-lg font-bold text-slate-300 mb-4 flex items-center gap-2">
        <LineChart size={20} className="text-lab-accent3" /> Angular Velocity vs Time
      </h3>
      
      <div className="flex-1 flex items-center justify-center bg-slate-900 rounded-lg border border-slate-600 p-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-[250px] overflow-visible text-slate-400 text-[10px]">
          {/* Axes */}
          <line x1={paddingX} y1={paddingY} x2={paddingX} y2={height - paddingY} stroke="currentColor" strokeWidth="1" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="currentColor" strokeWidth="1" />
          
          {/* Axis Labels */}
          <text x={width / 2} y={height - 5} fill="currentColor" textAnchor="middle">Time (s)</text>
          <text x={10} y={height / 2} fill="currentColor" transform={`rotate(-90 10 ${height / 2})`} textAnchor="middle">ω (rad/s)</text>

          {/* Graph Line */}
          <polyline 
            points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Points */}
          <circle cx={p1.x} cy={p1.y} r="3" fill="#fff" />
          <circle cx={p2.x} cy={p2.y} r="4" fill="#fbbf24" />
          <circle cx={p3.x} cy={p3.y} r="3" fill="#fff" />

          {/* Labels for key points */}
          <text x={p2.x} y={p2.y - 10} fill="#fbbf24" textAnchor="middle" className="font-bold">ω_max</text>
          <text x={p2.x} y={height - paddingY + 12} fill="currentColor" textAnchor="middle">t₁</text>
          <text x={p3.x} y={height - paddingY + 12} fill="currentColor" textAnchor="middle">t₁+t₂</text>
        </svg>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-xs p-2 bg-slate-900 rounded border border-slate-700">
          <span className="text-slate-400 font-semibold uppercase tracking-wider">Max Velocity</span>
          <span className="text-emerald-400 font-mono">{trial.omega.toFixed(2)} rad/s</span>
        </div>
        <div className="flex justify-between text-xs p-2 bg-slate-900 rounded border border-slate-700">
          <span className="text-slate-400 font-semibold uppercase tracking-wider">Avg. Acceleration</span>
          <span className="text-amber-400 font-mono">{(trial.omega / trial.t1).toFixed(2)} rad/s²</span>
        </div>
      </div>
    </div>
  );
}
