import { motion } from 'framer-motion';
import { Settings2, RotateCcw, Save, Shuffle, Layers } from 'lucide-react';

const FUNCTIONS = [
  { id: 'sigmoid', name: 'Sigmoid' },
  { id: 'relu', name: 'ReLU' },
  { id: 'tanh', name: 'Tanh' },
  { id: 'leaky_relu', name: 'Leaky ReLU' },
  { id: 'softmax', name: 'Softmax (1D)' },
  { id: 'elu', name: 'ELU' },
  { id: 'linear', name: 'Linear' },
];

export default function ActivationControls({
  activeFunction,
  setActiveFunction,
  compareFunctions,
  setCompareFunctions,
  isCompareMode,
  setIsCompareMode,
  inputValue,
  setInputValue,
  params,
  setParams,
  resetSimulator,
  addObservation
}) {

  const handleFunctionToggle = (id) => {
    if (isCompareMode) {
      if (compareFunctions.includes(id)) {
        if (compareFunctions.length > 1) {
          setCompareFunctions(compareFunctions.filter(f => f !== id));
        }
      } else {
        if (compareFunctions.length < 4) { // Limit to 4 for readability
          setCompareFunctions([...compareFunctions, id]);
        }
      }
    } else {
      setActiveFunction(id);
      setCompareFunctions([id]);
    }
  };

  const calculateOutput = (x, funcId) => {
    switch (funcId) {
      case 'sigmoid': return 1 / (1 + Math.exp(-x));
      case 'relu': return Math.max(0, x);
      case 'tanh': return Math.tanh(x);
      case 'leaky_relu': return x >= 0 ? x : params.alpha * x;
      case 'softmax': 
        // 1D Softmax approximation (assuming other class logits sum up to e^0 = 1)
        // e^x / (e^x + 1) -> Which is exactly Sigmoid! But we label it to show the relation.
        return Math.exp(x) / (Math.exp(x) + 1);
      case 'elu': return x >= 0 ? x : params.alpha * (Math.exp(x) - 1);
      case 'linear': return x;
      default: return x;
    }
  };

  const handleRecordObservation = () => {
    if (isCompareMode) {
      compareFunctions.forEach(funcId => {
        const y = calculateOutput(inputValue, funcId);
        addObservation({
          input: inputValue.toFixed(2),
          funcName: FUNCTIONS.find(f => f.id === funcId)?.name || funcId,
          output: y.toFixed(4),
          alpha: (funcId === 'leaky_relu' || funcId === 'elu') ? params.alpha : 'N/A'
        });
      });
    } else {
      const y = calculateOutput(inputValue, activeFunction);
      addObservation({
        input: inputValue.toFixed(2),
        funcName: FUNCTIONS.find(f => f.id === activeFunction)?.name || activeFunction,
        output: y.toFixed(4),
        alpha: (activeFunction === 'leaky_relu' || activeFunction === 'elu') ? params.alpha : 'N/A'
      });
    }
  };

  const setRandomInput = () => {
    const random = (Math.random() * 20 - 10).toFixed(2); // -10 to 10
    setInputValue(parseFloat(random));
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border-t-2 border-t-sky-500/50 relative shadow-xl">
      <div className="flex items-center gap-2 mb-4 text-sky-400">
        <Settings2 size={20} />
        <h2 className="font-bold text-lg text-white">Simulator Controls</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Col: Functions & Mode */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-lab-muted uppercase tracking-wider">
              Activation Function
            </label>
            <button
              onClick={() => {
                setIsCompareMode(!isCompareMode);
                if (!isCompareMode) {
                  // Entering compare mode, ensure active is in compare list
                  setCompareFunctions([activeFunction]);
                } else {
                  // Exiting compare mode, pick the first
                  setActiveFunction(compareFunctions[0] || 'sigmoid');
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                isCompareMode 
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50' 
                  : 'bg-white/5 text-lab-muted border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Layers size={14} />
              {isCompareMode ? 'Compare Mode ON' : 'Compare Mode OFF'}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {FUNCTIONS.map((f) => {
              const isSelected = isCompareMode ? compareFunctions.includes(f.id) : activeFunction === f.id;
              
              let btnClass = "px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ";
              if (isSelected) {
                btnClass += "bg-sky-500/20 border-sky-500/50 text-sky-300 shadow-[0_0_10px_rgba(14,165,233,0.2)]";
              } else {
                btnClass += "bg-white/5 border-white/10 text-lab-muted hover:bg-white/10 hover:text-white";
              }

              return (
                <button
                  key={f.id}
                  onClick={() => handleFunctionToggle(f.id)}
                  className={btnClass}
                >
                  {f.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Col: Sliders & Buttons */}
        <div className="space-y-5">
          {/* Input X Slider */}
          <div className="space-y-2 bg-white/5 p-3 rounded-xl border border-white/10">
            <div className="flex justify-between items-center text-sm">
              <span className="text-lab-muted font-medium">Input Value (x)</span>
              <span className="font-mono text-sky-400 font-bold bg-sky-500/10 px-2 py-0.5 rounded">
                {inputValue.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={inputValue}
              onChange={(e) => setInputValue(parseFloat(e.target.value))}
              className="w-full accent-sky-500"
            />
            <div className="flex justify-between text-xs text-lab-muted/50 font-mono">
              <span>-10</span>
              <span>0</span>
              <span>10</span>
            </div>
          </div>

          {/* Alpha Parameter Slider (conditional) */}
          {((isCompareMode && (compareFunctions.includes('leaky_relu') || compareFunctions.includes('elu'))) || 
            (!isCompareMode && (activeFunction === 'leaky_relu' || activeFunction === 'elu'))) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2 bg-amber-500/5 p-3 rounded-xl border border-amber-500/20"
            >
              <div className="flex justify-between items-center text-sm">
                <span className="text-amber-200/70 font-medium">Alpha (α) Parameter</span>
                <span className="font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                  {params.alpha.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.01"
                max="1.0"
                step="0.01"
                value={params.alpha}
                onChange={(e) => setParams({ ...params, alpha: parseFloat(e.target.value) })}
                className="w-full accent-amber-500"
              />
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={setRandomInput}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-colors border border-white/10"
            >
              <Shuffle size={16} />
              Random X
            </button>
            <button
              onClick={handleRecordObservation}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 rounded-xl text-sm font-bold transition-all border border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.15)]"
            >
              <Save size={16} />
              Record
            </button>
            <button
              onClick={resetSimulator}
              className="px-4 py-2.5 bg-white/5 hover:bg-red-500/20 text-lab-muted hover:text-red-400 rounded-xl text-sm font-semibold transition-colors border border-white/10 hover:border-red-500/30"
              title="Reset Simulator"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
