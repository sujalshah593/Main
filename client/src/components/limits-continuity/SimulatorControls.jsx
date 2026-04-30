import { Sliders, RefreshCw, Play, Trophy, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SimulatorControls({ 
  activeFunction, 
  setActiveFunction, 
  params, 
  setParams, 
  mode, 
  setMode, 
  resetSimulator,
  challengeTarget,
  setChallengeTarget
}) {

  const functions = [
    { id: 'continuous', name: 'Continuous', equation: 'x² - 4' },
    { id: 'removable', name: 'Hole (Removable)', equation: '(x² - 4)/(x - 2)' },
    { id: 'jump', name: 'Jump (Piecewise)', equation: 'x<2? x+1 : 4-x' },
    { id: 'infinite', name: 'Asymptote (Infinite)', equation: '1/(x - 2)²' }
  ];

  const generateChallenge = () => {
    // Random function
    const funcs = ['continuous', 'removable', 'jump', 'infinite'];
    const randomFunc = funcs[Math.floor(Math.random() * funcs.length)];
    
    // Choose a random 'a' point that is interesting.
    // For our pre-defined functions, x=2 is the critical point.
    // Let's sometimes ask about x=2, and sometimes about x=0.
    const randomA = Math.random() > 0.5 ? 2 : 0;
    
    setActiveFunction(randomFunc);
    setParams({ a: randomA, xOffset: 2.0 });
    
    setChallengeTarget({
      fn: randomFunc,
      a: randomA
    });
  };

  const handleSliderChange = (param, value) => {
    setParams(prev => ({ ...prev, [param]: parseFloat(value) }));
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
          <Sliders className="text-lab-accent" size={20} />
          Experiment Controls
        </h3>

        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => { setMode('practice'); setChallengeTarget(null); resetSimulator(); }}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              mode === 'practice' ? 'bg-lab-accent text-white shadow-lg' : 'text-lab-muted hover:text-white'
            }`}
          >
            <Play size={16} /> Practice
          </button>
          <button
            onClick={() => { setMode('challenge'); generateChallenge(); }}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              mode === 'challenge' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-lab-muted hover:text-white'
            }`}
          >
            <Trophy size={16} /> Challenge
          </button>
        </div>
      </div>

      {mode === 'challenge' && challengeTarget && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3"
        >
          <Target className="text-rose-400 mt-1" size={20} />
          <div>
            <h4 className="text-rose-400 font-bold mb-1">Target Mission</h4>
            <p className="text-sm text-white">
              Determine the continuity of this function at <strong className="text-rose-400 font-mono">x = {challengeTarget.a}</strong>. Use the sliders to investigate the limits!
            </p>
          </div>
        </motion.div>
      )}

      {/* Function Selector (only allow changing if not in challenge mode) */}
      <div className="mb-6">
        <label className="text-xs font-bold text-lab-muted uppercase tracking-wider mb-3 block">Function Selection</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {functions.map(fn => (
            <button
              key={fn.id}
              onClick={() => {
                if (mode === 'practice') {
                  setActiveFunction(fn.id);
                  resetSimulator();
                }
              }}
              disabled={mode === 'challenge'}
              className={`p-3 rounded-xl text-sm transition-all border flex flex-col items-start gap-1 ${
                activeFunction === fn.id
                  ? 'bg-lab-accent2/20 border-lab-accent2/50 text-white'
                  : 'bg-white/5 border-white/10 text-lab-muted hover:bg-white/10 hover:text-white'
              } ${mode === 'challenge' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="font-semibold">{fn.name}</span>
              <span className="font-mono text-xs opacity-70">f(x) = {fn.equation}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="space-y-6">
        {/* a: Point of Interest */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <span className="font-mono text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">a</span>
              Target Point to Analyze
            </label>
            <span className="font-mono text-amber-400 font-bold">x = {params.a.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.5"
            value={params.a}
            onChange={(e) => handleSliderChange('a', e.target.value)}
            disabled={mode === 'challenge'}
            className={`w-full accent-amber-500 h-2 bg-white/10 rounded-lg appearance-none ${mode === 'challenge' ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          />
          <div className="flex justify-between text-xs text-lab-muted mt-1 font-mono">
            <span>-5</span>
            <span>0</span>
            <span>5</span>
          </div>
        </div>

        {/* xOffset: Dynamic Approach */}
        <div className="p-4 bg-sky-500/10 border border-sky-500/30 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-sky-100 flex items-center gap-2">
              <span className="font-mono text-xs bg-sky-500/40 text-white px-2 py-0.5 rounded">x</span>
              Approaching Value
            </label>
            <span className="font-mono text-sky-300 font-bold">x = {(params.a + params.xOffset).toFixed(3)}</span>
          </div>
          <p className="text-xs text-sky-200/70 mb-3">Slide to observe limit behavior as x approaches a.</p>
          <input
            type="range"
            min="-3"
            max="3"
            step="0.01"
            value={params.xOffset}
            onChange={(e) => handleSliderChange('xOffset', e.target.value)}
            className="w-full accent-sky-400 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-sky-300/70 mt-2 font-mono">
            <span>Left Limit (x → a⁻)</span>
            <span>x = a</span>
            <span>Right Limit (x → a⁺)</span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <button
            onClick={resetSimulator}
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Reset Experiment
          </button>
        </div>
      </div>
    </div>
  );
}
