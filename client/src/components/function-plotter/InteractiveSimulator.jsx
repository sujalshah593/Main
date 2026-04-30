import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveSimulator({ activeFunction, params, challengeFunction, showHint }) {
  // SVG dimensions and coordinate mapping
  const width = 800;
  const height = 400;
  const scale = 40; // pixels per unit
  const originX = width / 2;
  const originY = height / 2;

  const mapX = (x) => originX + x * scale;
  const mapY = (y) => originY - y * scale;

  // Generate SVG path string from a mathematical function
  const generatePath = (fnObj) => {
    let path = '';
    let isFirst = true;

    // Calculate points from x = -10 to 10
    for (let x = -10; x <= 10; x += 0.1) {
      let y = 0;
      
      try {
        if (activeFunction === 'linear') {
          y = fnObj.m * x + fnObj.c;
        } else if (activeFunction === 'quadratic') {
          y = fnObj.a * x * x + fnObj.b * x + fnObj.k;
        } else if (activeFunction === 'exponential') {
          y = fnObj.a * Math.exp(fnObj.b * x) + fnObj.k;
        } else if (activeFunction === 'logarithmic') {
          if (fnObj.b * x <= 0) continue; // Log of non-positive is undefined
          y = fnObj.a * Math.log(fnObj.b * x) + fnObj.k;
        } else if (activeFunction === 'sigmoid') {
          y = 1 / (1 + Math.exp(-fnObj.a * x));
        } else if (activeFunction === 'relu') {
          y = Math.max(0, fnObj.a * x);
        }

        const screenX = mapX(x);
        const screenY = mapY(y);

        if (isNaN(screenY) || !isFinite(screenY)) {
          isFirst = true;
          continue;
        }

        // Don't draw extreme asymptotes that blow up the SVG
        if (screenY < -1000 || screenY > height + 1000) {
          isFirst = true; // Break the line
          continue;
        }

        if (isFirst) {
          path += `M ${screenX} ${screenY} `;
          isFirst = false;
        } else {
          path += `L ${screenX} ${screenY} `;
        }
      } catch (e) {
        isFirst = true;
      }
    }
    return path;
  };

  const currentPath = useMemo(() => generatePath(params), [activeFunction, params]);
  const challengePath = useMemo(() => challengeFunction ? generatePath(challengeFunction) : '', [activeFunction, challengeFunction]);

  // Determine if user has matched the challenge
  const isMatch = useMemo(() => {
    if (!challengeFunction) return false;
    for (const key in challengeFunction) {
      if (Math.abs(challengeFunction[key] - params[key]) > 0.01) return false;
    }
    return true;
  }, [challengeFunction, params]);

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

        {/* Challenge Curve (Dashed) */}
        {challengeFunction && (
          <path 
            d={challengePath} 
            fill="none" 
            stroke="rgba(244, 63, 94, 0.5)" // Rose 500 with opacity
            strokeWidth="3" 
            strokeDasharray="8 4"
          />
        )}

        {/* Current Function Curve */}
        <motion.path 
          key={activeFunction + JSON.stringify(params)}
          d={currentPath} 
          fill="none" 
          stroke="var(--color-lab-accent2, #38bdf8)" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ filter: 'drop-shadow(0px 0px 8px rgba(56, 189, 248, 0.5))' }}
        />

        {/* Highlight Match in Challenge Mode */}
        {isMatch && (
          <motion.rect 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            x={0} y={0} width={width} height={height} 
            fill="#10b981" 
            style={{ mixBlendMode: 'overlay' }}
          />
        )}
      </svg>

      {/* Real-time Equation Display */}
      <div className="absolute top-4 left-4 bg-black/60 px-4 py-2 rounded-lg border border-white/10 backdrop-blur-md">
        <div className="font-mono text-sm text-white flex items-center gap-2">
          <span className="text-lab-muted font-sans font-bold text-xs uppercase">Function:</span>
          {activeFunction === 'linear' && `y = ${params.m}x ${params.c >= 0 ? '+' : '-'} ${Math.abs(params.c)}`}
          {activeFunction === 'quadratic' && `y = ${params.a}x² ${params.b >= 0 ? '+' : '-'} ${Math.abs(params.b)}x ${params.k >= 0 ? '+' : '-'} ${Math.abs(params.k)}`}
          {activeFunction === 'exponential' && `y = ${params.a} · e^(${params.b}x) ${params.k >= 0 ? '+' : '-'} ${Math.abs(params.k)}`}
          {activeFunction === 'logarithmic' && `y = ${params.a} · ln(${params.b}x) ${params.k >= 0 ? '+' : '-'} ${Math.abs(params.k)}`}
          {activeFunction === 'sigmoid' && `y = 1 / (1 + e^(${-params.a}x))` }
          {activeFunction === 'relu' && `y = max(0, ${params.a}x)`}
        </div>
      </div>

      {isMatch && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500/20 text-emerald-400 font-display font-bold text-2xl px-6 py-3 rounded-2xl border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-md"
        >
          MATCHED!
        </motion.div>
      )}

      {showHint && !isMatch && (
        <div className="absolute bottom-4 right-4 z-50 text-xs text-amber-400 bg-amber-900/40 px-4 py-2 rounded-lg border border-amber-500/30 max-w-[250px]">
          {challengeFunction 
            ? "Hint: Adjust the sliders above until your blue solid line perfectly aligns with the red dashed line."
            : "Hint: Try changing the parameters and observe how the curve shifts, stretches, or flips!"}
        </div>
      )}
    </div>
  );
}
