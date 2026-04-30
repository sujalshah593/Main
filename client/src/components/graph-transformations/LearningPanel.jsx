import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, AlertTriangle, PlayCircle } from 'lucide-react';

export default function LearningPanel({ activeFunction }) {
  const functionNames = {
    linear: 'Linear Function',
    quadratic: 'Quadratic Function',
    cubic: 'Cubic Function',
    exponential: 'Exponential Function',
    logarithmic: 'Logarithmic Function',
    absolute: 'Absolute Value Function'
  };

  const functionEquations = {
    linear: 'f(x) = x',
    quadratic: 'f(x) = x^2',
    cubic: 'f(x) = x^3',
    exponential: 'f(x) = e^x',
    logarithmic: 'f(x) = \\ln(x)',
    absolute: 'f(x) = |x|'
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
          Graph Transformations
        </h2>
        
        <p className="text-lab-muted text-sm leading-relaxed mb-4">
          Transformations allow us to shift, scale, and reflect a base mathematical function. 
          The general formula for transforming a function <span className="font-mono text-white">f(x)</span> is:
        </p>

        <div className="bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-center text-lg text-lab-accent2 mb-4">
          y = a · f(x - h) + k
        </div>

        <div className="space-y-3 mt-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Base Function</h3>
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

      {/* Transformations Breakdown Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 rounded-2xl border-t-2 border-t-emerald-500 shadow-xl"
      >
        <h2 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
          <Lightbulb className="text-emerald-400" size={20} />
          How Parameters Work
        </h2>

        <div className="space-y-4">
          <div className="group p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-colors">
            <h4 className="text-emerald-400 font-bold mb-1 flex items-center gap-2">
              <span className="font-mono text-xs bg-emerald-500/20 px-2 py-0.5 rounded">k</span> Vertical Shift
            </h4>
            <p className="text-sm text-lab-muted">
              Adding <span className="text-white font-mono">k</span> to the function shifts the graph up (if <span className="text-white font-mono">k {'>'} 0</span>) or down (if <span className="text-white font-mono">k {'<'} 0</span>).
            </p>
          </div>

          <div className="group p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-colors">
            <h4 className="text-sky-400 font-bold mb-1 flex items-center gap-2">
              <span className="font-mono text-xs bg-sky-500/20 px-2 py-0.5 rounded">h</span> Horizontal Shift
            </h4>
            <p className="text-sm text-lab-muted">
              Subtracting <span className="text-white font-mono">h</span> inside the function shifts the graph right (if <span className="text-white font-mono">h {'>'} 0</span>) or left (if <span className="text-white font-mono">h {'<'} 0</span>).
            </p>
          </div>

          <div className="group p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-colors">
            <h4 className="text-amber-400 font-bold mb-1 flex items-center gap-2">
              <span className="font-mono text-xs bg-amber-500/20 px-2 py-0.5 rounded">a</span> Vertical Stretch
            </h4>
            <p className="text-sm text-lab-muted">
              Multiplying by <span className="text-white font-mono">a</span> stretches the graph vertically (if <span className="text-white font-mono">|a| {'>'} 1</span>) or compresses it (if <span className="text-white font-mono">0 {'<'} |a| {'<'} 1</span>).
            </p>
          </div>
        </div>
      </motion.div>

      {/* Reflections Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-5 rounded-2xl border-l-4 border-l-rose-500 bg-rose-500/5 shadow-xl"
      >
        <h3 className="text-rose-400 font-bold mb-2 flex items-center gap-2">
          <AlertTriangle size={18} />
          Reflections
        </h3>
        <p className="text-sm text-lab-muted leading-relaxed">
          • A negative <span className="text-white font-mono">a</span> value (i.e. <span className="text-white font-mono">-f(x)</span>) reflects the graph across the <strong>x-axis</strong>.<br/>
          • Negating the input (i.e. <span className="text-white font-mono">f(-x)</span>) reflects the graph across the <strong>y-axis</strong>.
        </p>
      </motion.div>
    </div>
  );
}
