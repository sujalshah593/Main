import { Settings2, RefreshCcw, Target, PenTool, Dna } from 'lucide-react';

export default function SimulatorControls({ activeFunction, setActiveFunction, params, setParams, mode, setMode, resetSimulator, challengeFunction, setChallengeFunction }) {
  
  const handleParamChange = (param, value) => {
    setParams(prev => ({ ...prev, [param]: parseFloat(value) }));
  };

  const handleFunctionChange = (fn) => {
    setActiveFunction(fn);
    if (fn === 'logarithmic' || fn === 'exponential') {
      setParams({ m: 1, c: 0, a: 1, b: 1, k: 0 });
    } else {
      setParams({ m: 1, c: 0, a: 1, b: 0, k: 0 });
    }
    setChallengeFunction(null);
  };

  const generateChallenge = () => {
    // Generate random parameters based on the active function
    let newChallenge = {};
    if (activeFunction === 'linear') {
      newChallenge = { m: (Math.random() * 4 - 2).toFixed(1), c: (Math.random() * 10 - 5).toFixed(1) };
    } else if (activeFunction === 'quadratic') {
      newChallenge = { a: (Math.random() * 2 - 1).toFixed(1), b: (Math.random() * 4 - 2).toFixed(1), k: (Math.random() * 10 - 5).toFixed(1) };
    } else if (activeFunction === 'exponential') {
      newChallenge = { a: (Math.random() * 2 + 0.1).toFixed(1), b: (Math.random() * 1 - 0.5).toFixed(1), k: (Math.random() * 4 - 2).toFixed(1) };
    } else if (activeFunction === 'logarithmic') {
      newChallenge = { a: (Math.random() * 4 - 2).toFixed(1), b: (Math.random() * 2 + 0.5).toFixed(1), k: (Math.random() * 4 - 2).toFixed(1) };
    } else if (activeFunction === 'sigmoid') {
      newChallenge = { a: (Math.random() * 4 - 2).toFixed(1) };
    } else if (activeFunction === 'relu') {
      newChallenge = { a: (Math.random() * 2 + 0.5).toFixed(1) };
    }
    
    // Convert strings to floats
    for (let key in newChallenge) {
      newChallenge[key] = parseFloat(newChallenge[key]);
    }
    
    // Ensure 'a' or 'b' doesn't become 0 to avoid degenerate challenges
    if (newChallenge.a === 0) newChallenge.a = 1;
    if (newChallenge.m === 0) newChallenge.m = 1;

    setChallengeFunction(newChallenge);
    // Reset user params to default to force them to match
    setParams({ m: 1, c: 0, a: 1, b: 0, k: 0 });
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent2/50 shadow-lg flex flex-col gap-6">
      
      {/* Top Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
          <Settings2 className="text-lab-accent2" size={20} />
          Function Parameters
        </h3>
        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/5">
          <button
            onClick={() => { setMode('practice'); setChallengeFunction(null); }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
              mode === 'practice' 
                ? 'bg-lab-accent2 text-slate-900 shadow-[0_0_15px_rgba(var(--color-lab-accent2),0.3)]' 
                : 'text-lab-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <PenTool size={16} /> Free Plot
          </button>
          <button
            onClick={() => { setMode('challenge'); generateChallenge(); }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
              mode === 'challenge' 
                ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]' 
                : 'text-lab-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <Target size={16} /> Challenge
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Function Type Selector */}
        <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
          <label className="text-[10px] uppercase tracking-wider font-bold text-lab-muted flex items-center gap-2">
            <Dna size={12} /> Function Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'linear', label: 'Linear' },
              { id: 'quadratic', label: 'Quadratic' },
              { id: 'exponential', label: 'Exponential' },
              { id: 'logarithmic', label: 'Logarithmic' },
              { id: 'sigmoid', label: 'Sigmoid' },
              { id: 'relu', label: 'ReLU' }
            ].map((fn) => (
              <button
                key={fn.id}
                onClick={() => handleFunctionChange(fn.id)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
                  activeFunction === fn.id
                    ? 'bg-lab-accent2/20 text-lab-accent2 border-lab-accent2/50 shadow-[inset_0_0_10px_rgba(var(--color-lab-accent2),0.2)]'
                    : 'bg-black/40 text-slate-400 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {fn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Parameter Sliders */}
        <div className="flex flex-col gap-4 flex-[2] min-w-[300px] bg-slate-900/50 p-4 rounded-xl border border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Adjust Variables</span>
            <button 
              onClick={() => {
                if (activeFunction === 'logarithmic' || activeFunction === 'exponential') {
                  setParams({ m: 1, c: 0, a: 1, b: 1, k: 0 });
                } else {
                  setParams({ m: 1, c: 0, a: 1, b: 0, k: 0 });
                }
              }}
              className="text-xs flex items-center gap-1 text-lab-muted hover:text-white transition-colors"
            >
              <RefreshCcw size={12} /> Reset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            
            {/* Linear Params */}
            {activeFunction === 'linear' && (
              <>
                <SliderControl label="Slope (m)" param="m" min="-5" max="5" step="0.1" value={params.m} onChange={handleParamChange} />
                <SliderControl label="Y-Intercept (c)" param="c" min="-10" max="10" step="1" value={params.c} onChange={handleParamChange} />
              </>
            )}

            {/* Quadratic Params */}
            {activeFunction === 'quadratic' && (
              <>
                <SliderControl label="Quad Coeff (a)" param="a" min="-2" max="2" step="0.1" value={params.a} onChange={handleParamChange} />
                <SliderControl label="Linear Coeff (b)" param="b" min="-5" max="5" step="0.5" value={params.b} onChange={handleParamChange} />
                <SliderControl label="Constant (k)" param="k" min="-10" max="10" step="1" value={params.k} onChange={handleParamChange} />
              </>
            )}

            {/* Exponential Params */}
            {activeFunction === 'exponential' && (
              <>
                <SliderControl label="Initial Value (a)" param="a" min="-5" max="5" step="0.1" value={params.a} onChange={handleParamChange} />
                <SliderControl label="Growth Rate (b)" param="b" min="-2" max="2" step="0.1" value={params.b} onChange={handleParamChange} />
                <SliderControl label="Vertical Shift (k)" param="k" min="-10" max="10" step="1" value={params.k} onChange={handleParamChange} />
              </>
            )}

            {/* Logarithmic Params */}
            {activeFunction === 'logarithmic' && (
              <>
                <SliderControl label="Scale (a)" param="a" min="-5" max="5" step="0.5" value={params.a} onChange={handleParamChange} />
                <SliderControl label="Horiz Scale (b)" param="b" min="0.1" max="5" step="0.1" value={params.b} onChange={handleParamChange} />
                <SliderControl label="Vertical Shift (k)" param="k" min="-10" max="10" step="1" value={params.k} onChange={handleParamChange} />
              </>
            )}

            {/* Sigmoid / ReLU Params */}
            {(activeFunction === 'sigmoid' || activeFunction === 'relu') && (
              <>
                <SliderControl label="Steepness / Slope (a)" param="a" min="-5" max="5" step="0.1" value={params.a} onChange={handleParamChange} />
              </>
            )}

          </div>
        </div>
      </div>
      
      {mode === 'challenge' && challengeFunction && (
        <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400">
            <Target size={18} />
            <span className="text-sm font-bold">Challenge Mode: Match the dashed curve!</span>
          </div>
          <button 
            onClick={generateChallenge}
            className="text-xs bg-rose-500 text-white px-3 py-1.5 rounded hover:bg-rose-600 transition-colors font-bold"
          >
            New Curve
          </button>
        </div>
      )}

    </div>
  );
}

function SliderControl({ label, param, min, max, step, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center text-xs">
        <label className="font-semibold text-slate-300">{label}</label>
        <span className="font-mono text-lab-accent2 font-bold bg-lab-accent2/10 px-1.5 py-0.5 rounded">
          {value > 0 ? `+${value}` : value}
        </span>
      </div>
      <input 
        type="range" 
        min={min} max={max} step={step} 
        value={value} 
        onChange={(e) => onChange(param, e.target.value)}
        className="w-full accent-lab-accent2 h-1.5 bg-black/50 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}
