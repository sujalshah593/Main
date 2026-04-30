import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Beaker, Zap, Magnet, Lightbulb, Telescope, Atom } from 'lucide-react';
import { useLabs } from '../hooks/useLabs.js';

const LAB_ICONS = [Atom, Telescope, Zap, Magnet, Lightbulb, Beaker];

export default function LabsPage() {
  const { labs, loading, error } = useLabs();

  return (
    <section className="space-y-8">
      <nav className="flex items-center gap-2 text-[13px] text-lab-muted font-medium mb-2">
        <Link to="/" className="text-lab-accent3 hover:text-white transition-colors">Home</Link>
        <span className="text-white/20">/</span>
        <span className="text-white">Labs</span>
      </nav>

      <motion.header 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-4xl font-extrabold text-white tracking-tight">Lab Categories</h1>
        <p className="mt-2 text-[15px] text-lab-muted">Choose a category to explore its interactive experiments.</p>
      </motion.header>

      {loading && <p className="text-sm text-lab-muted">Loading labs…</p>}
      {error && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-6 text-rose-200">
          <strong className="block font-display text-lg mb-2 text-white">Could not reach the API</strong>
          <p className="text-sm">{error}</p>
          <p className="mt-2 text-xs opacity-75">Ensure MongoDB is running, seed the database, and start the Express server on port 5000.</p>
        </div>
      )}

      {!loading && !error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {labs.map((lab, i) => {
            const Icon = LAB_ICONS[i % LAB_ICONS.length];
            return (
              <motion.div
                key={lab._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Link to={`/labs/${lab._id}/experiments`} className="glass-card group flex h-full flex-col p-6 relative overflow-hidden border-t-2 border-t-transparent hover:border-t-lab-accent3 transition-all duration-300">
                  <div className="absolute right-0 top-0 -mr-6 -mt-6 h-24 w-24 rounded-full bg-lab-accent3/10 blur-[30px] transition-all group-hover:bg-lab-accent3/20" />
                  
                  <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-lab-accent3/10 text-lab-accent3 border border-lab-accent3/20 shadow-[0_0_15px_rgba(56,189,248,0.15)] group-hover:scale-110 transition-transform duration-300">
                      <Icon size={26} strokeWidth={1.5} />
                    </div>
                    <div className="font-display text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>
                  
                  <h2 className="font-display text-xl font-bold text-white mb-3 relative z-10">{lab.name}</h2>
                  <p className="text-[14px] leading-relaxed text-lab-muted flex-1 relative z-10">{lab.description}</p>
                  
                  <div className="mt-6 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-lab-accent3 relative z-10 transition-all group-hover:gap-3">
                    <span>View experiments</span>
                    <span>&rarr;</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}