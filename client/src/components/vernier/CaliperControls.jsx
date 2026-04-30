import { Settings, RefreshCw } from 'lucide-react';

export default function CaliperControls({
  objects,
  selectedObjectId,
  setSelectedObjectId,
  mode,
  setMode,
  zeroError,
  setZeroError,
  setJawPosition,
}) {
  return (
    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent2/50 shadow-lg">
      <h3 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-4">
        <Settings size={18} className="text-lab-accent2" />
        Instrument Controls
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Object Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-lab-muted uppercase">Select Object</label>
          <select
            value={selectedObjectId}
            onChange={(e) => {
              setSelectedObjectId(e.target.value);
              setJawPosition(0); // Reset jaw when object changes
            }}
            className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-lab-accent2 transition-colors"
          >
            {objects.map((obj) => (
              <option key={obj.id} value={obj.id} className="bg-slate-900">
                {obj.name}
              </option>
            ))}
          </select>
        </div>

        {/* Mode Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-lab-muted uppercase">Mode</label>
          <div className="flex rounded-xl overflow-hidden border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setMode('practice')}
              className={`flex-1 text-xs font-bold py-1.5 rounded-lg transition-all ${
                mode === 'practice' ? 'bg-lab-accent2 text-[#0f172a] shadow-sm' : 'text-lab-muted hover:text-white'
              }`}
            >
              Practice
            </button>
            <button
              onClick={() => setMode('test')}
              className={`flex-1 text-xs font-bold py-1.5 rounded-lg transition-all ${
                mode === 'test' ? 'bg-rose-500 text-white shadow-sm' : 'text-lab-muted hover:text-white'
              }`}
            >
              Test
            </button>
          </div>
        </div>

        {/* Zero Error Adjustment */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
             <label className="text-xs font-semibold text-lab-muted uppercase">Zero Error (mm)</label>
             <button onClick={() => setZeroError(0)} className="text-[10px] text-lab-accent hover:underline flex items-center gap-1">
               <RefreshCw size={10} /> Reset
             </button>
          </div>
          <div className="flex items-center gap-2">
             <button 
               onClick={() => setZeroError(prev => parseFloat((prev - 0.1).toFixed(2)))}
               className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
             >-</button>
             <div className="flex-1 text-center font-mono text-sm bg-white/5 border border-white/10 rounded-lg py-1.5 text-white">
               {zeroError > 0 ? `+${zeroError}` : zeroError}
             </div>
             <button 
               onClick={() => setZeroError(prev => parseFloat((prev + 0.1).toFixed(2)))}
               className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
             >+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
