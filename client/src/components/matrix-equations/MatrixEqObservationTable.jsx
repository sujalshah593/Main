import { Download, Table as TableIcon, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MatrixEqObservationTable({ observations, setObservations }) {
  
  const handleDownload = () => {
    if (observations.length === 0) return;
    
    const headers = ['Input', 'Method/Operation', 'Steps Summary', 'Result', 'Remarks'];
    const csvContent = [
      headers.join(','),
      ...observations.map(obs => `"${obs.input}","${obs.method}","${obs.steps}","${obs.result}","${obs.remarks}"`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'matrix_equations_observations.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-pink-500/50 shadow-xl mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-500/20 rounded-lg text-pink-500">
            <TableIcon size={20} />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">Observation Table</h2>
            <p className="text-xs text-lab-muted">Record properties and operation results</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setObservations([])}
            disabled={observations.length === 0}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all border border-red-500/30 text-red-400 hover:bg-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Clear</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={observations.length === 0}
            className="flex items-center gap-2 px-4 py-1.5 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 rounded-lg text-sm font-bold transition-all border border-pink-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Download CSV</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left text-sm text-lab-muted">
          <thead className="bg-white/5 text-xs uppercase font-semibold text-white">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Input</th>
              <th className="px-4 py-3">Operation / Method</th>
              <th className="px-4 py-3">Steps Summary</th>
              <th className="px-4 py-3">Final Result</th>
              <th className="px-4 py-3">Remarks</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {observations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-lab-muted/50 italic">
                    No observations recorded yet. Enter data, select an operation, and click "Record".
                  </td>
                </tr>
              ) : (
                observations.map((obs, idx) => (
                  <motion.tr
                    key={obs.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono">{idx + 1}</td>
                    <td className="px-4 py-3 font-mono text-xs max-w-[200px] truncate" title={obs.input}>{obs.input}</td>
                    <td className="px-4 py-3 font-mono text-sky-400 uppercase">{obs.method}</td>
                    <td className="px-4 py-3 font-medium text-white">{obs.steps}</td>
                    <td className="px-4 py-3 font-mono text-pink-400">{obs.result}</td>
                    <td className="px-4 py-3 text-xs">{obs.remarks}</td>
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
