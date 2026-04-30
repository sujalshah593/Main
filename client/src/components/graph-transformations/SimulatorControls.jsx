import { Sliders, RefreshCw, Play, Trophy, Target, SplitSquareHorizontal } from 'lucide-react';
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
    { id: 'linear', name: 'Linear', equation: 'x' },
    { id: 'quadratic', name: 'Quadratic', equation: 'x²' },
    { id: 'cubic', name: 'Cubic', equation: 'x³' },
    { id: 'absolute', name: 'Absolute', equation: '|x|' },
    { id: 'exponential', name: 'Exponential', equation: 'e^x' },
    { id: 'logarithmic', name: 'Logarithmic', equation: 'ln(x)' },
  ];

  const generateChallenge = () => {
    // Random function
    const funcs = ['linear', 'quadratic', 'absolute'];
    const randomFunc = funcs[Math.floor(Math.random() * funcs.length)];
    
    // Random params
    const randomA = Math.floor(Math.random() * 4) + 1; // 1 to 4
    const signA = Math.random() > 0.5 ? 1 : -1;
    
    const randomH = Math.floor(Math.random() * 9) - 4; // -4 to +4
    const randomK = Math.floor(Math.random() * 9) - 4; // -4 to +4
    
    setActiveFunction(randomFunc);
    resetSimulator();
    
    setChallengeTarget({
      fn: randomFunc,
      a: randomA * signA,
      h: randomH,
      k: randomK,
      reflectY: false
    });
  };

  const handleSliderChange = (param, value) => {
    setParams(prev => ({ ...prev, [param]: parseFloat(value) }));
  };

  const handleToggleChange = (param) => {
    setParams(prev => ({ ...prev, [param]: !prev[param] }));
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
          <Sliders className="text-lab-accent" size={20} />
          Transformation Controls
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
              Adjust the sliders below to match the <strong className="text-rose-400">red dashed curve</strong>.
            </p>
          </div>
        </motion.div>
      )}

      {/* Function Selector */}
      <div className="mb-6">
        <label className="text-xs font-bold text-lab-muted uppercase tracking-wider mb-3 block">Base Function</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {functions.map(fn => (
            <button
              key={fn.id}
              onClick={() => {
                setActiveFunction(fn.id);
                if (mode === 'challenge') generateChallenge();
                else resetSimulator();
              }}
              className={`p-2 rounded-xl text-sm transition-all border flex flex-col items-center justify-center gap-1 ${
                activeFunction === fn.id
                  ? 'bg-lab-accent2/20 border-lab-accent2/50 text-white'
                  : 'bg-white/5 border-white/10 text-lab-muted hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="font-semibold">{fn.name}</span>
              <span className="font-mono text-xs opacity-70">y = {fn.equation}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="space-y-6">
        {/* a: Vertical Stretch / Compress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <span className="font-mono text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded">a</span>
              Vertical Stretch
            </label>
            <span className="font-mono text-amber-400 font-bold">{params.a.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-5"
            max="5"
            step="0.1"
            value={params.a}
            onChange={(e) => handleSliderChange('a', e.target.value)}
            className="w-full accent-amber-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-lab-muted mt-1 font-mono">
            <span>-5 (Flip & Stretch)</span>
            <span>0</span>
            <span>5 (Stretch)</span>
          </div>
        </div>

        {/* h: Horizontal Shift */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <span className="font-mono text-xs bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded">h</span>
              Horizontal Shift
            </label>
            <span className="font-mono text-sky-400 font-bold">{params.h.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.5"
            value={params.h}
            onChange={(e) => handleSliderChange('h', e.target.value)}
            className="w-full accent-sky-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-lab-muted mt-1 font-mono">
            <span>-10 (Left)</span>
            <span>0</span>
            <span>10 (Right)</span>
          </div>
        </div>

        {/* k: Vertical Shift */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <span className="font-mono text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">k</span>
              Vertical Shift
            </label>
            <span className="font-mono text-emerald-400 font-bold">{params.k.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.5"
            value={params.k}
            onChange={(e) => handleSliderChange('k', e.target.value)}
            className="w-full accent-emerald-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-lab-muted mt-1 font-mono">
            <span>-10 (Down)</span>
            <span>0</span>
            <span>10 (Up)</span>
          </div>
        </div>

        {/* Reflection Toggle */}
        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <SplitSquareHorizontal size={16} />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">Horizontal Reflection</span>
              <span className="text-xs text-lab-muted font-mono block">y = f(-x)</span>
            </div>
          </div>
          
          <button
            onClick={() => handleToggleChange('reflectY')}
            className={`w-12 h-6 rounded-full transition-colors relative ${params.reflectY ? 'bg-indigo-500' : 'bg-white/10'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${params.reflectY ? 'left-7' : 'left-1'}`} />
          </button>
        </div>

        <div className="pt-4 border-t border-white/10">
          <button
            onClick={resetSimulator}
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Reset Transformations
          </button>
        </div>
      </div>
    </div>
  );
}
