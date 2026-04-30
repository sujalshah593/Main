import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileCode2 } from 'lucide-react';
import { useLabs } from '../hooks/useLabs.js';
import { useExperiments } from '../hooks/useExperiments.js';

export default function ExperimentsPage() {
  const { labId } = useParams();
  const { labs, loading: labsLoading } = useLabs();
  const { experiments, loading: exLoading, error } = useExperiments(labId);
  const lab = labs.find((l) => l._id === labId);

  return (
    <section className="space-y-8 max-w-4xl">
      <nav className="flex items-center gap-2 text-[13px] text-lab-muted font-medium mb-2">
        <Link to="/" className="text-lab-accent3 hover:text-white transition-colors">Home</Link>
        <span className="text-white/20">/</span>
        <Link to="/labs" className="text-lab-accent3 hover:text-white transition-colors">Labs</Link>
        <span className="text-white/20">/</span>
        <span className="text-white">{lab?.name || 'Lab'}</span>
      </nav>

      <motion.header 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-4xl font-extrabold text-white tracking-tight">{lab?.name || 'Experiments'}</h1>
        {lab?.description && <p className="mt-3 text-[15px] leading-relaxed text-lab-muted max-w-2xl">{lab.description}</p>}
      </motion.header>

      {(labsLoading || exLoading) && <p className="text-sm text-lab-muted">Loading experiments…</p>}
      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-6 text-rose-200">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!labsLoading && !exLoading && !error && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel overflow-hidden"
        >
          {experiments.length > 0 ? (
            <div className="divide-y divide-white/5">
              {experiments.map((ex, i) => (
                <Link 
                  key={ex._id} 
                  to={`/experiment/${ex._id}`} 
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 transition-colors hover:bg-white/[0.03] relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-lab-accent3 to-lab-accent2 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="flex items-center gap-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lab-accent3/10 text-[13px] font-bold text-lab-accent3 border border-lab-accent3/20 shadow-[0_0_10px_rgba(56,189,248,0.1)]">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <span className="text-[15px] font-medium text-white group-hover:text-lab-accent3 transition-colors">{ex.title}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-lab-accent3 ml-15 sm:ml-0 opacity-70 group-hover:opacity-100 transition-opacity">
                    <FileCode2 size={16} />
                    <span>Open Exp</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-sm text-lab-muted">No experiments found for this lab.</div>
          )}
        </motion.div>
      )}
    </section>
  );
}