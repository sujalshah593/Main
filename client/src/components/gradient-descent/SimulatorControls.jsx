import { Settings2, SlidersHorizontal, Play, Pause, StepForward, RotateCcw, BookmarkPlus, Trash2 } from 'lucide-react';
import React from 'react';

export default function SimulatorControls({
  functionsDict,
  activeFunctionKey,
  setActiveFunctionKey,
  currentPos,
  setCurrentPos,
  learningRate,
  setLearningRate,
  maxIterations,
  setMaxIterations,
  isPlaying,
  setIsPlaying,
  stepForward,
  resetRun,
  saveToHistory,
  clearHistory,
  pathLength,
  historyRunsCount
}) {
  const activeFn = functionsDict[activeFunctionKey];

  return (
    <div className="glass-panel p-5 rounded-2xl border-t-2 border-t-emerald-500/50 shadow-lg relative flex flex-col gap-5 shrink-0 z-20">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Function Selector */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <Settings2 size={16} className="text-emerald-400" /> Select Function
          </label>
          <select 
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            value={activeFunctionKey}
            onChange={(e) => setActiveFunctionKey(e.target.value)}
            disabled={isPlaying}
          >
            {Object.entries(functionsDict).map(([key, fn]) => (
              <option key={key} value={key} className="bg-slate-800">{fn.name}</option>
            ))}
          </select>
        </div>

        {/* Initial Position Controls */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <SlidersHorizontal size={16} className="text-emerald-400" /> Initial Point
          </label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-lab-muted w-4">X:</span>
              <input
                type="range"
                min={activeFn.type === '1D' ? activeFn.domain[0] : activeFn.domain.x[0]} 
                max={activeFn.type === '1D' ? activeFn.domain[1] : activeFn.domain.x[1]} 
                step="0.1"
                value={currentPos.x}
                onChange={(e) => {
                  setCurrentPos(prev => ({...prev, x: parseFloat(e.target.value)}));
                  resetRun();
                }}
                disabled={pathLength > 0 || isPlaying}
                className="flex-1 accent-emerald-500 h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
              />
              <span className="text-xs font-mono w-8 text-right">{currentPos.x.toFixed(1)}</span>
            </div>
            
            {activeFn.type === '2D' && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-lab-muted w-4">Y:</span>
                <input
                  type="range"
                  min={activeFn.domain.y[0]} 
                  max={activeFn.domain.y[1]} 
                  step="0.1"
                  value={currentPos.y}
                  onChange={(e) => {
                    setCurrentPos(prev => ({...prev, y: parseFloat(e.target.value)}));
                    resetRun();
                  }}
                  disabled={pathLength > 0 || isPlaying}
                  className="flex-1 accent-emerald-500 h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
                <span className="text-xs font-mono w-8 text-right">{currentPos.y.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Hyperparameters */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <SlidersHorizontal size={16} className="text-sky-400" /> Hyperparameters
          </label>
          
          <div className="space-y-3">
             <div className="flex justify-between items-center text-xs">
               <span className="text-lab-muted">Learning Rate (η):</span>
               <span className="font-mono text-white">{learningRate.toFixed(3)}</span>
             </div>
             <input
               type="range"
               min="0.001" max="1.5" step="0.001"
               value={learningRate}
               onChange={(e) => setLearningRate(parseFloat(e.target.value))}
               disabled={isPlaying}
               className="w-full accent-sky-400 h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer"
             />

             <div className="flex justify-between items-center text-xs pt-1">
               <span className="text-lab-muted">Max Steps:</span>
               <span className="font-mono text-white">{maxIterations}</span>
             </div>
             <input
               type="range"
               min="10" max="200" step="10"
               value={maxIterations}
               onChange={(e) => setMaxIterations(parseInt(e.target.value))}
               disabled={isPlaying}
               className="w-full accent-sky-400 h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer"
             />
          </div>
        </div>

        {/* Playback & History Controls */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
            <Play size={16} className="text-amber-400" /> Execution
          </label>
          
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={`py-1.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-colors ${isPlaying ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
            >
              {isPlaying ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Play</>}
            </button>
            <button 
              onClick={() => { setIsPlaying(false); stepForward(); }}
              disabled={isPlaying}
              className="py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
            >
              <StepForward size={14} /> Step
            </button>
            <button 
              onClick={resetRun}
              className="py-1.5 bg-white/5 hover:bg-rose-500/20 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 text-lab-muted rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-colors"
            >
              <RotateCcw size={14} /> Reset
            </button>
            <button 
              onClick={saveToHistory}
              disabled={pathLength === 0 || isPlaying}
              className="py-1.5 bg-sky-500/20 hover:bg-sky-500/40 text-sky-300 border border-sky-500/30 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-colors disabled:opacity-50"
            >
              <BookmarkPlus size={14} /> Save
            </button>
          </div>
          
          {historyRunsCount > 0 && (
             <button 
               onClick={clearHistory}
               className="w-full py-1 text-xs text-rose-400/70 hover:text-rose-400 flex items-center justify-center gap-1 transition-colors mt-2"
             >
               <Trash2 size={12} /> Clear {historyRunsCount} Saved Run(s)
             </button>
          )}

        </div>

      </div>
    </div>
  );
}
