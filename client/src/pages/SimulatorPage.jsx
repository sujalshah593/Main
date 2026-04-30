import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MonitorPlay } from 'lucide-react';
import { useExperiment } from '../hooks/useExperiment.js';
import SimulatorWorkbench from '../components/simulator/SimulatorWorkbench.jsx';

export default function SimulatorPage() {
  const { id } = useParams();
  const { experiment, loading, error } = useExperiment(id);

  return (
    <section className="flex flex-col h-[calc(100vh-6rem)] relative z-10 w-full overflow-hidden">
      {loading && <p className="text-sm text-lab-muted">Loading simulator…</p>}
      {(error || (!loading && !experiment)) && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-6 text-rose-200">
          <p className="text-sm">{error || 'Experiment not found.'}</p>
        </div>
      )}

      {!loading && experiment && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col h-full gap-4 w-full"
        >
          {/* top bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <Link to={`/experiment/${experiment._id}`} className="group flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-lab-muted hover:text-white transition-all border border-white/5 hover:border-white/20">
                  <ArrowLeft size={16} />
                </Link>
                <h1 className="font-display text-2xl font-extrabold text-white tracking-tight">{experiment.title}</h1>
              </div>
              <div className="flex items-center gap-2 pl-[3.25rem] text-xs text-lab-muted">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lab-accent3 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lab-accent3"></span>
                </span>
                Full-screen interactive simulator
              </div>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lab-accent3/80 bg-lab-accent3/10 px-4 py-2 rounded-full border border-lab-accent3/20">
              <MonitorPlay size={14} /> Workbench Mode
            </div>
          </div>

          {/* simulator */}
          <div className="flex-1 rounded-2xl glass-panel overflow-hidden outline outline-1 outline-white/5 relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
            <SimulatorWorkbench simulatorConfig={experiment.simulatorConfig} variant="fullscreen" />
          </div>
        </motion.div>
      )}
    </section>
  );
}