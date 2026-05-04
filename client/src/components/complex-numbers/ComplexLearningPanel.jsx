import { motion } from 'framer-motion';
import { BookOpen, HelpCircle, Info } from 'lucide-react';

export default function ComplexLearningPanel() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Theory Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-2xl border-t-2 border-t-indigo-500/50 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <BookOpen size={64} />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Info className="text-indigo-400" size={20} />
          Theory: Complex Numbers
        </h3>
        
        <div className="space-y-4 text-sm leading-relaxed text-lab-muted">
          <p>
            A <strong className="text-indigo-300">complex number</strong> is a number that can be expressed in the form <span className="bg-white/5 px-2 py-0.5 rounded italic text-white">z = a + ib</span>, where <em>a</em> and <em>b</em> are real numbers, and <em>i</em> is the imaginary unit, satisfying <span className="italic text-white">i² = -1</span>.
          </p>
          
          <ul className="space-y-2 list-disc list-inside border-l-2 border-indigo-500/30 pl-4">
            <li><strong className="text-indigo-200">Real Part (Re z):</strong> The value <em>a</em>.</li>
            <li><strong className="text-indigo-200">Imaginary Part (Im z):</strong> The value <em>b</em>.</li>
            <li><strong className="text-indigo-200">Argand Plane:</strong> A geometric representation where the x-axis represents the real part and the y-axis represents the imaginary part.</li>
          </ul>

          <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl space-y-3">
            <h4 className="font-bold text-indigo-300 text-xs uppercase tracking-wider">Governing Relations</h4>
            <div className="flex flex-col gap-2 font-mono text-[13px]">
              <div className="flex justify-between items-center bg-black/20 p-2 rounded">
                <span>Modulus:</span>
                <span className="text-white">|z| = √(a² + b²)</span>
              </div>
              <div className="flex justify-between items-center bg-black/20 p-2 rounded">
                <span>Argument:</span>
                <span className="text-white">θ = tan⁻¹(b/a)</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Operations Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 rounded-2xl border-t-2 border-t-emerald-500/50 relative overflow-hidden"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Activity className="text-emerald-400" size={20} />
          Operations
        </h3>
        
        <div className="space-y-4 text-sm leading-relaxed text-lab-muted">
          <div className="space-y-3">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-emerald-300 font-bold mb-1">Addition / Subtraction</h4>
              <p className="text-xs italic">(a + ib) ± (c + id) = (a ± c) + i(b ± d)</p>
              <p className="mt-2 text-[11px] opacity-70">Geometrically equivalent to vector addition/subtraction in the plane.</p>
            </div>
            
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-emerald-300 font-bold mb-1">Multiplication</h4>
              <p className="text-xs italic">(a + ib)(c + id) = (ac - bd) + i(ad + bc)</p>
              <p className="mt-2 text-[11px] opacity-70">Results in a rotation and scaling in the Argand plane.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Procedure Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-6 rounded-2xl border-t-2 border-t-amber-500/50"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <HelpCircle className="text-amber-400" size={18} />
          Procedure
        </h3>
        <ol className="space-y-2 text-xs text-lab-muted list-decimal list-inside">
          <li>Enter <span className="text-white">a</span> and <span className="text-white">b</span> to define <span className="italic">z₁</span>.</li>
          <li>Observe the point and vector on the plane.</li>
          <li>Define a second number <span className="italic">z₂</span>.</li>
          <li>Select an operation (Add, Subtract, Multiply).</li>
          <li>Analyze the resulting vector and its magnitude.</li>
          <li>Save observations for comparison.</li>
        </ol>
      </motion.div>
    </div>
  );
}

function Activity({ className, size }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
