import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEMESTERS } from '../data/semesterContent.js';

function getSemesterMeta(id) {
  return SEMESTERS.find((semester) => semester.id === id);
}

export default function SemesterHubPage() {
  const { semesterId } = useParams();
  const semester = getSemesterMeta(semesterId);

  if (!semester) {
    return (
      <section className="glass-panel border-rose-500/30 p-8 text-rose-100">
        <h1 className="font-display text-2xl font-semibold">Semester not found</h1>
        <p className="mt-2 text-sm text-rose-100/80">Choose a valid semester from the home page.</p>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <motion.header 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[32px] glass-panel p-10 outline outline-1 outline-white/5"
      >
        <div className="absolute left-0 top-0 -ml-20 -mt-20 h-64 w-64 rounded-full bg-lab-accent3/10 blur-[80px]" />
        <div className="relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-lab-accent3">{semester.id.toUpperCase()}</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold text-white">{semester.label}</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-lab-muted max-w-2xl">{semester.subtitle}</p>
        </div>
      </motion.header>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid gap-5 md:grid-cols-2"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Link
            to={`/semester/${semester.id}/theory`}
            className="glass-card group relative block h-full overflow-hidden p-8 border-t-2 hover:border-l-lab-accent3 border-t-lab-accent3/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-lab-accent3/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lab-accent3">Study Materials</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-white transition-colors">Theory</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-lab-muted">Open subjects and chapter-wise PDFs for this semester.</p>
            <div className="mt-6 flex items-center gap-2 text-sm font-bold tracking-wide text-lab-accent3/80 transition-all group-hover:gap-3 group-hover:text-lab-accent3">
              <span>Open Theory</span>
              <span>&rarr;</span>
            </div>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link
            to={`/semester/${semester.id}/practical`}
            className="glass-card group relative block h-full overflow-hidden p-8 border-t-2 hover:border-l-lab-accent border-t-lab-accent/40"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-lab-accent/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lab-accent">Lab Work</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-white transition-colors">Practical</h2>
            <p className="mt-3 text-[14px] leading-relaxed text-lab-muted">Open practical experiments and course outcomes for this semester.</p>
            <div className="mt-6 flex items-center gap-2 text-sm font-bold tracking-wide text-lab-accent/80 transition-all group-hover:gap-3 group-hover:text-lab-accent">
              <span>Open Practical</span>
              <span>&rarr;</span>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
