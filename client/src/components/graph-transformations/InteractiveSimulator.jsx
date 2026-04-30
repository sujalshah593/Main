import { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function InteractiveSimulator({ 
  activeFunction, 
  params, 
  challengeTarget, 
  showHint 
}) {
  // SVG dimensions and coordinate mapping
  const width = 800;
  const height = 400;
  const scale = 40; // pixels per unit
  const originX = width / 2;
  const originY = height / 2;

  const mapX = (x) => originX + x * scale;
  const mapY = (y) => originY - y * scale;

  // Base functions evaluator
  const evaluateBaseFunction = (funcId, x) => {
    switch (funcId) {
      case 'linear': return x;
      case 'quadratic': return x * x;
      case 'cubic': return x * x * x;
      case 'absolute': return Math.abs(x);
      case 'exponential': return Math.exp(x);
      case 'logarithmic': return x > 0 ? Math.log(x) : NaN;
      default: return x;
    }
  };

  // Generate SVG path string
  const generatePath = (funcId, pObj, isBase = false) => {
    let path = '';
    let isFirst = true;

    // To prevent drawing vertical asymptotes as lines
    let lastY = null;

    // Calculate points from x = -10 to 10
    for (let x = -10; x <= 10.1; x += 0.1) {
      let y = 0;
      
      try {
        if (isBase) {
          y = evaluateBaseFunction(funcId, x);
        } else {
          // Apply transformations: y = a * f(±(x - h)) + k
          const innerX = x - pObj.h;
          const finalX = pObj.reflectY ? -innerX : innerX;
          const baseVal = evaluateBaseFunction(funcId, finalX);
          
          if (isNaN(baseVal)) {
            y = NaN;
          } else {
            y = pObj.a * baseVal + pObj.k;
          }
        }

        const screenX = mapX(x);
        const screenY = mapY(y);

        if (isNaN(screenY) || !isFinite(screenY)) {
          isFirst = true;
          lastY = null;
          continue;
        }

        // Don't draw extreme values that blow up the SVG
        if (screenY < -2000 || screenY > height + 2000) {
          isFirst = true; // Break the line
          lastY = null;
          continue;
        }

        // Break line if there's a huge jump (asymptote detection for log)
        if (lastY !== null && Math.abs(screenY - lastY) > height) {
           isFirst = true;
        }

        if (isFirst) {
          path += `M ${screenX} ${screenY} `;
          isFirst = false;
        } else {
          path += `L ${screenX} ${screenY} `;
        }
        
        lastY = screenY;
      } catch (e) {
        isFirst = true;
        lastY = null;
      }
    }
    return path;
  };

  const basePath = useMemo(() => generatePath(activeFunction, null, true), [activeFunction]);
  const currentPath = useMemo(() => generatePath(activeFunction, params, false), [activeFunction, params]);
  const targetPath = useMemo(() => challengeTarget ? generatePath(challengeTarget.fn, challengeTarget, false) : '', [challengeTarget]);

  // Determine if user has matched the challenge
  const isMatch = useMemo(() => {
    if (!challengeTarget) return false;
    if (activeFunction !== challengeTarget.fn) return false;
    
    // Check parameters tolerance
    return (
      Math.abs(challengeTarget.a - params.a) < 0.15 &&
      Math.abs(challengeTarget.h - params.h) < 0.15 &&
      Math.abs(challengeTarget.k - params.k) < 0.15 &&
      challengeTarget.reflectY === params.reflectY
    );
  }, [challengeTarget, params, activeFunction]);

  // Format equation text
  const formatEquation = () => {
    let eq = '';
    
    const formatA = (a) => {
      if (a === 1) return '';
      if (a === -1) return '-';
      return `${a}`;
    };

    const innerX = params.reflectY ? `-(x ${params.h < 0 ? '+ ' + Math.abs(params.h) : (params.h > 0 ? '- ' + params.h : '')})` 
                                  : `x ${params.h < 0 ? '+ ' + Math.abs(params.h) : (params.h > 0 ? '- ' + params.h : '')}`;
    
    const cleanInnerX = innerX === 'x ' ? 'x' : innerX;
    const aStr = formatA(params.a);
    const kStr = params.k > 0 ? ` + ${params.k}` : (params.k < 0 ? ` - ${Math.abs(params.k)}` : '');

    switch (activeFunction) {
      case 'linear': 
        eq = `y = ${aStr}(${cleanInnerX})${kStr}`;
        break;
      case 'quadratic': 
        eq = `y = ${aStr}(${cleanInnerX})²${kStr}`;
        break;
      case 'cubic':
        eq = `y = ${aStr}(${cleanInnerX})³${kStr}`;
        break;
      case 'absolute':
        eq = `y = ${aStr}|${cleanInnerX}|${kStr}`;
        break;
      case 'exponential':
        eq = `y = ${aStr}e^(${cleanInnerX})${kStr}`;
        break;
      case 'logarithmic':
        eq = `y = ${aStr}ln(${cleanInnerX})${kStr}`;
        break;
      default:
        eq = `y = f(x)`;
    }
    
    // Clean up generic formatting edge cases
    return eq.replace('(x)', 'x').replace(/ \+ 0$/, '').replace(/ \- 0$/, '');
  };

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

        {/* Base Function Curve (Grayed out) */}
        <path 
          d={basePath} 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.2)" 
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Target Curve (Dashed red) */}
        {challengeTarget && (
          <path 
            d={targetPath} 
            fill="none" 
            stroke="rgba(244, 63, 94, 0.8)" // Rose 500
            strokeWidth="3" 
            strokeDasharray="8 6"
          />
        )}

        {/* Transformed Function Curve */}
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
          <span className="text-lab-muted font-sans font-bold text-xs uppercase">Equation:</span>
          {formatEquation()}
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-black/40 px-3 py-2 rounded-lg border border-white/5 backdrop-blur-sm text-xs space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-white/20 border border-white/40 border-dashed"></div>
          <span className="text-white/50 font-mono">f(x) Base</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-sky-400"></div>
          <span className="text-sky-300 font-mono">y Transformed</span>
        </div>
        {challengeTarget && (
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-0.5 bg-rose-500 border border-rose-500 border-dashed"></div>
            <span className="text-rose-400 font-mono">Target</span>
          </div>
        )}
      </div>

      {isMatch && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500/20 text-emerald-400 font-display font-bold text-2xl px-6 py-3 rounded-2xl border border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.3)] backdrop-blur-md"
        >
          MISSION ACCOMPLISHED!
        </motion.div>
      )}

      {showHint && !isMatch && (
        <div className="absolute bottom-4 right-4 z-50 text-xs text-amber-400 bg-amber-900/40 px-4 py-2 rounded-lg border border-amber-500/30 max-w-[250px]">
          {challengeTarget 
            ? "Hint: Adjust sliders to make the blue curve perfectly overlap the red dashed target."
            : "Hint: Try shifting h and k first, then adjust stretch factor a!"}
        </div>
      )}
    </div>
  );
}
