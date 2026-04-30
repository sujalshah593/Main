import { Settings2, Scale, Calculator, Beaker, RotateCcw } from 'lucide-react';

export default function SimulatorControls({ 
  objects, 
  selectedObjectId, 
  setSelectedObjectId, 
  activeTool, 
  setActiveTool,
  resetSimulator
}) {
  return (
    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent2/50 relative shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Settings2 className="text-lab-accent2" size={20} />
        <h3 className="font-display font-bold text-white uppercase tracking-wider text-sm">Experiment Controls</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Object Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-lab-muted uppercase tracking-wider flex items-center justify-between">
            <span>Select Object</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {objects.map((obj) => (
              <button
                key={obj.id}
                onClick={() => {
                  setSelectedObjectId(obj.id);
                  resetSimulator();
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex flex-col items-center justify-center gap-1 ${
                  selectedObjectId === obj.id
                    ? 'bg-lab-accent2/20 text-lab-accent2 border-lab-accent2/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    : 'bg-[#0f172a]/50 text-lab-muted border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {obj.name}
                <span className="text-[9px] opacity-70 font-normal">{obj.type === 'regular' ? 'Regular' : 'Irregular'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tool Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-lab-muted uppercase tracking-wider flex items-center justify-between">
            <span>Select Tool</span>
            <button 
              onClick={resetSimulator}
              className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-white flex items-center gap-1 transition-colors"
            >
              <RotateCcw size={10} /> Reset Setup
            </button>
          </label>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTool('scale')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                activeTool === 'scale'
                  ? 'bg-sky-500/20 text-sky-400 border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.2)]'
                  : 'bg-[#0f172a]/50 text-lab-muted border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              <Scale size={16} /> Weighing Balance (Mass)
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTool('ruler')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                  activeTool === 'ruler'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-[#0f172a]/50 text-lab-muted border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                <Calculator size={14} /> Ruler
              </button>
              <button
                onClick={() => setActiveTool('cylinder')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-2 ${
                  activeTool === 'cylinder'
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'bg-[#0f172a]/50 text-lab-muted border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                <Beaker size={14} /> Cylinder
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
