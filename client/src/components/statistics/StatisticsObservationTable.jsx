import { Table, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StatisticsObservationTable({ observations, setObservations }) {
  
  const clearTable = () => {
    setObservations([]);
  };

  const removeObservation = (id) => {
    setObservations(observations.filter(obs => obs.id !== id));
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 mt-6 relative shadow-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Table size={20} className="text-emerald-400" />
          Observation Table
        </h2>
        
        {observations.length > 0 && (
          <button 
            onClick={clearTable}
            className="text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg transition-colors border border-red-500/20 flex items-center gap-1.5"
          >
            <Trash2 size={14} /> Clear All
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/20">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-4 py-3 font-semibold">Dataset Label</th>
              <th className="px-4 py-3 font-semibold text-center">Count (n)</th>
              <th className="px-4 py-3 font-semibold text-center text-sky-400">Mean</th>
              <th className="px-4 py-3 font-semibold text-center text-amber-400">Variance</th>
              <th className="px-4 py-3 font-semibold text-center text-emerald-400">Std Dev</th>
              <th className="px-4 py-3 font-semibold">Remarks</th>
              <th className="px-4 py-3 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {observations.length === 0 ? (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td colSpan="7" className="px-4 py-8 text-center text-gray-500 italic">
                    No observations recorded yet. Configure your data and click "Record Observation".
                  </td>
                </motion.tr>
              ) : (
                observations.map((obs) => (
                  <motion.tr
                    key={obs.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-white">{obs.label}</td>
                    <td className="px-4 py-3 text-center font-mono">{obs.count}</td>
                    <td className="px-4 py-3 text-center font-mono text-sky-300">{obs.mean.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center font-mono text-amber-300">{obs.variance.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center font-mono text-emerald-300">{obs.stdDev.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold ${obs.stdDev > 20 ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {obs.stdDev > 20 ? 'High Spread' : 'Low Spread'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => removeObservation(obs.id)}
                        className="text-red-400/50 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
