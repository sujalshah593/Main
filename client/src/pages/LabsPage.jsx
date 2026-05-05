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
        <Link to="/dashboard" className="text-lab-accent3 hover:text-white transition-colors">Home</Link>
        <span className="text-white/20">/</span>
        <span className="text-white">Labs</span>
      </nav>

      <motion.header 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-display text-4xl font-extrabold text-black dark:text-white tracking-tight">Interactive Labs</h1>
        <p className="mt-4 text-[16px] leading-relaxed text-lab-muted max-w-2xl">
          Our experiments are now organized by semester for a better learning experience. 
          Please visit the <Link to="/semester/sem-1/practical" className="text-lab-accent3 hover:underline">Practical Labs</Link> portal to explore interactive simulations.
        </p>
      </motion.header>

      <div className="mt-12 p-8 rounded-[32px] border border-white/5 bg-white/[0.02] text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-lab-accent3/10 text-lab-accent3">
            <FlaskConical size={40} />
          </div>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Looking for experiments?</h2>
        <p className="text-lab-muted mb-8 max-w-md mx-auto">All interactive simulations, including Electronics, Modern Physics, and Quantum Physics, are now integrated into the semester-wise practical sections.</p>
        <Link 
          to="/semester/sem-1/practical" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-lab-accent3 text-black font-bold rounded-xl hover:scale-105 transition-all"
        >
          Go to Practical Labs
        </Link>
      </div>
    </section>
  );
}
