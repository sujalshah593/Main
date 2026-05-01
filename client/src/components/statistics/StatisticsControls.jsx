import { useState } from 'react';
import { Settings, Dices, Users, ThermometerSun, FileDigit, RotateCcw, Save, ArrowRightLeft } from 'lucide-react';

export default function StatisticsControls({
  datasetA, setDatasetA,
  datasetB, setDatasetB,
  isCompareMode, setIsCompareMode,
  addObservation
}) {
  const [activeDataset, setActiveDataset] = useState('A');
  const [inputTextA, setInputTextA] = useState(datasetA.join(', '));
  const [inputTextB, setInputTextB] = useState(datasetB.join(', '));
  const [errorA, setErrorA] = useState('');
  const [errorB, setErrorB] = useState('');

  const PRESETS = [
    { id: 'small', label: 'Small Numbers', icon: FileDigit, generate: () => Array.from({length: 5}, () => Math.floor(Math.random() * 10) + 1) },
    { id: 'marks', label: 'Student Marks', icon: Users, generate: () => Array.from({length: 10}, () => Math.floor(Math.random() * 50) + 50) },
    { id: 'temp', label: 'Daily Temp (°C)', icon: ThermometerSun, generate: () => Array.from({length: 7}, () => Math.floor(Math.random() * 15) + 20) },
    { id: 'random', label: 'Random Spread', icon: Dices, generate: () => Array.from({length: 8}, () => Math.floor(Math.random() * 100)) },
  ];

  const handleApplyPreset = (preset) => {
    const newData = preset.generate();
    if (activeDataset === 'A') {
      setDatasetA(newData);
      setInputTextA(newData.join(', '));
      setErrorA('');
    } else {
      setDatasetB(newData);
      setInputTextB(newData.join(', '));
      setErrorB('');
    }
  };

  const parseInput = (text, isDatasetA) => {
    const arr = text.split(',').map(n => n.trim()).filter(n => n !== '');
    const nums = arr.map(Number);
    
    if (nums.length === 0) {
      if (isDatasetA) setErrorA('Dataset cannot be empty.');
      else setErrorB('Dataset cannot be empty.');
      return null;
    }
    
    if (nums.some(isNaN)) {
      if (isDatasetA) setErrorA('Only numbers and commas are allowed.');
      else setErrorB('Only numbers and commas are allowed.');
      return null;
    }
    
    if (isDatasetA) {
      setErrorA('');
      setDatasetA(nums);
    } else {
      setErrorB('');
      setDatasetB(nums);
    }
    return nums;
  };

  const handleInputChange = (e, isDatasetA) => {
    const val = e.target.value;
    if (isDatasetA) {
      setInputTextA(val);
      parseInput(val, true);
    } else {
      setInputTextB(val);
      parseInput(val, false);
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 relative shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Settings size={20} className="text-sky-400" />
          <h2 className="text-lg font-bold text-white">Dataset Configuration</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCompareMode(!isCompareMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
              isCompareMode ? 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <ArrowRightLeft size={16} />
            {isCompareMode ? 'Comparison Mode: ON' : 'Compare Two Datasets'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* Dataset A Input */}
        <div className={`p-4 rounded-xl border ${activeDataset === 'A' ? 'bg-sky-500/5 border-sky-500/30' : 'bg-white/5 border-white/10'} transition-all`}>
          <div className="flex justify-between items-end mb-2">
            <label className="text-sm font-bold text-sky-400 flex items-center gap-2">
              Dataset A (Primary)
            </label>
            <button 
              onClick={() => setActiveDataset('A')}
              className={`text-xs px-2 py-1 rounded border transition-colors ${activeDataset === 'A' ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' : 'bg-transparent text-gray-500 border-transparent hover:text-gray-300'}`}
            >
              {activeDataset === 'A' ? 'Targeting for Presets' : 'Click to Target'}
            </button>
          </div>
          <input
            type="text"
            value={inputTextA}
            onChange={(e) => handleInputChange(e, true)}
            onFocus={() => setActiveDataset('A')}
            placeholder="e.g., 10, 15, 20, 25"
            className={`w-full bg-[#0f172a]/50 text-white border ${errorA ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 transition-colors font-mono`}
          />
          {errorA && <p className="text-red-400 text-xs mt-1">{errorA}</p>}
        </div>

        {/* Dataset B Input (If Comparison Mode is ON) */}
        {isCompareMode && (
          <div className={`p-4 rounded-xl border ${activeDataset === 'B' ? 'bg-fuchsia-500/5 border-fuchsia-500/30' : 'bg-white/5 border-white/10'} transition-all`}>
            <div className="flex justify-between items-end mb-2">
              <label className="text-sm font-bold text-fuchsia-400 flex items-center gap-2">
                Dataset B (Comparison)
              </label>
              <button 
                onClick={() => setActiveDataset('B')}
                className={`text-xs px-2 py-1 rounded border transition-colors ${activeDataset === 'B' ? 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30' : 'bg-transparent text-gray-500 border-transparent hover:text-gray-300'}`}
              >
                {activeDataset === 'B' ? 'Targeting for Presets' : 'Click to Target'}
              </button>
            </div>
            <input
              type="text"
              value={inputTextB}
              onChange={(e) => handleInputChange(e, false)}
              onFocus={() => setActiveDataset('B')}
              placeholder="e.g., 5, 10, 50, 90"
              className={`w-full bg-[#0f172a]/50 text-white border ${errorB ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-fuchsia-500 transition-colors font-mono`}
            />
            {errorB && <p className="text-red-400 text-xs mt-1">{errorB}</p>}
          </div>
        )}

        {/* Action Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2 border-t border-white/10">
          
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
            <span className="text-xs text-gray-400 font-semibold uppercase mr-2 shrink-0">Presets:</span>
            {PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-xs font-semibold transition-colors border border-white/5 shrink-0"
                title={`Generate ${preset.label} for Dataset ${activeDataset}`}
              >
                <preset.icon size={14} className={activeDataset === 'A' ? 'text-sky-400' : 'text-fuchsia-400'} />
                {preset.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => {
                if (activeDataset === 'A') {
                  setDatasetA([0]); setInputTextA('0'); setErrorA('');
                } else {
                  setDatasetB([0]); setInputTextB('0'); setErrorB('');
                }
              }}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold transition-colors border border-white/10 flex items-center justify-center"
              title={`Clear Dataset ${activeDataset}`}
            >
              <RotateCcw size={16} />
            </button>
            <button
              onClick={addObservation}
              disabled={errorA || (isCompareMode && errorB)}
              className="flex-1 md:w-auto px-6 py-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 border border-sky-500/30 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              <Save size={16} />
              Record Observation
            </button>
          </div>
          
        </div>

      </div>
    </div>
  );
}
