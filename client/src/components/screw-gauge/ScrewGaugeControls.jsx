import { Settings, RefreshCw } from 'lucide-react';

export default function ScrewGaugeControls({
  objects,
  selectedObjectId,
  setSelectedObjectId,
  mode,
  setMode,
  zeroError,
  setZeroError,
  setThimblePosition,
}) {
  return (
    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent2/50 shadow-lg">
      <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
        <Settings size={18} className="text-sky-600 dark:text-lab-accent2" />
        Instrument Controls
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Object Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-white uppercase">Select Object</label>
          <select
            value={selectedObjectId}
            onChange={(e) => {
              setSelectedObjectId(e.target.value);
              setThimblePosition(0); // Reset position when object changes
            }}
            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-sky-500 dark:focus:border-lab-accent2 transition-colors shadow-sm"
          >
            {objects.map((obj) => (
              <option key={obj.id} value={obj.id} className="bg-[#7A1540] dark:bg-slate-900 text-white">
                {obj.name}
              </option>
            ))}
          </select>
        </div>

        {/* Mode Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-lab-muted uppercase">Mode</label>
          <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-1">
            <button
              onClick={() => setMode('practice')}
              className={`flex-1 text-xs font-bold py-1.5 rounded-lg transition-all ${
                mode === 'practice' ? 'bg-sky-500 dark:bg-lab-accent2 text-white dark:text-[#0f172a] shadow-sm' : 'text-slate-500 dark:text-lab-muted hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Practice
            </button>
            <button
              onClick={() => setMode('test')}
              className={`flex-1 text-xs font-bold py-1.5 rounded-lg transition-all ${mode === 'test' ? 'bg-rose-500 text-white shadow-sm' : 'text-lab-muted hover:text-white'
                }`}
            >
              Test
            </button>
          </div>
        </div>

        {/* Zero Error Adjustment */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-white uppercase">Zero Error (mm)</label>
            <button onClick={() => setZeroError(0)} className="text-[10px] text-lab-accent2 hover:underline flex items-center gap-1">
              <RefreshCw size={10} /> Reset
            </button>
          </div>
          <div className="flex items-center gap-2">
             <button 
               onClick={() => setZeroError(prev => parseFloat((prev - 0.01).toFixed(2)))}
               className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
             >-</button>
             <div className="flex-1 text-center font-mono text-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg py-1.5 text-slate-900 dark:text-white">
               {zeroError > 0 ? `+${zeroError}` : zeroError}
             </div>
             <button 
               onClick={() => setZeroError(prev => parseFloat((prev + 0.01).toFixed(2)))}
               className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
             >+</button>
          </div>
        </div>
      </div>
    </div>
  );
}
