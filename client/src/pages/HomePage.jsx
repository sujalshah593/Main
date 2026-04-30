import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEMESTERS } from '../data/semesterContent.js';

export default function HomePage() {
  return (
    <section className="space-y-8">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[32px] glass-panel p-10 outline outline-1 outline-white/5"
      >
        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-lab-accent3/20 blur-[80px]" />
        <div className="relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-lab-accent3">Subject Portal</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-white md:text-5xl">Choose Your Semester</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-lab-muted">
            Start by selecting your semester, then pick <strong>Theory</strong> or <strong>Practical</strong> modules to access interactive simulators and course materials.
          </p>
        </div>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid gap-5 md:grid-cols-2"
      >
        {SEMESTERS.map((semester, i) => (
          <motion.div
            key={semester.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <Link
              to={`/semester/${semester.id}`}
              className="glass-card group relative block h-full overflow-hidden p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-lab-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lab-accent3">{semester.id.toUpperCase()}</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-white transition-colors group-hover:text-lab-accent">{semester.label}</h2>
              <p className="mt-3 text-[14px] leading-relaxed text-lab-muted">{semester.subtitle}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-bold tracking-wide text-lab-accent3/80 transition-all group-hover:gap-3 group-hover:text-lab-accent3">
                <span>Continue</span>
                <span>&rarr;</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}