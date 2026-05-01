import { Table, Trash2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SimulationObservationTable({ observations, setObservations }) {
  
  const clearTable = () => setObservations([]);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 relative shadow-lg overflow-hidden flex flex-col min-h-[300px]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Table size={20} className="text-emerald-400" />
          <h2 className="text-lg font-bold text-white">Observation Table</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {observations.length > 0 && (
            <>
              <button 
                onClick={() => {}} // Download logic can be added later
                className="text-xs font-semibold text-gray-400 hover:text-white bg-white/5 px-3 py-1.5 rounded-lg transition-colors border border-white/10 flex items-center gap-1.5"
              >
                <Download size={14} /> Export
              </button>
              <button 
                onClick={clearTable}
                className="text-xs font-semibold text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors border border-red-500/20 flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Clear
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-x-auto rounded-xl border border-white/10 bg-black/20">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="text-xs text-gray-400 uppercase bg-white/5 border-b border-white/10">
            <tr>
              <th className="px-4 py-3 font-semibold">Sim Type</th>
              <th className="px-4 py-3 font-semibold text-center">Trials</th>
              <th className="px-4 py-3 font-semibold">Most Common</th>
              <th className="px-4 py-3 font-semibold">Least Common</th>
              <th className="px-4 py-3 font-semibold">Distribution</th>
              <th className="px-4 py-3">Remarks</th>
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
                  <td colSpan="6" className="px-4 py-12 text-center text-gray-500 italic">
                    No simulations logged yet. Run a simulation and click "Log Results".
                  </td>
                </motion.tr>
              ) : (
                observations.map((obs, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3 font-bold text-emerald-400 uppercase tracking-tighter text-xs">{obs.type}</td>
                    <td className="px-4 py-3 text-center font-mono">{obs.trials}</td>
                    <td className="px-4 py-3">
                       <div className="flex flex-col">
                          <span className="text-white font-semibold">{obs.mostCommon.name}</span>
                          <span className="text-[10px] text-emerald-500 font-bold">{obs.mostCommon.prob}%</span>
                       </div>
                    </td>
                    <td className="px-4 py-3">
                       <div className="flex flex-col">
                          <span className="text-white/70">{obs.leastCommon.name}</span>
                          <span className="text-[10px] text-red-500 font-bold">{obs.leastCommon.prob}%</span>
                       </div>
                    </td>
                    <td className="px-4 py-3 min-w-[120px]">
                       <div className="flex gap-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          {Object.values(obs.results).map((val, i) => (
                            <div 
                              key={i} 
                              className="h-full bg-emerald-500/40" 
                              style={{ width: `${(val / obs.trials) * 100}%` }}
                            />
                          ))}
                       </div>
                    </td>
                    <td className="px-4 py-3">
                       <span className="text-[10px] text-gray-500 italic truncate block max-w-[100px]">
                          {obs.trials > 100 ? 'High Confidence' : 'Small Sample Size'}
                       </span>
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
