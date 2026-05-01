import { Download, Table as TableIcon, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ActivationObservationTable({ observations, setObservations }) {
  
  const handleDownload = () => {
    if (observations.length === 0) return;
    
    const headers = ['Input Value (x)', 'Function Name', 'Output Value (y)', 'Alpha / Param'];
    const csvContent = [
      headers.join(','),
      ...observations.map(obs => `${obs.input},${obs.funcName},${obs.output},${obs.alpha}`)
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'activation_functions_observations.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const determineNature = (output, funcName) => {
    const y = parseFloat(output);
    if (funcName.toLowerCase().includes('relu') && y === 0) return 'Inactive (Thresholded)';
    if (funcName.includes('Sigmoid')) {
      if (y > 0.9) return 'Saturated (High)';
      if (y < 0.1) return 'Saturated (Low)';
      return 'Active Region';
    }
    if (funcName.includes('Tanh')) {
      if (y > 0.9) return 'Saturated (Positive)';
      if (y < -0.9) return 'Saturated (Negative)';
      return 'Active Region';
    }
    if (funcName.includes('Linear')) return 'Proportional';
    if (y < 0) return 'Negative Output';
    return 'Active';
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent/50 shadow-xl mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-lab-accent/20 rounded-lg text-lab-accent">
            <TableIcon size={20} />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">Observation Table</h2>
            <p className="text-xs text-lab-muted">Record inputs and outputs to analyze function behavior</p>
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
            className="flex items-center gap-2 px-4 py-1.5 bg-lab-accent/20 hover:bg-lab-accent/30 text-lab-accent rounded-lg text-sm font-bold transition-all border border-lab-accent/30 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <th className="px-4 py-3">Input (x)</th>
              <th className="px-4 py-3">Function</th>
              <th className="px-4 py-3">Output (y)</th>
              <th className="px-4 py-3">Alpha</th>
              <th className="px-4 py-3">Nature of Curve</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {observations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-lab-muted/50 italic">
                    No observations recorded yet. Adjust the input and click "Record" to add data points.
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
                    <td className="px-4 py-3 font-mono text-sky-400">{obs.input}</td>
                    <td className="px-4 py-3 font-medium text-white">{obs.funcName}</td>
                    <td className="px-4 py-3 font-mono text-lab-accent">{obs.output}</td>
                    <td className="px-4 py-3 font-mono">{obs.alpha}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">
                        {determineNature(obs.output, obs.funcName)}
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
