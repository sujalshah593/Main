import React from 'react';
import { Calculator, Compass, MoveUpRight, ArrowDownRight } from 'lucide-react';
import Plot from 'react-plotly.js';

export default function AnalysisPanel({ activeFn, path, mode }) {
  
  const currentZ = path.length > 0 ? path[path.length - 1].val : (activeFn.type === '1D' ? activeFn.computeValue(0) : activeFn.computeValue(0,0)); // Fallback if no path
  const prevZ = path.length > 1 ? path[path.length - 2].val : currentZ;
  const deltaZ = currentZ - prevZ;

  const currentGrad = path.length > 0 ? path[path.length - 1].grad : null;

  // Plotly data for convergence chart
  const convergenceTrace = {
    type: 'scatter',
    mode: 'lines',
    x: path.map(p => p.iter),
    y: path.map(p => p.val),
    line: { color: '#10b981', width: 2 },
    fill: 'tozeroy',
    fillcolor: 'rgba(16, 185, 129, 0.1)'
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border-t-2 border-t-sky-500/50 shadow-lg relative z-20">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-sky-500/20 rounded-lg text-sky-400">
          <Calculator size={20} />
        </div>
        <h2 className="text-xl font-bold text-white">Live Metrics & Convergence</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Current State */}
        <div className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-3">
          <h3 className="text-xs uppercase tracking-wider text-lab-muted font-bold flex items-center gap-1">
            <ArrowDownRight size={12}/> Current State
          </h3>
          <div className="flex justify-between items-center text-sm">
             <span className="text-lab-muted">Iteration:</span>
             <span className="text-white font-mono font-bold">{path.length > 0 ? path[path.length - 1].iter : 0}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
             <span className="text-lab-muted">Value f(x):</span>
             <span className="text-emerald-400 font-mono font-bold">{path.length > 0 ? currentZ.toFixed(4) : '-'}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
             <span className="text-lab-muted">Δf:</span>
             <span className={`font-mono font-bold ${deltaZ < 0 ? 'text-emerald-400' : deltaZ > 0 ? 'text-rose-400' : 'text-lab-muted'}`}>
               {deltaZ > 0 ? '+' : ''}{path.length > 1 ? deltaZ.toFixed(4) : '-'}
             </span>
          </div>
        </div>

        {/* Gradient Information */}
        <div className="bg-black/20 p-4 rounded-xl border border-white/5 space-y-3">
          <h3 className="text-xs uppercase tracking-wider text-lab-muted font-bold flex items-center gap-1">
            <Compass size={12}/> Gradient ∇f
          </h3>
          {currentGrad !== null ? (
            activeFn.type === '1D' ? (
              <div className="text-center font-mono text-lg text-sky-400 mt-2">
                {currentGrad.toFixed(3)}
              </div>
            ) : (
              <div className="space-y-1 font-mono text-sm mt-2">
                <div className="flex justify-between">
                  <span className="text-lab-muted">∂f/∂x:</span>
                  <span className="text-sky-400">{currentGrad.dx.toFixed(3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-lab-muted">∂f/∂y:</span>
                  <span className="text-sky-400">{currentGrad.dy.toFixed(3)}</span>
                </div>
              </div>
            )
          ) : (
            <div className="text-sm text-lab-muted text-center pt-2">Start a run to see gradients</div>
          )}
        </div>

        {/* Convergence Plot */}
        <div className="bg-black/20 rounded-xl border border-white/5 h-[120px] overflow-hidden relative">
          <h3 className="text-[10px] uppercase tracking-wider text-lab-muted font-bold absolute top-2 left-2 z-10">
            Convergence
          </h3>
          <Plot
            data={[convergenceTrace]}
            layout={{
              autosize: true,
              margin: { l: 25, r: 10, t: 10, b: 20 },
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              xaxis: { showgrid: false, color: '#64748b', tickfont: {size: 10} },
              yaxis: { showgrid: true, gridcolor: 'rgba(255,255,255,0.05)', color: '#64748b', tickfont: {size: 10} },
              showlegend: false
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            config={{ displayModeBar: false }}
          />
        </div>

      </div>
    </div>
  );
}
