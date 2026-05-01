import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';

export default function VisualizationPanel({ activeFn, currentPos, path, historyRuns }) {
  
  // ==========================
  // 1D Logic
  // ==========================
  const data1D = useMemo(() => {
    if (activeFn.type !== '1D') return null;
    const x = [];
    const y = [];
    const min = activeFn.domain[0];
    const max = activeFn.domain[1];
    const step = (max - min) / 100;
    for (let i = min; i <= max; i += step) {
      x.push(i);
      y.push(activeFn.computeValue(i));
    }
    return { x, y };
  }, [activeFn]);

  const traces1D = useMemo(() => {
    if (activeFn.type !== '1D') return [];
    
    const baseCurve = {
      type: 'scatter',
      mode: 'lines',
      x: data1D.x,
      y: data1D.y,
      line: { color: '#3b82f6', width: 3 },
      name: 'f(x)'
    };

    const historicalPaths = historyRuns.map((run, i) => ({
      type: 'scatter',
      mode: 'lines+markers',
      x: run.path.map(p => p.x),
      y: run.path.map(p => p.val),
      line: { color: run.color, width: 2, dash: 'dot' },
      marker: { size: 6, color: run.color },
      name: `Run ${i+1} (η=${run.learningRate})`,
      opacity: 0.6
    }));

    const activePath = {
      type: 'scatter',
      mode: 'lines+markers',
      x: path.map(p => p.x),
      y: path.map(p => p.val),
      line: { color: '#10b981', width: 3 },
      marker: { size: 8, color: '#10b981', line: {color:'white', width:1} },
      name: 'Current Run'
    };

    // Tangent line for current pos
    let currentX = currentPos.x;
    let currentY = activeFn.computeValue(currentX);
    let grad = activeFn.computeGrad(currentX);
    // Draw small tangent line
    let tangX = [currentX - 0.5, currentX + 0.5];
    let tangY = [currentY - 0.5 * grad, currentY + 0.5 * grad];
    
    const tangentTrace = {
      type: 'scatter',
      mode: 'lines',
      x: tangX,
      y: tangY,
      line: { color: '#fbbf24', width: 2 },
      name: 'Tangent'
    };

    const currentPoint = {
      type: 'scatter',
      mode: 'markers',
      x: [currentX],
      y: [currentY],
      marker: { size: 12, color: '#ef4444', line: {color:'white', width:2} },
      name: 'Current Point'
    };

    return [baseCurve, ...historicalPaths, activePath, tangentTrace, currentPoint];
  }, [activeFn, data1D, path, historyRuns, currentPos]);


  // ==========================
  // 2D Logic
  // ==========================
  const gridData2D = useMemo(() => {
    if (activeFn.type !== '2D') return null;
    const size = 50;
    const xData = [];
    const yData = [];
    const zData = [];
    
    const xMin = activeFn.domain.x[0];
    const xMax = activeFn.domain.x[1];
    const yMin = activeFn.domain.y[0];
    const yMax = activeFn.domain.y[1];
    
    const dx = (xMax - xMin) / size;
    const dy = (yMax - yMin) / size;

    for (let i = 0; i <= size; i++) {
      let xRow = [];
      let yRow = [];
      let zRow = [];
      for (let j = 0; j <= size; j++) {
        let x = xMin + j * dx;
        let y = yMin + i * dy;
        xRow.push(x);
        yRow.push(y);
        zRow.push(activeFn.computeValue(x, y));
      }
      xData.push(xRow);
      yData.push(yRow);
      zData.push(zRow);
    }
    return { xData, yData, zData, x1D: xData[0], y1D: yData.map(r => r[0]) };
  }, [activeFn]);

  const traces2D = useMemo(() => {
    if (activeFn.type !== '2D') return [];

    const contour = {
      type: 'contour',
      x: gridData2D.x1D,
      y: gridData2D.y1D,
      z: gridData2D.zData,
      colorscale: 'Viridis',
      showscale: false,
    };

    const historicalPaths = historyRuns.map((run, i) => ({
      type: 'scatter',
      mode: 'lines+markers',
      x: run.path.map(p => p.x),
      y: run.path.map(p => p.y),
      line: { color: run.color, width: 2, dash: 'dot' },
      marker: { size: 6, color: run.color },
      name: `Run ${i+1}`,
      opacity: 0.6
    }));

    const activePath = {
      type: 'scatter',
      mode: 'lines+markers',
      x: path.map(p => p.x),
      y: path.map(p => p.y),
      line: { color: '#10b981', width: 3 },
      marker: { size: 8, color: '#10b981', line: {color:'white', width:1} },
      name: 'Current Path'
    };

    const currentPoint = {
      type: 'scatter',
      mode: 'markers',
      x: [currentPos.x],
      y: [currentPos.y],
      marker: { size: 12, color: '#ef4444', line: {color:'white', width:2} },
      name: 'Current Pos'
    };

    return [contour, ...historicalPaths, activePath, currentPoint];
  }, [activeFn, gridData2D, path, historyRuns, currentPos]);


  return (
    <div className="glass-panel rounded-2xl border-t-2 border-t-emerald-500/50 shadow-xl relative overflow-hidden flex flex-col min-h-[500px] bg-[#0a0a0a]">
      <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 absolute top-4 left-4 z-10 bg-[#0f172a]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-emerald-500/20">
        {activeFn.type === '1D' ? '1D Curve Analysis' : '2D Contour Map'}
      </h2>
      <div className="w-full h-full p-4 flex items-center justify-center flex-1">
        <Plot
          data={activeFn.type === '1D' ? traces1D : traces2D}
          layout={{
            autosize: true,
            margin: { l: 40, r: 20, t: 40, b: 40 },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            xaxis: { title: 'X', color: '#94a3b8', range: activeFn.type === '1D' ? activeFn.domain : activeFn.domain.x },
            yaxis: { title: activeFn.type === '1D' ? 'f(x)' : 'Y', color: '#94a3b8', range: activeFn.type === '1D' ? null : activeFn.domain.y, scaleanchor: activeFn.type === '2D' ? 'x' : null, scaleratio: 1 },
            showlegend: true,
            legend: { x: 1, xanchor: 'right', y: 1, bgcolor: 'rgba(0,0,0,0.5)', font: {color: 'white'} }
          }}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
          config={{ displayModeBar: false }}
        />
      </div>
    </div>
  );
}
