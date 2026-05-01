import { Settings2, SlidersHorizontal, MountainSnow, Activity, Play, Pause, RotateCcw, StepForward } from 'lucide-react';
import React from 'react';

export default function LabControls({
  functionsDict,
  activeFunctionKey,
  setActiveFunctionKey,
  point,
  setPoint,
  mode,
  setMode,
  optimizationType,
  setOptimizationType,
  learningRate,
  setLearningRate,
  performOptimizationStep,
  resetOptimization,
  isOptimizing,
  setIsOptimizing,
  path
}) {
  
  return (
    <div className="glass-panel p-5 rounded-2xl border-t-2 border-t-lab-accent2/50 shadow-lg relative flex flex-col gap-5 shrink-0 z-20">
      
      {/* Mode Selector */}
      <div className="flex gap-2 bg-black/20 p-1.5 rounded-xl border border-white/5 w-fit">
        <button
          onClick={() => { setMode('explore'); resetOptimization(); }}
          className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
            mode === 'explore' 
            ? 'bg-lab-accent2 text-white shadow-md' 
            : 'text-lab-muted hover:text-white hover:bg-white/5'
          }`}
        >
          <Activity size={16} /> Explore
        </button>
        <button
          onClick={() => { setMode('optimize'); resetOptimization(); }}
          className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
            mode === 'optimize' 
            ? 'bg-sky-500 text-white shadow-md' 
            : 'text-lab-muted hover:text-white hover:bg-white/5'
          }`}
        >
          <MountainSnow size={16} /> Optimization
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Function Selector */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <Settings2 size={16} className="text-lab-accent2" /> Select Function
          </label>
          <select 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-lab-accent2 transition-colors"
            value={activeFunctionKey}
            onChange={(e) => {
              setActiveFunctionKey(e.target.value);
              resetOptimization();
            }}
          >
            {Object.entries(functionsDict).map(([key, fn]) => (
              <option key={key} value={key} className="bg-slate-800">{fn.name}</option>
            ))}
          </select>
        </div>

        {/* Input Controls */}
        <div className="space-y-4 col-span-1 lg:col-span-2">
          {mode === 'explore' ? (
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-lab-muted">X-Coordinate:</span>
                    <span className="font-mono text-lab-accent2">{point.x.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-5" max="5" step="0.1"
                    value={point.x}
                    onChange={(e) => setPoint({ ...point, x: parseFloat(e.target.value) })}
                    className="w-full accent-lab-accent2 h-2 bg-black/40 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-lab-muted">Y-Coordinate:</span>
                    <span className="font-mono text-lab-accent2">{point.y.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-5" max="5" step="0.1"
                    value={point.y}
                    onChange={(e) => setPoint({ ...point, y: parseFloat(e.target.value) })}
                    className="w-full accent-lab-accent2 h-2 bg-black/40 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
             </div>
          ) : (
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-white uppercase tracking-wider text-lab-muted">Method</label>
                  <div className="flex gap-2">
                     <button 
                       onClick={() => {setOptimizationType('descent'); resetOptimization();}}
                       className={`flex-1 py-1 text-sm rounded border ${optimizationType === 'descent' ? 'bg-sky-500/20 border-sky-500 text-sky-300' : 'border-white/10 text-lab-muted'}`}
                     >
                       Descent
                     </button>
                     <button 
                       onClick={() => {setOptimizationType('ascent'); resetOptimization();}}
                       className={`flex-1 py-1 text-sm rounded border ${optimizationType === 'ascent' ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'border-white/10 text-lab-muted'}`}
                     >
                       Ascent
                     </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-lab-muted">Learning Rate (η):</span>
                    <span className="font-mono text-white">{learningRate.toFixed(3)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.01" max="0.5" step="0.01"
                    value={learningRate}
                    onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                    className="w-full accent-white h-2 bg-black/40 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={performOptimizationStep}
                      className="flex-1 bg-lab-accent/20 hover:bg-lab-accent/30 text-lab-accent border border-lab-accent/50 rounded-lg py-1.5 flex justify-center items-center gap-2 transition-colors text-sm"
                    >
                      <StepForward size={14} /> Step
                    </button>
                    <button 
                      onClick={resetOptimization}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg py-1.5 flex justify-center items-center gap-2 transition-colors text-sm"
                    >
                      <RotateCcw size={14} /> Reset
                    </button>
                  </div>
                </div>
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
