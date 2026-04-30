import React from 'react';
import { Calculator, CheckCircle2, XCircle } from 'lucide-react';

export default function MotionCalculations({ dataPoints, theoreticalU, theoreticalA }) {
  if (dataPoints.length < 2) return null;

  // Grab first and last data point
  const first = dataPoints[0];
  const last = dataPoints[dataPoints.length - 1];

  const deltaT = last.time - first.time;
  if (deltaT === 0) return null;

  // 1. Verify Acceleration via slope of v-t
  const deltaV = last.velocity - first.velocity;
  const expA = deltaV / deltaT;
  const errorA = Math.abs(expA - theoreticalA);
  const percentErrorA = theoreticalA === 0 ? (errorA > 0.1 ? 100 : 0) : (errorA / Math.abs(theoreticalA)) * 100;
  const isAVerified = percentErrorA < 5.0; // 5% tolerance

  // 2. Verify Displacement via Area of v-t (Trapezoid rule)
  // Area = 1/2 * (v_initial + v_final) * t
  const expS = 0.5 * (first.velocity + last.velocity) * deltaT;
  const theoreticalS = (theoreticalU * deltaT) + (0.5 * theoreticalA * deltaT * deltaT);
  const errorS = Math.abs(expS - theoreticalS);
  const percentErrorS = theoreticalS === 0 ? 0 : (errorS / Math.abs(theoreticalS)) * 100;
  const isSVerified = percentErrorS < 5.0;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col gap-6">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
        <Calculator size={16} className="text-purple-400" /> Equation Verification
      </h3>
      
      <div className="space-y-4">
        
        {/* First Equation Verification */}
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-semibold text-slate-400">1. Verify v = u + at (Acceleration)</div>
            {isAVerified ? <CheckCircle2 size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-rose-500" />}
          </div>
          <div className="text-sm text-slate-300 font-mono space-y-1">
            <div>a = Slope = Δv / Δt</div>
            <div>a = ({last.velocity.toFixed(2)} - {first.velocity.toFixed(2)}) / {deltaT.toFixed(1)}</div>
            <div className="pt-2 border-t border-slate-700 mt-2">
              <span className="text-sky-400">Exp a: {expA.toFixed(2)} m/s²</span><br/>
              <span className="text-slate-500">True a: {theoreticalA.toFixed(2)} m/s²</span>
            </div>
            <div className={`text-xs mt-1 ${isAVerified ? 'text-emerald-400/80' : 'text-rose-400/80'}`}>
              Error: {percentErrorA.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Second Equation Verification */}
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-semibold text-slate-400">2. Verify s = ut + ½at² (Displacement)</div>
            {isSVerified ? <CheckCircle2 size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-rose-500" />}
          </div>
          <div className="text-sm text-slate-300 font-mono space-y-1">
            <div>s = Area of v-t Graph</div>
            <div>s = ½(v₁ + v₂) * Δt</div>
            <div>s = 0.5 * ({first.velocity.toFixed(2)} + {last.velocity.toFixed(2)}) * {deltaT.toFixed(1)}</div>
            <div className="pt-2 border-t border-slate-700 mt-2">
              <span className="text-purple-400">Exp s: {expS.toFixed(2)} m</span><br/>
              <span className="text-slate-500">True s: {theoreticalS.toFixed(2)} m</span>
            </div>
            <div className={`text-xs mt-1 ${isSVerified ? 'text-emerald-400/80' : 'text-rose-400/80'}`}>
              Error: {percentErrorS.toFixed(1)}%
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
