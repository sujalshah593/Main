import { motion, AnimatePresence } from 'framer-motion';
import { Table, Trash2, Download } from 'lucide-react';

export default function ComplexObservationTable({ observations, setObservations }) {
  const removeObservation = (id) => {
    setObservations(prev => prev.filter(o => o.id !== id));
  };

  const clearAll = () => {
    if (confirm('Clear all recorded observations?')) {
      setObservations([]);
    }
  };

  return (
    <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <h3 className="text-sm font-bold uppercase tracking-widest text-lab-muted flex items-center gap-2">
          <Table size={16} className="text-indigo-400" />
          Data Collection & Observation
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={clearAll}
            className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/10 text-lab-muted hover:text-rose-400 transition-all border border-white/5 hover:border-rose-500/20"
            title="Clear All"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-indigo-300">z₁</th>
              <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-pink-300">z₂</th>
              <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-emerald-300 hidden sm:table-cell">Operation</th>
              <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-white">Result (z)</th>
              <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-lab-muted text-center hidden md:table-cell">Real</th>
              <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-lab-muted text-center hidden md:table-cell">Imag</th>
              <th className="p-4 text-[11px] font-bold uppercase tracking-wider text-lab-muted text-center">Modulus</th>
              <th className="p-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <AnimatePresence initial={false}>
              {observations.length > 0 ? (
                observations.map((obs) => (
                  <motion.tr 
                    key={obs.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="hover:bg-white/[0.02] group transition-colors"
                  >
                    <td className="p-4 text-sm font-mono text-indigo-200">{obs.z1}</td>
                    <td className="p-4 text-sm font-mono text-pink-200">{obs.z2}</td>
                    <td className="p-4 text-[10px] font-bold uppercase text-emerald-400 hidden sm:table-cell">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        {obs.op}
                      </span>
                    </td>
                    <td className="p-4 text-sm font-mono font-bold text-white">{obs.result}</td>
                    <td className="p-4 text-sm font-mono text-lab-muted text-center hidden md:table-cell">{obs.real}</td>
                    <td className="p-4 text-sm font-mono text-lab-muted text-center hidden md:table-cell">{obs.imag}</td>
                    <td className="p-4 text-sm font-mono text-amber-300 text-center font-bold">{obs.modulus}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => removeObservation(obs.id)}
                        className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-rose-500/20 text-rose-400 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-12 text-center text-sm text-lab-muted italic">
                    No data points collected yet. Perform operations to record observations.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
