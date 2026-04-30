import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveSimulator({ 
  activeFunction, 
  params
}) {
  // SVG dimensions and coordinate mapping
  const width = 800;
  const height = 400;
  const scale = 40; // pixels per unit
  const originX = width / 2;
  const originY = height / 2 + 40; // Shifted down slightly to fit parabola better

  const mapX = (x) => originX + x * scale;
  const mapY = (y) => originY - y * scale;

  const a = params.a;
  const xCurrent = a + params.xOffset;

  // Evaluate the function at a given x
  const evaluateFunction = (funcId, x) => {
    // Use an epsilon to avoid floating point strict equality issues
    const isAtCritical2 = Math.abs(x - 2) < 0.001;

    switch (funcId) {
      case 'continuous': 
        return x * x - 4;
      case 'removable': 
        if (isAtCritical2) return NaN; // Hole
        return (x * x - 4) / (x - 2); // Simplifies to x + 2
      case 'jump':
        if (x < 2 && !isAtCritical2) return x + 1;
        return 4 - x;
      case 'infinite':
        if (isAtCritical2) return NaN; // Vertical Asymptote
        return 1 / ((x - 2) * (x - 2));
      default: 
        return 0;
    }
  };

  const yCurrent = evaluateFunction(activeFunction, xCurrent);

  // Generate SVG path string
  const generatePath = (funcId) => {
    let paths = []; // Use array of paths to handle jumps/asymptotes
    let currentPath = '';
    let isFirst = true;
    let lastY = null;

    for (let x = -10; x <= 10.1; x += 0.05) {
      // Small epsilon shift if x is exactly 2 to avoid NaN blowing up the drawing logic
      const evalX = Math.abs(x - 2) < 0.01 ? (x < 2 ? 1.99 : 2.01) : x;
      let y = evaluateFunction(funcId, evalX);

      const screenX = mapX(evalX);
      const screenY = mapY(y);

      if (isNaN(screenY) || !isFinite(screenY)) {
        if (currentPath) paths.push(currentPath);
        currentPath = '';
        isFirst = true;
        lastY = null;
        continue;
      }

      // Break path for infinite jump
      if (lastY !== null && Math.abs(screenY - lastY) > height) {
        if (currentPath) paths.push(currentPath);
        currentPath = '';
        isFirst = true;
      }
      
      // Break path for piece-wise jump specifically around x=2
      if (funcId === 'jump' && evalX > 1.95 && evalX < 2.05 && lastY !== null && Math.abs(screenY - lastY) > 20) {
        if (currentPath) paths.push(currentPath);
        currentPath = '';
        isFirst = true;
      }

      if (isFirst) {
        currentPath += `M ${screenX} ${screenY} `;
        isFirst = false;
      } else {
        currentPath += `L ${screenX} ${screenY} `;
      }
      lastY = screenY;
    }
    
    if (currentPath) paths.push(currentPath);
    return paths;
  };

  const currentPaths = useMemo(() => generatePath(activeFunction), [activeFunction]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-900/80 rounded-xl border border-white/5 overflow-hidden relative">
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-full h-full drop-shadow-2xl"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid Lines */}
        <g className="grid-lines" stroke="rgba(255,255,255,0.05)" strokeWidth="1">
          {Array.from({ length: 21 }).map((_, i) => {
            const pos = mapX(i - 10);
            return <line key={`vx-${i}`} x1={pos} y1={0} x2={pos} y2={height} />;
          })}
          {Array.from({ length: 11 }).map((_, i) => {
            const pos = mapY(i - 5);
            return <line key={`vy-${i}`} x1={0} y1={pos} x2={width} y2={pos} />;
          })}
        </g>

        {/* Axes */}
        <line x1={0} y1={originY} x2={width} y2={originY} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <line x1={originX} y1={0} x2={originX} y2={height} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

        {/* Axis Labels */}
        <text x={width - 20} y={originY - 10} fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="bold">X</text>
        <text x={originX + 10} y={20} fill="rgba(255,255,255,0.5)" fontSize="12" fontWeight="bold">Y</text>

        {/* Origin Label */}
        <text x={originX - 15} y={originY + 15} fill="rgba(255,255,255,0.5)" fontSize="10">0</text>

        {/* Tick Marks & Numbers (X-axis) */}
        {Array.from({ length: 21 }).map((_, i) => {
          const val = i - 10;
          if (val === 0) return null;
          return (
            <g key={`tickx-${i}`}>
              <line x1={mapX(val)} y1={originY - 3} x2={mapX(val)} y2={originY + 3} stroke="rgba(255,255,255,0.5)" />
              {val % 2 === 0 && (
                <text x={mapX(val)} y={originY + 15} fill="rgba(255,255,255,0.3)" fontSize="10" textAnchor="middle">{val}</text>
              )}
            </g>
          );
        })}

        {/* Function Curves */}
        {currentPaths.map((path, index) => (
          <path 
            key={`${activeFunction}-path-${index}`}
            d={path} 
            fill="none" 
            stroke="var(--color-lab-accent2, #38bdf8)" 
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0px 0px 4px rgba(56, 189, 248, 0.4))' }}
          />
        ))}

        {/* Specific Discontinuity Visual Markers at x=2 */}
        {activeFunction === 'removable' && (
          <circle cx={mapX(2)} cy={mapY(4)} r={4} fill="#0f172a" stroke="#38bdf8" strokeWidth={2} />
        )}
        
        {activeFunction === 'jump' && (
          <>
            <circle cx={mapX(2)} cy={mapY(3)} r={4} fill="#0f172a" stroke="#38bdf8" strokeWidth={2} /> {/* Hollow Left limit */}
            <circle cx={mapX(2)} cy={mapY(2)} r={4} fill="#38bdf8" /> {/* Solid Right limit (defined point) */}
          </>
        )}

        {activeFunction === 'infinite' && (
          <line 
            x1={mapX(2)} y1={0} x2={mapX(2)} y2={height} 
            stroke="rgba(244, 63, 94, 0.6)" 
            strokeWidth="2" 
            strokeDasharray="5 5" 
          />
        )}

        {/* Target Point 'a' Marker */}
        <g className="target-marker" opacity={0.6}>
          <line x1={mapX(a)} y1={0} x2={mapX(a)} y2={height} stroke="rgba(251, 191, 36, 0.5)" strokeWidth="1" strokeDasharray="4 4" />
          <text x={mapX(a) + 5} y={20} fill="#fcd34d" fontSize="12" fontWeight="bold">x = a</text>
        </g>

        {/* Dynamic Approaching Point 'x' */}
        {!isNaN(yCurrent) && (
          <g>
            <line x1={mapX(xCurrent)} y1={originY} x2={mapX(xCurrent)} y2={mapY(yCurrent)} stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1={originX} y1={mapY(yCurrent)} x2={mapX(xCurrent)} y2={mapY(yCurrent)} stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1" strokeDasharray="2 2" />
            
            {/* The Dot */}
            <circle cx={mapX(xCurrent)} cy={mapY(yCurrent)} r={5} fill="#fcd34d" style={{ filter: 'drop-shadow(0px 0px 5px rgba(251, 191, 36, 0.8))' }} />
            
            {/* Value Label */}
            <rect x={mapX(xCurrent) + 10} y={mapY(yCurrent) - 25} width="90" height="20" rx="4" fill="rgba(0,0,0,0.7)" />
            <text x={mapX(xCurrent) + 15} y={mapY(yCurrent) - 11} fill="white" fontSize="10" fontFamily="monospace">
              f({xCurrent.toFixed(2)}) = {yCurrent.toFixed(2)}
            </text>
          </g>
        )}

        {/* Arrows indicating approach direction */}
        {params.xOffset < 0 && (
          <g>
             <line x1={mapX(xCurrent) - 30} y1={originY - 15} x2={mapX(xCurrent) - 5} y2={originY - 15} stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
             <text x={mapX(xCurrent) - 40} y={originY - 25} fill="#38bdf8" fontSize="10" textAnchor="middle">x → a⁻</text>
          </g>
        )}
        {params.xOffset > 0 && (
          <g>
             <line x1={mapX(xCurrent) + 30} y1={originY - 15} x2={mapX(xCurrent) + 5} y2={originY - 15} stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
             <text x={mapX(xCurrent) + 40} y={originY - 25} fill="#38bdf8" fontSize="10" textAnchor="middle">x → a⁺</text>
          </g>
        )}

        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
          </marker>
        </defs>

      </svg>
    </div>
  );
}
