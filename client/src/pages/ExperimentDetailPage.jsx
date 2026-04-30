import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Wrench, Beaker, CheckSquare, FileText, Library, MessageSquare, ExternalLink } from 'lucide-react';
import { useExperiment } from '../hooks/useExperiment.js';
import { resolvePublicAssetUrl } from '../utils/assetUrl.js';
import RichHtml from '../components/RichHtml.jsx';
import SelfEvaluation from '../components/SelfEvaluation.jsx';
import FeedbackForm from '../components/FeedbackForm.jsx';
import SimulatorWorkbench from '../components/simulator/SimulatorWorkbench.jsx';

const TABS = [
  { id: 'theory',      label: 'Theory',          icon: BookOpen },
  { id: 'procedure',   label: 'Procedure',        icon: Wrench },
  { id: 'simulator',   label: 'Simulator',        icon: Beaker },
  { id: 'self',        label: 'Self Eval',        icon: CheckSquare },
  { id: 'assignments', label: 'Assignments',      icon: FileText },
  { id: 'references',  label: 'References',       icon: Library },
  { id: 'feedback',    label: 'Feedback',         icon: MessageSquare },
];

export default function ExperimentDetailPage() {
  const { id } = useParams();
  const { experiment, loading, error } = useExperiment(id);
  const [tab, setTab] = useState('theory');

  const labName = useMemo(() => {
    if (!experiment?.labId) return '';
    return typeof experiment.labId === 'object' ? experiment.labId.name : '';
  }, [experiment]);

  const practicalPdfHref = useMemo(
    () => resolvePublicAssetUrl(experiment?.practicalPdfPath),
    [experiment?.practicalPdfPath]
  );

  return (
    <section className="space-y-6 lg:space-y-8 pb-10">
      {loading && <p className="text-sm text-lab-muted">Loading experiment…</p>}
      {(error || (!loading && !experiment)) && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-6 text-rose-200">
          <p className="text-sm">{error || 'Experiment not found.'}</p>
        </div>
      )}

      {!loading && experiment && (
        <>
          <nav className="flex items-center gap-2 text-[13px] text-lab-muted font-medium mb-4 flex-wrap">
            <Link to="/" className="text-lab-accent3 hover:text-white transition-colors">Home</Link>
            <span className="text-white/20">/</span>
            <Link to="/labs" className="text-lab-accent3 hover:text-white transition-colors">Labs</Link>
            {typeof experiment.labId === 'object' && experiment.labId?._id && (
              <>
                <span className="text-white/20">/</span>
                <Link to={`/labs/${experiment.labId._id}/experiments`} className="text-lab-accent3 hover:text-white transition-colors">{labName}</Link>
              </>
            )}
            <span className="text-white/20">/</span>
            <span className="text-white truncate max-w-[200px] sm:max-w-none">{experiment.title}</span>
          </nav>

          <motion.header 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden glass-panel p-8 sm:p-10"
          >
            <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-lab-accent3/10 blur-[80px]" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div>
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">{experiment.title}</h1>
                {labName && <p className="mt-2 text-[15px] text-lab-muted">{labName}</p>}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  to={`/experiment/${experiment._id}/simulator`} 
                  className="flex items-center justify-center gap-2 rounded-xl bg-lab-accent3/10 px-5 py-2.5 text-sm font-bold text-lab-accent3 border border-lab-accent3/20 transition-all hover:bg-lab-accent3 hover:text-[#040b16] shadow-[0_0_15px_rgba(56,189,248,0.1)] hover:shadow-[0_0_25px_rgba(56,189,248,0.4)]"
                >
                  <Beaker size={16} /> Full-screen Simulator
                </Link>
                {practicalPdfHref && (
                  <a 
                    href={practicalPdfHref} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/10 px-5 py-2.5 text-sm font-bold text-emerald-400 border border-emerald-500/20 transition-all hover:bg-emerald-500 hover:text-[#040b16] shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)]"
                  >
                    <FileText size={16} /> Practical manual <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </motion.header>

          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 p-2 rounded-2xl glass-card overflow-x-auto scrollbar-hide"
          >
            {TABS.map((t) => {
              const Icon = t.icon;
              const isActive = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
                    isActive ? 'text-white' : 'text-lab-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="doc-active-tab" 
                      className="absolute inset-0 bg-gradient-to-r from-lab-accent3/20 to-lab-accent3/5 border border-lab-accent3/20 rounded-xl"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                  <Icon size={16} className={`relative z-10 ${isActive ? 'text-lab-accent3' : ''}`} />
                  <span className="relative z-10 whitespace-nowrap">{t.label}</span>
                </button>
              );
            })}
          </motion.nav>

          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-panel p-6 sm:p-8 min-h-[400px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="prose prose-invert max-w-none prose-p:text-lab-muted/90 prose-headings:font-display prose-headings:text-white prose-a:text-lab-accent3 hover:prose-a:text-lab-accent3/80"
              >
                {tab === 'theory'      && <RichHtml html={experiment.theory} />}
                {tab === 'procedure'   && <RichHtml html={experiment.procedure} />}
                {tab === 'simulator'   && <SimulatorWorkbench simulatorConfig={experiment.simulatorConfig} variant="embedded" />}
                {tab === 'self'        && <SelfEvaluation questions={experiment.selfEvaluation} />}
                {tab === 'assignments' && <RichHtml html={experiment.assignment} />}
                {tab === 'references'  && <RichHtml html={experiment.references} />}
                {tab === 'feedback'    && <FeedbackForm experimentId={experiment._id} />}
              </motion.div>
            </AnimatePresence>
          </motion.section>
        </>
      )}
    </section>
  );
}