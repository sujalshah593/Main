import { motion } from 'framer-motion';
import { BookOpen, Target, Navigation, CheckCircle2, TrendingDown, TriangleAlert } from 'lucide-react';
import React from 'react';

export default function LearningPanel({ mode, setMode }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-emerald-500 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
            <BookOpen size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Understanding GD</h2>
        </div>

        <div className="flex gap-2 mb-6 bg-black/20 p-1.5 rounded-xl border border-white/5 w-fit relative z-10">
          <button
            onClick={() => setMode('explore')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${mode === 'explore' ? 'bg-emerald-500 text-white' : 'text-lab-muted hover:text-white'}`}
          >
            Theory
          </button>
          <button
            onClick={() => setMode('guided')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${mode === 'guided' ? 'bg-amber-500 text-white' : 'text-lab-muted hover:text-white'}`}
          >
            Experiments
          </button>
        </div>

        {mode === 'explore' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingDown size={18} className="text-emerald-400" /> What is Gradient Descent?
              </h3>
              <p className="text-sm text-lab-text leading-relaxed">
                Gradient Descent is an optimization algorithm used to find the minimum of a function. Imagine a blindfolded person trying to reach the bottom of a valley; they feel the slope of the ground and take a step downwards.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl border border-white/10 p-4 space-y-3">
               <h4 className="text-sm font-bold text-white flex items-center gap-2">
                 The Update Rule
               </h4>
               <p className="text-sm text-lab-text">
                 To reach the minimum, we update our position <code className="text-xs bg-black/30 px-1 rounded">x</code> in the opposite direction of the gradient <code className="text-xs bg-black/30 px-1 rounded">∇f(x)</code>.
               </p>
               <div className="font-mono text-center bg-black/40 py-2 rounded-lg text-emerald-300 border border-white/5 my-2">
                 x_new = x_old - η * ∇f(x_old)
               </div>
               <p className="text-xs text-lab-muted">
                 Where <strong>η (eta)</strong> is the <em>Learning Rate</em>.
               </p>
            </div>

            <div className="bg-white/5 rounded-xl border border-white/10 p-4 space-y-3">
               <h4 className="text-sm font-bold text-white flex items-center gap-2">
                 <Navigation size={16} className="text-sky-400" /> Learning Rate (η)
               </h4>
               <ul className="text-sm text-lab-text space-y-2 list-disc pl-4">
                 <li><strong>Too Small:</strong> Takes tiny steps. Convergence is very slow.</li>
                 <li><strong>Optimal:</strong> Quickly and smoothly reaches the minimum.</li>
                 <li><strong>Too Large:</strong> Overshoots the minimum, zig-zagging.</li>
                 <li><strong>Extreme:</strong> Diverges entirely, escaping the valley.</li>
               </ul>
            </div>
            
            <div className="bg-rose-500/10 rounded-xl border border-rose-500/20 p-4 space-y-2">
               <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                 <TriangleAlert size={16} /> Non-Convex Functions
               </h4>
               <p className="text-xs text-rose-100/80">
                 In complex functions (like the polynomial), GD might get stuck in a <strong>Local Minimum</strong> instead of the <strong>Global Minimum</strong>, depending entirely on where you start!
               </p>
            </div>

          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Target size={18} className="text-amber-400" /> Guided Experiments
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 border-l-4 border-l-amber-500">
                <h4 className="font-bold text-sm text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-amber-500"/> Experiment 1: The Perfect Step
                </h4>
                <p className="text-xs text-lab-text mb-2">
                  Select the <strong>1D Quadratic</strong> function. Set Learning Rate to <strong>0.1</strong>. Click Play.
                </p>
                <p className="text-xs text-lab-muted italic">Observe how the steps get smaller as it reaches the bottom.</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10 border-l-4 border-l-rose-500">
                <h4 className="font-bold text-sm text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-rose-500"/> Experiment 2: Divergence
                </h4>
                <p className="text-xs text-lab-text mb-2">
                  Keep the <strong>1D Quadratic</strong>. Set Learning Rate to <strong>1.05</strong>. Click Play.
                </p>
                <p className="text-xs text-lab-muted italic">What happens? Why does the value increase?</p>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10 border-l-4 border-l-sky-500">
                <h4 className="font-bold text-sm text-white flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-sky-500"/> Experiment 3: Local Minima
                </h4>
                <p className="text-xs text-lab-text mb-2">
                  Select the <strong>1D Polynomial</strong>. Start once at X = -3, save it to history. Then start again at X = 3.
                </p>
                <p className="text-xs text-lab-muted italic">Notice how they end up in different pits.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
