import { Play, RotateCcw, Settings, Target, Zap, Save } from 'lucide-react';

export default function ProbabilityControls({
  config, setConfig,
  isRunning, runSimulation,
  resetSimulation,
  addObservation,
  theoreticalProbability
}) {

  const EXPERIMENT_TYPES = [
    { id: 'coin', label: 'Coin Toss' },
    { id: 'dice', label: 'Dice Roll' },
    { id: 'cards', label: 'Card Selection' },
    { id: 'spinner', label: 'Spinner Wheel' },
    { id: 'marbles', label: 'Marble Bag' },
    { id: 'rng', label: 'Random Number' }
  ];

  const EVENT_CONDITIONS = {
    coin: [
      { id: 'heads', label: 'Heads' },
      { id: 'tails', label: 'Tails' }
    ],
    dice: [
      { id: 'even', label: 'Even Number' },
      { id: 'odd', label: 'Odd Number' },
      { id: 'prime', label: 'Prime Number' },
      { id: 'greater_4', label: 'Greater than 4' },
      { id: 'six', label: 'Exactly 6' }
    ],
    cards: [
      { id: 'red', label: 'Red Card' },
      { id: 'black', label: 'Black Card' },
      { id: 'face', label: 'Face Card (J,Q,K)' },
      { id: 'ace', label: 'Ace' },
      { id: 'spade', label: 'Spade' }
    ],
    spinner: [
      { id: 'red', label: 'Red Section' },
      { id: 'blue', label: 'Blue Section' },
      { id: 'green', label: 'Green Section' },
      { id: 'yellow', label: 'Yellow Section' }
    ],
    marbles: [
      { id: 'red', label: 'Red Marble' },
      { id: 'blue', label: 'Blue Marble' },
      { id: 'green', label: 'Green Marble' }
    ],
    rng: [
      { id: 'even', label: 'Even Number' },
      { id: 'odd', label: 'Odd Number' },
      { id: 'multiple_5', label: 'Multiple of 5' }
    ]
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setConfig({
      ...config,
      type,
      condition: EVENT_CONDITIONS[type][0].id // Reset condition when type changes
    });
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 relative shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Settings size={20} className="text-amber-500" />
        <h2 className="text-lg font-bold text-white">Experiment Parameters</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Experiment Type */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
            Experiment Type
          </label>
          <select
            value={config.type}
            onChange={handleTypeChange}
            disabled={isRunning}
            className="w-full bg-[#0f172a] text-white border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50"
          >
            {EXPERIMENT_TYPES.map(type => (
              <option key={type.id} value={type.id}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Event Condition */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block flex justify-between">
            <span>Target Event</span>
            <span className="text-amber-400">P(E) = {(theoreticalProbability * 100).toFixed(1)}%</span>
          </label>
          <select
            value={config.condition}
            onChange={(e) => setConfig({ ...config, condition: e.target.value })}
            disabled={isRunning}
            className="w-full bg-[#0f172a] text-white border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 transition-colors disabled:opacity-50"
          >
            {EVENT_CONDITIONS[config.type]?.map(cond => (
              <option key={cond.id} value={cond.id}>{cond.label}</option>
            ))}
          </select>
        </div>

        {/* Number of Trials */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block flex justify-between">
            <span>Number of Trials</span>
            <span className="text-amber-400 font-mono">{config.trials}</span>
          </label>
          <input
            type="range"
            min="1"
            max="1000"
            step="1"
            value={config.trials}
            onChange={(e) => setConfig({ ...config, trials: parseInt(e.target.value) })}
            disabled={isRunning}
            className="w-full accent-amber-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer disabled:opacity-50 mt-3"
          />
          <div className="flex justify-between text-xs text-gray-500 font-mono mt-1">
            <span>1</span>
            <span>1000</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col justify-end gap-2">
          <div className="flex gap-2 h-11">
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="flex-1 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-700 disabled:text-gray-400 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-sm"
            >
              {isRunning ? (
                <>
                  <Zap className="animate-pulse" size={16} />
                  Running...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Run
                </>
              )}
            </button>
            <button
              onClick={resetSimulation}
              disabled={isRunning}
              className="px-4 bg-white/5 hover:bg-white/10 disabled:opacity-50 text-white rounded-xl font-bold transition-colors border border-white/10 flex items-center justify-center"
              title="Reset Simulation"
            >
              <RotateCcw size={16} />
            </button>
          </div>
          <button
            onClick={addObservation}
            disabled={isRunning}
            className="w-full h-10 bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 border border-sky-500/30 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
          >
            <Save size={16} />
            Record Observation
          </button>
        </div>
      </div>
    </div>
  );
}
