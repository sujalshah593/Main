import { motion } from 'framer-motion';
import { BookOpen, Target, MountainSnow, FunctionSquare, Navigation } from 'lucide-react';
import React from 'react';

export default function LearningPanel({ mode, optimizationType, activeFn }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-lab-accent/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
        
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <div className="p-2 bg-lab-accent/20 rounded-lg text-lab-accent">
            <BookOpen size={20} />
          </div>
          <h2 className="text-xl font-bold text-white">Theory & Concepts</h2>
        </div>

        {mode === 'optimize' && (
          <div className={`mb-6 p-4 rounded-xl border ${optimizationType === 'descent' ? 'bg-sky-500/10 border-sky-500/20' : 'bg-rose-500/10 border-rose-500/20'}`}>
            <h3 className={`font-semibold mb-2 flex items-center gap-2 ${optimizationType === 'descent' ? 'text-sky-300' : 'text-rose-300'}`}>
              <Target size={16} /> 
              {optimizationType === 'descent' ? 'Gradient Descent' : 'Gradient Ascent'}
            </h3>
            <p className={`text-sm leading-relaxed ${optimizationType === 'descent' ? 'text-sky-100/80' : 'text-rose-100/80'}`}>
              {optimizationType === 'descent' 
                ? "Algorithm steps in the direction of the NEGATIVE gradient to find a local minimum." 
                : "Algorithm steps in the direction of the POSITIVE gradient to find a local maximum."}
              <br/><br/>
              <strong>Update Rule:</strong> <br/>
              <code className="text-xs bg-black/30 p-1 rounded">x_{"{n+1}"} = x_n {optimizationType === 'descent' ? '-' : '+'} η ∇f(x_n)</code>
            </p>
          </div>
        )}

        <div className="flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="border-l-4 border-lab-accent pl-3">
              <h3 className="text-lg font-bold text-white">Partial Derivatives</h3>
            </div>
            <p className="text-sm text-lab-text leading-relaxed">
              For a multivariable function <code className="text-xs bg-black/30 px-1 py-0.5 rounded">f(x, y)</code>, the partial derivative with respect to <code className="text-xs bg-black/30 px-1 py-0.5 rounded">x</code> (denoted <code className="text-xs bg-black/30 px-1 py-0.5 rounded">∂f/∂x</code> or <code className="text-xs bg-black/30 px-1 py-0.5 rounded">f_x</code>) measures the rate of change of the function as only <code className="text-xs bg-black/30 px-1 py-0.5 rounded">x</code> changes, keeping <code className="text-xs bg-black/30 px-1 py-0.5 rounded">y</code> constant.
            </p>
            
            <div className="bg-white/5 rounded-xl border border-white/10 p-4 space-y-3">
               <h4 className="text-xs uppercase tracking-wider font-semibold text-lab-muted flex items-center gap-2">
                 <Navigation size={14} className="text-amber-400" /> The Gradient Vector (∇f)
               </h4>
               <p className="text-sm text-lab-text">
                 The gradient is a vector grouping all partial derivatives:
                 <br />
                 <code className="text-xs bg-black/30 p-1 rounded mt-2 block w-fit">∇f = [ ∂f/∂x, ∂f/∂y ]</code>
               </p>
               <ul className="text-sm text-lab-text space-y-2 mt-2 list-disc pl-4">
                 <li>Points in the direction of <strong>steepest ascent</strong>.</li>
                 <li>Its magnitude indicates the <strong>steepness</strong> of that slope.</li>
                 <li>Is orthogonal to the contour lines (level curves).</li>
               </ul>
            </div>

            <div className="bg-white/5 rounded-xl border border-white/10 p-4 space-y-3">
               <h4 className="text-xs uppercase tracking-wider font-semibold text-lab-muted flex items-center gap-2">
                 <FunctionSquare size={14} className="text-sky-400" /> Critical Points
               </h4>
               <p className="text-sm text-lab-text">
                 A point where the gradient is zero (<code className="text-xs bg-black/30 px-1 py-0.5 rounded">∇f = [0, 0]</code>) or undefined. These can be:
               </p>
               <ul className="text-sm text-lab-text space-y-1 list-disc pl-4">
                 <li><strong>Local Minimum:</strong> Looks like a valley bottom.</li>
                 <li><strong>Local Maximum:</strong> Looks like a mountain peak.</li>
                 <li><strong>Saddle Point:</strong> Minimum along one axis, maximum along another.</li>
               </ul>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}
