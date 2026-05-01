import React, { useMemo } from 'react';
import Plot from 'react-plotly.js';

export default function VisualizationPanel({ activeFn, point, path, mode }) {
  
  // Generate grid data for the surface and contour plots
  const gridData = useMemo(() => {
    const size = 50; // Resolution of the grid
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
        let y = yMin + i * dy; // Note: Plotly expects y to be the outer loop (rows)
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

  // Current point marker for 3D plot
  const currentZ = activeFn.computeValue(point.x, point.y);
  
  // Formatting path data for plots
  const pathX = path.map(p => p.x);
  const pathY = path.map(p => p.y);
  const pathZ = path.map(p => p.z);

  const surfaceTrace = {
    type: 'surface',
    x: gridData.xData,
    y: gridData.yData,
    z: gridData.zData,
    colorscale: 'Viridis',
    showscale: false,
    opacity: 0.9,
    contours: {
      z: { show: true, usecolormap: true, highlightcolor: "limegreen", project: { z: true } }
    }
  };

  const currentPointTrace3D = {
    type: 'scatter3d',
    mode: 'markers',
    x: [point.x],
    y: [point.y],
    z: [currentZ],
    marker: { size: 6, color: '#f43f5e', symbol: 'circle' },
    name: 'Current Point'
  };

  const pathTrace3D = {
    type: 'scatter3d',
    mode: 'lines+markers',
    x: pathX,
    y: pathY,
    z: pathZ,
    line: { color: '#0ea5e9', width: 4 },
    marker: { size: 3, color: '#38bdf8' },
    name: 'Path'
  };

  // 2D Contour
  const contourTrace = {
    type: 'contour',
    x: gridData.x1D,
    y: gridData.y1D,
    z: gridData.zData,
    colorscale: 'Viridis',
    showscale: false,
  };

  const currentPointTrace2D = {
    type: 'scatter',
    mode: 'markers',
    x: [point.x],
    y: [point.y],
    marker: { size: 10, color: '#f43f5e', line: {color: 'white', width: 2} },
    name: 'Current Point'
  };

  const pathTrace2D = {
    type: 'scatter',
    mode: 'lines+markers',
    x: pathX,
    y: pathY,
    line: { color: '#0ea5e9', width: 2 },
    marker: { size: 6, color: '#38bdf8', line: {color: 'white', width: 1} },
    name: 'Path'
  };

  // Gradient Vector trace (only show in explore mode if not optimizing)
  const gradX = activeFn.computeDx(point.x, point.y);
  const gradY = activeFn.computeDy(point.x, point.y);
  // Scale gradient for visual representation
  const gradScale = 0.5 / Math.max(0.1, Math.sqrt(gradX*gradX + gradY*gradY)); 
  const gradientTrace2D = {
    type: 'scatter',
    mode: 'lines+markers',
    x: [point.x, point.x + gradX * gradScale],
    y: [point.y, point.y + gradY * gradScale],
    line: { color: '#fbbf24', width: 3 },
    marker: { size: [0, 8], symbol: ['circle', 'arrow'], color: '#fbbf24', angleref: 'previous' },
    name: 'Gradient (Scaled)'
  };


  return (
    <div className="grid grid-cols-1 gap-6 h-full w-full">
      
      {/* 3D Surface Plot */}
      <div className="glass-panel rounded-2xl border-t-2 border-t-sky-500/50 shadow-xl relative overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
        <h2 className="text-sm font-bold uppercase tracking-wider text-sky-400 mb-4 absolute top-4 left-4 z-10 bg-[#0f172a]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-sky-500/20">
          3D Surface
        </h2>
        <div className="w-full h-full min-h-[500px]">
          <Plot
            data={mode === 'optimize' ? [surfaceTrace, pathTrace3D, currentPointTrace3D] : [surfaceTrace, currentPointTrace3D]}
            layout={{
              autosize: true,
              margin: { l: 0, r: 0, t: 0, b: 0 },
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              scene: {
                xaxis: { title: 'X', showgrid: true, zeroline: false, showbackground: false, color: '#94a3b8' },
                yaxis: { title: 'Y', showgrid: true, zeroline: false, showbackground: false, color: '#94a3b8' },
                zaxis: { title: 'Z', showgrid: true, zeroline: false, showbackground: false, color: '#94a3b8', range: activeFn.zRange },
                camera: { eye: {x: 1.5, y: 1.5, z: 1.2} }
              },
              showlegend: false
            }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
            config={{ displayModeBar: false }}
          />
        </div>
      </div>

      {/* 2D Contour Plot */}
      <div className="glass-panel rounded-2xl border-t-2 border-t-emerald-500/50 shadow-xl relative overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
        <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 absolute top-4 left-4 z-10 bg-[#0f172a]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-emerald-500/20">
          Contour Map
        </h2>
        <div className="w-full h-full p-4 flex items-center justify-center min-h-[500px]">
          <Plot
            data={mode === 'optimize' ? [contourTrace, pathTrace2D, currentPointTrace2D] : [contourTrace, currentPointTrace2D, gradientTrace2D]}
            layout={{
              autosize: true,
              margin: { l: 40, r: 20, t: 20, b: 40 },
              paper_bgcolor: 'rgba(0,0,0,0)',
              plot_bgcolor: 'rgba(0,0,0,0)',
              xaxis: { title: 'X', color: '#94a3b8', range: activeFn.domain.x },
              yaxis: { title: 'Y', color: '#94a3b8', range: activeFn.domain.y, scaleanchor: 'x', scaleratio: 1 },
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
