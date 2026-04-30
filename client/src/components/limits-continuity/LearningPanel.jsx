import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, AlertTriangle, PlayCircle } from 'lucide-react';

export default function LearningPanel({ activeFunction }) {
  const functionNames = {
    continuous: 'Continuous Function',
    removable: 'Removable Discontinuity (Hole)',
    jump: 'Jump Discontinuity (Piecewise)',
    infinite: 'Infinite Discontinuity (Asymptote)'
  };

  const functionEquations = {
    continuous: 'f(x) = x² - 4',
    removable: 'f(x) = (x² - 4) / (x - 2)',
    jump: 'f(x) = x + 1 (x < 2), 4 - x (x ≥ 2)',
    infinite: 'f(x) = 1 / (x - 2)²'
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Introduction Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-lab-accent/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

        <h2 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2">
          <BookOpen className="text-lab-accent" size={20} />
          Limits & Continuity
        </h2>
        
        <p className="text-lab-muted text-sm leading-relaxed mb-4">
          A limit describes the value that a function <span className="font-mono text-white">f(x)</span> approaches as the input <span className="font-mono text-white">x</span> gets closer and closer to some value <span className="font-mono text-white">a</span>.
        </p>

        <div className="bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-center text-lg text-lab-accent2 mb-4">
          lim_(x→a) f(x) = L
        </div>

        <div className="space-y-3 mt-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Current Function</h3>
          <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-lab-accent/20 flex items-center justify-center text-lab-accent">
              <PlayCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{functionNames[activeFunction]}</p>
              <p className="text-xs text-lab-muted font-mono">{functionEquations[activeFunction]}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Continuity Rules Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 rounded-2xl border-t-2 border-t-emerald-500 shadow-xl"
      >
        <h2 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="text-emerald-400" size={20} />
          Rules of Continuity
        </h2>
        <p className="text-sm text-lab-muted mb-4">
          A function is continuous at a point <span className="font-mono text-white">x = a</span> if and only if all three of these conditions are met:
        </p>

        <div className="space-y-3">
          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
            <p className="text-sm text-white">
              <strong className="text-emerald-300 font-mono">f(a)</strong> is defined. <br/>
              <span className="text-lab-muted text-xs">There is no hole or asymptote exactly at a.</span>
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
            <p className="text-sm text-white">
              <strong className="text-emerald-300 font-mono">lim_(x→a) f(x)</strong> exists. <br/>
              <span className="text-lab-muted text-xs">The left-hand limit equals the right-hand limit.</span>
            </p>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
            <p className="text-sm text-white">
              <strong className="text-emerald-300 font-mono">lim_(x→a) f(x) = f(a)</strong> <br/>
              <span className="text-lab-muted text-xs">The limit equals the actual function value.</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Discontinuities Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-5 rounded-2xl border-l-4 border-l-rose-500 bg-rose-500/5 shadow-xl"
      >
        <h3 className="text-rose-400 font-bold mb-2 flex items-center gap-2">
          <AlertTriangle size={18} />
          Types of Discontinuity
        </h3>
        <ul className="text-sm text-lab-muted leading-relaxed space-y-2 list-disc pl-4">
          <li>
            <strong className="text-white">Removable (Hole):</strong> The limit exists, but $f(a)$ is undefined or doesn't equal the limit.
          </li>
          <li>
            <strong className="text-white">Jump:</strong> The left and right limits exist but are not equal to each other.
          </li>
          <li>
            <strong className="text-white">Infinite:</strong> The function grows without bound (approaches $\infty$ or $-\infty$) near $a$.
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
