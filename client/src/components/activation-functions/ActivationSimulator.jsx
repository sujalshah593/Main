import { useMemo } from 'react';
import { motion } from 'framer-motion';

const FUNCTION_COLORS = {
  sigmoid: '#3b82f6', // blue
  relu: '#10b981', // green
  tanh: '#f59e0b', // amber
  leaky_relu: '#8b5cf6', // purple
  softmax: '#ec4899', // pink
  elu: '#f43f5e', // rose
  linear: '#64748b' // slate
};

export default function ActivationSimulator({
  activeFunction,
  compareFunctions,
  isCompareMode,
  inputValue,
  params
}) {

  // Coordinate system setup
  const width = 600;
  const height = 400;
  const padding = 40;
  
  // Graph domain and range
  const xMin = -10;
  const xMax = 10;
  const yMin = -2; // Default
  const yMax = 2; // Default
  
  const mapX = (x) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const mapY = (y) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  const calculateOutput = (x, funcId) => {
    switch (funcId) {
      case 'sigmoid': return 1 / (1 + Math.exp(-x));
      case 'relu': return Math.max(0, x);
      case 'tanh': return Math.tanh(x);
      case 'leaky_relu': return x >= 0 ? x : params.alpha * x;
      case 'softmax': return Math.exp(x) / (Math.exp(x) + 1);
      case 'elu': return x >= 0 ? x : params.alpha * (Math.exp(x) - 1);
      case 'linear': return x;
      default: return x;
    }
  };

  const generatePath = (funcId) => {
    let d = '';
    const step = 0.2;
    for (let x = xMin; x <= xMax; x += step) {
      const y = calculateOutput(x, funcId);
      // Clamp Y to prevent drawing wildly out of bounds
      const clampedY = Math.max(Math.min(y, yMax + 2), yMin - 2);
      
      const px = mapX(x);
      const py = mapY(clampedY);
      
      if (x === xMin) {
        d += `M ${px} ${py} `;
      } else {
        d += `L ${px} ${py} `;
      }
    }
    return d;
  };

  const currentFunctions = isCompareMode ? compareFunctions : [activeFunction];

  const primaryOutput = calculateOutput(inputValue, isCompareMode ? compareFunctions[0] : activeFunction);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-8 mt-12">
      
      {/* Neuron Animation Area */}
      <div className="w-full flex items-center justify-center max-w-2xl px-4">
        <div className="flex items-center gap-4 w-full">
          {/* Input */}
          <div className="flex-1 flex flex-col items-end">
            <span className="text-lab-muted text-xs uppercase tracking-wider font-bold mb-1">Input (x)</span>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-mono text-sky-400 font-bold text-lg">
              {inputValue.toFixed(2)}
            </div>
          </div>

          {/* Connection & Neuron */}
          <div className="flex items-center justify-center relative w-48">
            <div className="absolute w-full h-1 bg-gradient-to-r from-sky-500/20 via-sky-500/50 to-lab-accent/20" />
            
            {/* Input Flow Animation */}
            <motion.div
              className="absolute w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]"
              initial={{ left: 0 }}
              animate={{ left: ['0%', '40%', '40%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Neuron Node */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-[#0f172a] border-2 border-sky-500/50 shadow-[0_0_20px_rgba(14,165,233,0.3)] flex items-center justify-center">
               <span className="text-sky-300 font-bold text-sm">f(x)</span>
            </div>
          </div>

          {/* Output */}
          <div className="flex-1 flex flex-col items-start">
             <span className="text-lab-muted text-xs uppercase tracking-wider font-bold mb-1">Output (y)</span>
             <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl font-mono text-lab-accent font-bold text-lg">
              {primaryOutput.toFixed(4)}
            </div>
          </div>
        </div>
      </div>

      {/* Graph Area */}
      <div className="relative w-full max-w-3xl aspect-video bg-[#0f172a]/50 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
          
          {/* Grid Lines */}
          {[...Array(21)].map((_, i) => {
            const x = xMin + i;
            return (
              <line key={`v-${i}`} x1={mapX(x)} y1={padding} x2={mapX(x)} y2={height - padding} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            );
          })}
          {[...Array(9)].map((_, i) => {
            const y = yMin + i * 0.5;
            return (
              <line key={`h-${i}`} x1={padding} y1={mapY(y)} x2={width - padding} y2={mapY(y)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            );
          })}

          {/* Axes */}
          <line x1={mapX(xMin)} y1={mapY(0)} x2={mapX(xMax)} y2={mapY(0)} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
          <line x1={mapX(0)} y1={mapY(yMin)} x2={mapX(0)} y2={mapY(yMax)} stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

          {/* Axis Labels */}
          <text x={mapX(xMax) + 10} y={mapY(0) + 4} fill="rgba(255,255,255,0.5)" fontSize="12">x</text>
          <text x={mapX(0) - 15} y={mapY(yMax) - 10} fill="rgba(255,255,255,0.5)" fontSize="12">y</text>
          <text x={mapX(0) + 5} y={mapY(0) + 15} fill="rgba(255,255,255,0.5)" fontSize="10">0</text>
          <text x={mapX(xMax) - 15} y={mapY(0) + 15} fill="rgba(255,255,255,0.5)" fontSize="10">{xMax}</text>
          <text x={mapX(xMin) + 5} y={mapY(0) + 15} fill="rgba(255,255,255,0.5)" fontSize="10">{xMin}</text>
          <text x={mapX(0) + 5} y={mapY(1) + 4} fill="rgba(255,255,255,0.5)" fontSize="10">1</text>
          <text x={mapX(0) + 5} y={mapY(-1) + 4} fill="rgba(255,255,255,0.5)" fontSize="10">-1</text>

          {/* Plot Functions */}
          {currentFunctions.map((funcId) => {
            const color = FUNCTION_COLORS[funcId] || '#ffffff';
            const isPrimary = !isCompareMode || funcId === compareFunctions[0];
            return (
              <g key={funcId}>
                <path
                  d={generatePath(funcId)}
                  fill="none"
                  stroke={color}
                  strokeWidth={isPrimary ? "3" : "2"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={isPrimary ? "opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" : "opacity-60"}
                />
                
                {/* Highlight Point on curve corresponding to inputValue */}
                {inputValue >= xMin && inputValue <= xMax && (
                  <g>
                    <line 
                      x1={mapX(inputValue)} y1={mapY(0)} 
                      x2={mapX(inputValue)} y2={mapY(calculateOutput(inputValue, funcId))} 
                      stroke={color} 
                      strokeWidth="1" 
                      strokeDasharray="4 4" 
                      className="opacity-50"
                    />
                    <circle
                      cx={mapX(inputValue)}
                      cy={mapY(calculateOutput(inputValue, funcId))}
                      r={isPrimary ? "6" : "4"}
                      fill={color}
                      className={isPrimary ? "shadow-lg" : ""}
                    />
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend Overlay for Compare Mode */}
        {isCompareMode && currentFunctions.length > 0 && (
          <div className="absolute top-4 right-4 bg-[#0f172a]/80 backdrop-blur-md p-3 rounded-xl border border-white/10 flex flex-col gap-2">
            <span className="text-xs font-bold text-lab-muted uppercase tracking-wider mb-1 border-b border-white/10 pb-1">Legend</span>
            {currentFunctions.map(funcId => (
              <div key={funcId} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: FUNCTION_COLORS[funcId] }} />
                <span className="text-xs font-medium text-white/90">
                  {funcId === 'leaky_relu' ? 'Leaky ReLU' : funcId === 'elu' ? 'ELU' : funcId.charAt(0).toUpperCase() + funcId.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
