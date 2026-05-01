import { Table, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProbabilityObservationTable({ observations, setObservations }) {
  
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
          <Table size={20} className="text-sky-400" />
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
              <th className="px-4 py-3 font-semibold">Experiment</th>
              <th className="px-4 py-3 font-semibold">Target Event</th>
              <th className="px-4 py-3 font-semibold text-center">Total Trials</th>
              <th className="px-4 py-3 font-semibold text-center">Favorable</th>
              <th className="px-4 py-3 font-semibold text-center text-sky-400">Theoretical P(E)</th>
              <th className="px-4 py-3 font-semibold text-center text-amber-400">Experimental P(E)</th>
              <th className="px-4 py-3 font-semibold text-center">Diff</th>
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
                  <td colSpan="8" className="px-4 py-8 text-center text-gray-500 italic">
                    No observations recorded yet. Run a simulation and click "Record Observation".
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
                    <td className="px-4 py-3 font-medium text-white capitalize">{obs.type}</td>
                    <td className="px-4 py-3 capitalize">{obs.condition.replace('_', ' ')}</td>
                    <td className="px-4 py-3 text-center font-mono">{obs.trials}</td>
                    <td className="px-4 py-3 text-center font-mono text-amber-200">{obs.favorableCount}</td>
                    <td className="px-4 py-3 text-center font-mono text-sky-300">
                      {(obs.theoreticalProbability * 100).toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-amber-400">
                      {(obs.experimentalProbability * 100).toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-xs">
                      {Math.abs((obs.theoreticalProbability - obs.experimentalProbability) * 100).toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => removeObservation(obs.id)}
                        className="text-red-400/50 hover:text-red-400 transition-colors p-1"
                        title="Remove Observation"
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
      
      {observations.length > 0 && (
        <div className="mt-4 text-xs text-gray-400 flex items-start gap-2 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
          <span className="font-bold text-amber-500">Note:</span>
          As per the Law of Large Numbers, observe how the difference between Theoretical and Experimental probability generally decreases as the number of trials increases.
        </div>
      )}
    </div>
  );
}
