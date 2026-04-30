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
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 h-full flex flex-col gap-4">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
        <Calculator size={12} className="text-purple-400" /> Equation Verification
      </h3>
      
      <div className="space-y-3">
        
        {/* First Equation Verification */}
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[10px] font-semibold text-slate-500">1. Verify v = u + at</div>
            {isAVerified ? <CheckCircle2 size={14} className="text-emerald-500" /> : <XCircle size={14} className="text-rose-500" />}
          </div>
          <div className="text-xs text-slate-300 font-mono space-y-0.5">
            <div>a = Δv / Δt = ({last.velocity.toFixed(1)} - {first.velocity.toFixed(1)}) / {deltaT.toFixed(1)}</div>
            <div className="pt-1.5 border-t border-slate-700/50 mt-1.5 flex justify-between">
              <span className="text-sky-400">Exp: {expA.toFixed(2)}</span>
              <span className="text-slate-500">True: {theoreticalA.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Second Equation Verification */}
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
          <div className="flex items-center justify-between mb-1.5">
            <div className="text-[10px] font-semibold text-slate-500">2. Verify s = ut + ½at²</div>
            {isSVerified ? <CheckCircle2 size={14} className="text-emerald-500" /> : <XCircle size={14} className="text-rose-500" />}
          </div>
          <div className="text-xs text-slate-300 font-mono space-y-0.5">
            <div>s = Area = ½(v₁ + v₂) * Δt</div>
            <div className="pt-1.5 border-t border-slate-700/50 mt-1.5 flex justify-between">
              <span className="text-purple-400">Exp: {expS.toFixed(2)}</span>
              <span className="text-slate-500">True: {theoreticalS.toFixed(1)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
