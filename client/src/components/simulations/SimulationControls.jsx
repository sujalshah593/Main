import { Settings, Play, Pause, RotateCcw, FastForward, Zap, Save } from 'lucide-react';

export default function SimulationControls({
  config, setConfig,
  isPaused, setIsPaused,
  isRunning, runSimulation,
  resetSimulation,
  addObservation,
  latestOutcome
}) {

  const SIMULATION_TYPES = [
    { id: 'coin', label: 'Coin Toss' },
    { id: 'dice', label: 'Dice Roll' },
    { id: 'cards', label: 'Card Pick' },
    { id: 'spinner', label: 'Spinner' },
    { id: 'marbles', label: 'Marbles' },
    { id: 'traffic', label: 'Traffic Light' },
    { id: 'queue', label: 'Queue Line' }
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 relative shadow-lg h-full flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Settings size={18} className="text-emerald-400" />
        <h2 className="text-sm font-bold text-white uppercase tracking-widest">Configuration</h2>
      </div>

      <div className="flex-1 flex flex-col gap-8">
        
        {/* Sim Type */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] block">
            Experiment Model
          </label>
          <div className="grid grid-cols-1 gap-2">
            <select
              value={config.type}
              onChange={(e) => {
                setConfig({ ...config, type: e.target.value, trials: 10 });
                resetSimulation();
              }}
              disabled={isRunning && !isPaused}
              className="w-full bg-black/40 text-white border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer hover:bg-black/60"
            >
              {SIMULATION_TYPES.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Trials Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
              Target Trials
            </label>
            <span className="text-emerald-400 font-mono font-bold text-lg">{config.trials}</span>
          </div>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={config.trials}
            onChange={(e) => setConfig({ ...config, trials: parseInt(e.target.value) })}
            disabled={isRunning}
            className="w-full accent-emerald-500 h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer disabled:opacity-30"
          />
        </div>

        {/* Speed Selector */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] block">
            Playback Speed
          </label>
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
            {[1000, 500, 100].map((speed, i) => (
              <button
                key={speed}
                onClick={() => setConfig({ ...config, speed })}
                className={`flex-1 py-2 rounded-lg text-[10px] font-black transition-all ${
                  config.speed === speed 
                    ? 'bg-emerald-500 text-white shadow-lg' 
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {i === 0 ? '1x' : i === 1 ? '2x' : '5x'}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Actions */}
        <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-3">
          {!isRunning ? (
            <button
              onClick={runSimulation}
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-[0_10px_20px_-5px_rgba(16,185,129,0.4)] group"
            >
              <Play size={18} fill="currentColor" className="group-hover:scale-110 transition-transform" />
              START SIMULATION
            </button>
          ) : (
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`w-full h-12 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                isPaused 
                  ? 'bg-amber-500 text-white shadow-[0_10px_20px_-5px_rgba(245,158,11,0.4)]' 
                  : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'
              }`}
            >
              {isPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
              {isPaused ? 'RESUME' : 'PAUSE'}
            </button>
          )}
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={resetSimulation}
              className="h-10 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl font-bold transition-all border border-white/10 flex items-center justify-center gap-2 text-xs"
            >
              <RotateCcw size={14} />
              RESET
            </button>
            <button
              onClick={addObservation}
              disabled={!latestOutcome}
              className="h-10 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-xs disabled:opacity-30"
            >
              <Save size={14} />
              LOG DATA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
