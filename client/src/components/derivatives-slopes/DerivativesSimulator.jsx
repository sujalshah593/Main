import { motion } from 'framer-motion';
import { evaluateFunction, evaluateDerivative, evaluateSecondDerivative, getDerivationSteps } from '../../utils/derivativeMath';

export default function DerivativesSimulator({
  funcType,
  params,
  xVal,
  dx,
  showTangent,
  showSecant,
  showDerivative,
  showSecondDerivative
}) {
  const width = 600;
  const height = 400;
  const cx = width / 2;
  const cy = height / 2;
  const scale = 20; // 20px per unit. Range is -15 to +15.

  const mapX = (x) => cx + x * scale;
  const mapY = (y) => cy - y * scale;

  const generatePath = (evalFn) => {
    let d = "";
    for (let px = 0; px <= width; px += 2) {
      const x = (px - cx) / scale;
      const y = evalFn(funcType, params, x);
      
      // Skip undefined or infinite values to prevent SVG breaking
      if (isNaN(y) || !isFinite(y)) {
        continue;
      }

      const py = mapY(y);
      if (d === "") d += `M ${px} ${py} `;
      else d += `L ${px} ${py} `;
    }
    return d;
  };

  const fPath = generatePath(evaluateFunction);
  const fPrimePath = generatePath(evaluateDerivative);
  const fDoublePrimePath = generatePath(evaluateSecondDerivative);

  const currentY = evaluateFunction(funcType, params, xVal);
  const currentSlope = evaluateDerivative(funcType, params, xVal);
  const secantY = evaluateFunction(funcType, params, xVal + dx);

  const steps = getDerivationSteps(funcType, params);

  return (
    <div className="w-full h-full flex flex-col xl:flex-row gap-6 mt-10 p-2">
      
      {/* Graph Area */}
      <div className="flex-1 relative bg-[#0f172a] rounded-xl overflow-hidden border border-white/10 min-h-[400px]">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full">
          {/* Grid */}
          <g opacity="0.1">
            {[...Array(31)].map((_, i) => (
              <line key={`v${i}`} x1={mapX(i - 15)} y1={0} x2={mapX(i - 15)} y2={height} stroke="white" />
            ))}
            {[...Array(21)].map((_, i) => (
              <line key={`h${i}`} x1={0} y1={mapY(i - 10)} x2={width} y2={mapY(i - 10)} stroke="white" />
            ))}
          </g>

          {/* Axes */}
          <line x1={0} y1={cy} x2={width} y2={cy} stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          <line x1={cx} y1={0} x2={cx} y2={height} stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          <text x={width - 15} y={cy - 10} fill="white" opacity="0.5" fontSize="12">X</text>
          <text x={cx + 10} y={15} fill="white" opacity="0.5" fontSize="12">Y</text>

          {/* f(x) Curve */}
          <path d={fPath} fill="none" stroke="#fbbf24" strokeWidth="3" className="drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />

          {/* f'(x) Curve */}
          {showDerivative && (
            <path d={fPrimePath} fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,5" className="drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]" />
          )}

          {/* f''(x) Curve */}
          {showSecondDerivative && (
            <path d={fDoublePrimePath} fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="2,4" className="drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]" />
          )}

          {/* Tangent Line */}
          {showTangent && !isNaN(currentY) && !isNaN(currentSlope) && (
            <motion.line 
              x1={mapX(xVal - 10)} 
              y1={mapY(currentY - 10 * currentSlope)} 
              x2={mapX(xVal + 10)} 
              y2={mapY(currentY + 10 * currentSlope)} 
              stroke="white" 
              strokeWidth="2"
              className="drop-shadow-md"
            />
          )}

          {/* Secant Line */}
          {showSecant && !isNaN(currentY) && !isNaN(secantY) && (
            <motion.g>
              {/* Draw a line connecting (x,y) and (x+dx, y+dx) extended outward */}
              <line 
                x1={mapX(xVal - 10)} 
                y1={mapY(currentY - 10 * ((secantY - currentY) / dx))} 
                x2={mapX(xVal + dx + 10)} 
                y2={mapY(secantY + 10 * ((secantY - currentY) / dx))} 
                stroke="#38bdf8" 
                strokeWidth="2" 
                strokeDasharray="4,4"
              />
              {/* Second Point for Secant */}
              <circle cx={mapX(xVal + dx)} cy={mapY(secantY)} r="5" fill="#38bdf8" className="shadow-[0_0_10px_#38bdf8]" />
              <text x={mapX(xVal + dx) + 10} y={mapY(secantY) - 10} fill="#38bdf8" fontSize="12" fontWeight="bold">x + Δx</text>
            </motion.g>
          )}

          {/* Highlighted Point (xVal) */}
          {!isNaN(currentY) && (
            <g>
              <circle cx={mapX(xVal)} cy={mapY(currentY)} r="6" fill="#ef4444" className="shadow-[0_0_10px_#ef4444]" />
              <text x={mapX(xVal) + 10} y={mapY(currentY) - 10} fill="white" fontSize="12" fontWeight="bold">({xVal.toFixed(1)}, {currentY.toFixed(1)})</text>
            </g>
          )}

        </svg>

        {/* Legend Overlay */}
        <div className="absolute top-4 right-4 bg-black/60 p-3 rounded-xl border border-white/10 text-xs space-y-2 backdrop-blur-sm">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-400"></div> f(x) [Original]</div>
          {showTangent && <div className="flex items-center gap-2"><div className="w-3 h-1 bg-white"></div> Tangent Line</div>}
          {showSecant && <div className="flex items-center gap-2"><div className="w-3 h-1 border-t border-sky-400 border-dashed"></div> Secant Line</div>}
          {showDerivative && <div className="flex items-center gap-2"><div className="w-3 h-1 border-t border-pink-500 border-dashed"></div> f'(x) [Slope]</div>}
          {showSecondDerivative && <div className="flex items-center gap-2"><div className="w-3 h-1 border-t border-purple-500 border-dotted"></div> f''(x) [Concavity]</div>}
        </div>
      </div>

      {/* Step-by-Step Algebraic Solver */}
      <div className="w-full xl:w-80 shrink-0 flex flex-col gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 shadow-inner">
          <h3 className="text-amber-400 font-bold uppercase tracking-wider text-sm border-b border-white/10 pb-3 mb-4 flex items-center justify-between">
            <span>Algebraic Derivation</span>
          </h3>
          <div className="space-y-4 text-sm font-mono text-white/90">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={idx === 0 || idx === steps.length - 1 ? 'font-bold text-amber-300' : 'pl-3 border-l border-white/20 text-lab-muted'}
              >
                {step}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-4 text-xs text-sky-200">
          <strong className="block text-sky-400 uppercase tracking-widest mb-1">Tip: Secant to Tangent</strong>
          Toggle the secant line and move the Δx slider towards 0. Notice how the secant line visually merges into the tangent line. This represents the formal limit definition of a derivative!
        </div>
      </div>

    </div>
  );
}
