import React from 'react';
import { Calculator, Compass, MoveUpRight, AlertTriangle } from 'lucide-react';

export default function AnalysisPanel({ activeFn, point, mode, optimizationStepCount, path }) {
  
  const currentZ = activeFn.computeValue(point.x, point.y);
  const gradX = activeFn.computeDx(point.x, point.y);
  const gradY = activeFn.computeDy(point.x, point.y);
  const gradMag = Math.sqrt(gradX * gradX + gradY * gradY);

  const prevZ = path.length > 1 ? path[path.length - 2].z : currentZ;
  const deltaZ = currentZ - prevZ;

  return (
    <div className="glass-panel p-5 rounded-2xl border-t-2 border-t-amber-500/50 shadow-lg relative z-20">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
          <Calculator size={20} />
        </div>
        <h2 className="text-xl font-bold text-white">Analysis & Metrics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Current Value */}
        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
          <h3 className="text-xs uppercase tracking-wider text-lab-muted font-bold mb-2">Function Value</h3>
          <div className="text-xl font-mono font-bold text-white">
            f(x,y) = <span className="text-amber-400">{currentZ.toFixed(3)}</span>
          </div>
          <div className="text-xs text-lab-muted mt-2 font-mono">
            {activeFn.formula}
          </div>
        </div>

        {/* Partial Derivatives */}
        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
          <h3 className="text-xs uppercase tracking-wider text-lab-muted font-bold mb-2">Partials</h3>
          <div className="space-y-1 font-mono text-sm">
            <div className="flex justify-between">
              <span>∂f/∂x = </span>
              <span className="text-sky-400">{gradX.toFixed(3)}</span>
            </div>
            <div className="flex justify-between">
              <span>∂f/∂y = </span>
              <span className="text-emerald-400">{gradY.toFixed(3)}</span>
            </div>
          </div>
        </div>

        {/* Gradient */}
        <div className="bg-black/20 p-4 rounded-xl border border-white/5">
          <h3 className="text-xs uppercase tracking-wider text-lab-muted font-bold mb-2 flex items-center gap-1">
            <Compass size={12}/> Gradient ∇f
          </h3>
          <div className="font-mono text-sm text-center bg-white/5 p-1 rounded mb-2">
            [{gradX.toFixed(2)}, {gradY.toFixed(2)}]
          </div>
          <div className="flex justify-between items-center text-xs text-lab-muted">
            <span>Magnitude:</span>
            <span className="text-white font-mono">{gradMag.toFixed(3)}</span>
          </div>
        </div>

        {/* Optimization Progress */}
        {mode === 'optimize' ? (
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h3 className="text-xs uppercase tracking-wider text-lab-muted font-bold mb-2 flex items-center gap-1">
              <MoveUpRight size={12}/> Progress
            </h3>
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-lab-muted">Iteration:</span>
              <span className="text-white font-mono font-bold">{optimizationStepCount}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-lab-muted">Δf:</span>
              <span className={`font-mono font-bold ${deltaZ < 0 ? 'text-emerald-400' : deltaZ > 0 ? 'text-rose-400' : 'text-lab-muted'}`}>
                {deltaZ > 0 ? '+' : ''}{deltaZ.toFixed(4)}
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <h3 className="text-xs uppercase tracking-wider text-lab-muted font-bold mb-2 flex items-center gap-1">
              <AlertTriangle size={12}/> Info
            </h3>
            <p className="text-xs text-lab-muted">
              Switch to Optimization mode to perform Gradient Descent or Ascent. Observe how the gradient vector (yellow arrow) points uphill.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
