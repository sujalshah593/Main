import { ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ObservationTable({ activeFunction, params }) {

  const getTransformationSteps = () => {
    const steps = [];

    // Base function
    let fnStr = 'f(x)';
    switch (activeFunction) {
      case 'linear': fnStr = 'x'; break;
      case 'quadratic': fnStr = 'x²'; break;
      case 'cubic': fnStr = 'x³'; break;
      case 'absolute': fnStr = '|x|'; break;
      case 'exponential': fnStr = 'eˣ'; break;
      case 'logarithmic': fnStr = 'ln(x)'; break;
    }

    steps.push({
      id: 1,
      type: 'Base Function',
      desc: `Start with base curve ${fnStr}`,
      math: `y = ${fnStr}`
    });

    // Horizontal Shift
    if (params.h !== 0) {
      steps.push({
        id: 2,
        type: 'Horizontal Shift',
        desc: `Shift ${params.h > 0 ? 'right' : 'left'} by ${Math.abs(params.h)} units`,
        math: `x → (x ${params.h > 0 ? '- ' + params.h : '+ ' + Math.abs(params.h)})`
      });
    }

    // Horizontal Reflection
    if (params.reflectY) {
      steps.push({
        id: 3,
        type: 'Horizontal Reflection',
        desc: 'Reflect across the y-axis',
        math: `x → -x`
      });
    }

    // Vertical Stretch/Compression & X-axis Reflection (a)
    if (params.a < 0) {
      steps.push({
        id: 4,
        type: 'Vertical Reflection',
        desc: 'Reflect across the x-axis',
        math: `y → -y`
      });
    }

    if (Math.abs(params.a) !== 1) {
      const mag = Math.abs(params.a);
      steps.push({
        id: 5,
        type: mag > 1 ? 'Vertical Stretch' : 'Vertical Compression',
        desc: `Scale vertically by factor of ${mag}`,
        math: `y → ${mag}y`
      });
    }

    // Vertical Shift
    if (params.k !== 0) {
      steps.push({
        id: 6,
        type: 'Vertical Shift',
        desc: `Shift ${params.k > 0 ? 'up' : 'down'} by ${Math.abs(params.k)} units`,
        math: `y → y ${params.k > 0 ? '+ ' + params.k : '- ' + Math.abs(params.k)}`
      });
    }

    return steps;
  };

  const steps = getTransformationSteps();

  return (
    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-indigo-500 shadow-xl overflow-hidden">
      <h3 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
        <ListChecks className="text-indigo-400" size={20} />
        Transformation Sequence
      </h3>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-lab-muted">
              <th className="p-4 font-bold">Step</th>
              <th className="p-4 font-bold">Operation</th>
              <th className="p-4 font-bold">Description</th>
              <th className="p-4 font-bold">Algebraic Change</th>
            </tr>
          </thead>
          <tbody>
            {steps.length === 1 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-lab-muted text-sm border-b border-white/5">
                  No transformations applied yet. Try adjusting the sliders!
                </td>
              </tr>
            ) : (
              steps.map((step, index) => (
                <motion.tr 
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4">
                    <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-bold text-white">{step.type}</td>
                  <td className="p-4 text-sm text-lab-muted">{step.desc}</td>
                  <td className="p-4">
                    <span className="font-mono text-xs bg-black/40 px-2 py-1 rounded text-sky-300 border border-white/5">
                      {step.math}
                    </span>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
