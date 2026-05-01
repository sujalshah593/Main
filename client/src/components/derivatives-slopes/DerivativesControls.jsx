import { Settings2, Save, RotateCcw, Activity } from 'lucide-react';
import { evaluateDerivative, evaluateFunction, getFunctionString } from '../../utils/derivativeMath';

const FUNCTION_TYPES = [
  { id: 'linear', name: 'Linear (ax + b)', params: ['a', 'b'] },
  { id: 'quadratic', name: 'Quadratic (ax² + bx + c)', params: ['a', 'b', 'c'] },
  { id: 'cubic', name: 'Cubic (ax³ + bx² + cx + d)', params: ['a', 'b', 'c', 'd'] },
  { id: 'exponential', name: 'Exponential (ae^(bx) + c)', params: ['a', 'b', 'c'] },
  { id: 'logarithmic', name: 'Logarithmic (a*ln(bx) + c)', params: ['a', 'b', 'c'] },
  { id: 'trigonometric_sin', name: 'Sine (a*sin(bx) + c)', params: ['a', 'b', 'c'] },
  { id: 'trigonometric_cos', name: 'Cosine (a*cos(bx) + c)', params: ['a', 'b', 'c'] },
  { id: 'rational', name: 'Rational (a / (bx + c))', params: ['a', 'b', 'c'] }
];

export default function DerivativesControls({
  funcType, setFuncType,
  params, setParams,
  xVal, setXVal,
  dx, setDx,
  showTangent, setShowTangent,
  showSecant, setShowSecant,
  showDerivative, setShowDerivative,
  showSecondDerivative, setShowSecondDerivative,
  resetSimulator,
  addObservation
}) {
  const currentFuncConfig = FUNCTION_TYPES.find(f => f.id === funcType);

  const handleParamChange = (param, val) => {
    setParams(prev => ({ ...prev, [param]: parseFloat(val) || 0 }));
  };

  const currentY = evaluateFunction(funcType, params, xVal);
  const currentSlope = evaluateDerivative(funcType, params, xVal);

  const getNature = () => {
    if (isNaN(currentSlope)) return 'Undefined';
    if (Math.abs(currentSlope) < 0.05) return 'Critical Point (Flat)';
    if (currentSlope > 0) return 'Increasing';
    return 'Decreasing';
  };

  const handleRecord = () => {
    addObservation({
      func: getFunctionString(funcType, params),
      x: xVal.toFixed(2),
      y: currentY.toFixed(2),
      slope: currentSlope.toFixed(2),
      nature: getNature()
    });
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border-t-2 border-t-amber-500/50 relative shadow-xl">
      <div className="flex items-center gap-2 mb-4 text-amber-400">
        <Settings2 size={20} />
        <h2 className="font-bold text-lg text-white">Function Controls</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Col: Function Selection and Parameters */}
        <div className="space-y-4">
          <div>
            <label className="text-xs text-lab-muted font-bold uppercase block mb-1">Function Type</label>
            <select 
              value={funcType} 
              onChange={(e) => setFuncType(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-sm text-amber-300 focus:outline-none"
            >
              {FUNCTION_TYPES.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentFuncConfig.params.map(p => (
              <div key={p}>
                <label className="text-xs text-lab-muted font-bold uppercase block mb-1">Param '{p}' <span className="text-amber-300 font-mono">({params[p]})</span></label>
                <input 
                  type="range" min="-10" max="10" step="0.5" 
                  value={params[p]} 
                  onChange={(e) => handleParamChange(p, e.target.value)} 
                  className="w-full accent-amber-500" 
                />
              </div>
            ))}
          </div>

          <div>
            <label className="text-xs text-lab-muted font-bold uppercase block mb-1 flex justify-between">
              <span>Tangent Point (x)</span>
              <span className="text-amber-300 font-mono">x = {xVal.toFixed(2)}</span>
            </label>
            <input 
              type="range" min="-10" max="10" step="0.1" 
              value={xVal} 
              onChange={(e) => setXVal(parseFloat(e.target.value))} 
              className="w-full accent-amber-500" 
            />
          </div>

          {showSecant && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <label className="text-xs text-sky-400 font-bold uppercase block mb-1 flex justify-between">
                <span>Secant Limit (Δx)</span>
                <span className="font-mono">Δx = {dx.toFixed(2)}</span>
              </label>
              <input 
                type="range" min="0.01" max="5" step="0.01" 
                value={dx} 
                onChange={(e) => setDx(parseFloat(e.target.value))} 
                className="w-full accent-sky-500" 
              />
            </motion.div>
          )}
        </div>

        {/* Right Col: Toggles and Analysis */}
        <div className="space-y-4">
          
          {/* Toggles */}
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center gap-2 text-sm text-white/80 p-2 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition">
              <input type="checkbox" checked={showTangent} onChange={e => setShowTangent(e.target.checked)} className="accent-amber-500" />
              Tangent Line
            </label>
            <label className="flex items-center gap-2 text-sm text-white/80 p-2 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition">
              <input type="checkbox" checked={showSecant} onChange={e => setShowSecant(e.target.checked)} className="accent-sky-500" />
              Secant Line
            </label>
            <label className="flex items-center gap-2 text-sm text-white/80 p-2 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition">
              <input type="checkbox" checked={showDerivative} onChange={e => setShowDerivative(e.target.checked)} className="accent-pink-500" />
              f'(x) Graph
            </label>
            <label className="flex items-center gap-2 text-sm text-white/80 p-2 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition">
              <input type="checkbox" checked={showSecondDerivative} onChange={e => setShowSecondDerivative(e.target.checked)} className="accent-purple-500" />
              f''(x) Graph
            </label>
          </div>

          {/* Analysis Panel */}
          <div className="bg-black/30 p-4 rounded-xl border border-white/10">
            <h3 className="text-xs font-bold text-amber-500/80 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Activity size={14} /> Instantaneous Analysis
            </h3>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-lab-muted">f({xVal.toFixed(2)}) =</span>
                <span className="text-white">{currentY.toFixed(4)}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-lab-muted">Slope f'({xVal.toFixed(2)}) =</span>
                <span className="text-amber-400 font-bold">{currentSlope.toFixed(4)}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-lab-muted">Nature:</span>
                <span className={`font-bold ${getNature().includes('Critical') ? 'text-pink-400' : 'text-emerald-400'}`}>{getNature()}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={handleRecord} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-xl text-sm font-bold transition-all border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <Save size={14} /> Record
            </button>
            <button onClick={resetSimulator} className="px-3 py-2 bg-white/5 hover:bg-red-500/20 text-lab-muted hover:text-red-400 rounded-xl text-sm font-semibold transition-colors border border-white/10 hover:border-red-500/30">
              <RotateCcw size={14} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
