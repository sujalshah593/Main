import { BookOpen, AlertCircle, Info, Calculator, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LearningPanel({ activeFunction }) {
  const content = {
    linear: {
      title: 'Linear Functions',
      formula: 'y = mx + c',
      description: 'A linear function forms a straight line on a graph. It has a constant rate of change.',
      variables: [
        { symbol: 'm', name: 'Slope', desc: 'Determines the steepness and direction of the line.' },
        { symbol: 'c', name: 'Y-Intercept', desc: 'The point where the line crosses the y-axis (when x = 0).' }
      ],
      aiContext: 'In AI, linear functions are often used in simple regression models to predict a continuous output, or as the basis for linear combinations before applying an activation function in neural networks.'
    },
    quadratic: {
      title: 'Quadratic (Polynomial) Functions',
      formula: 'y = ax² + bx + k',
      description: 'A quadratic function forms a parabola. The rate of change is not constant.',
      variables: [
        { symbol: 'a', name: 'Quadratic Coefficient', desc: 'Determines the width and direction of the parabola (opens up if a > 0, down if a < 0).' },
        { symbol: 'b', name: 'Linear Coefficient', desc: 'Shifts the vertex horizontally and vertically.' },
        { symbol: 'k', name: 'Constant Term', desc: 'The y-intercept.' }
      ],
      aiContext: 'Polynomials are used in polynomial regression for non-linear relationships. In cost functions, the Mean Squared Error (MSE) is a quadratic function, creating a parabolic error surface we want to minimize.'
    },
    exponential: {
      title: 'Exponential Functions',
      formula: 'y = a · e^(bx) + k',
      description: 'Exponential functions describe rapid growth or decay. The variable x is in the exponent.',
      variables: [
        { symbol: 'a', name: 'Initial Value', desc: 'The value when x=0 (if k=0).' },
        { symbol: 'b', name: 'Growth Rate', desc: 'Determines how fast the function grows (b > 0) or decays (b < 0).' },
        { symbol: 'k', name: 'Vertical Shift', desc: 'Moves the horizontal asymptote up or down.' }
      ],
      aiContext: 'Exponential functions appear in the Softmax activation function (used for probabilities in multi-class classification) and in exponential learning rate decay schedules.'
    },
    logarithmic: {
      title: 'Logarithmic Functions',
      formula: 'y = a · ln(bx) + k',
      description: 'The inverse of the exponential function. It grows very slowly as x increases. Note: bx must be > 0.',
      variables: [
        { symbol: 'a', name: 'Scale Factor', desc: 'Stretches or compresses the graph vertically.' },
        { symbol: 'b', name: 'Horizontal Scale', desc: 'Stretches or compresses horizontally. (x must be > 0 if b > 0).' },
        { symbol: 'k', name: 'Vertical Shift', desc: 'Moves the graph up or down.' }
      ],
      aiContext: 'Logarithms are heavily used in AI for the Cross-Entropy Loss function, which heavily penalizes confident but incorrect predictions. It also helps stabilize numerical computations when dealing with very small probabilities.'
    },
    sigmoid: {
      title: 'Sigmoid Activation Function',
      formula: 'y = 1 / (1 + e^(-ax))',
      description: 'An S-shaped curve that squashes any real number into the range (0, 1).',
      variables: [
        { symbol: 'a', name: 'Steepness', desc: 'Controls how sharply the function transitions from 0 to 1.' }
      ],
      aiContext: 'Sigmoid is a classic neural network activation function. It is used in logistic regression to output a probability (between 0 and 1).'
    },
    relu: {
      title: 'ReLU (Rectified Linear Unit)',
      formula: 'y = max(0, ax)',
      description: 'A piecewise linear function that outputs the input directly if it is positive, otherwise, it outputs zero.',
      variables: [
        { symbol: 'a', name: 'Slope (for x > 0)', desc: 'The slope of the active part of the function.' }
      ],
      aiContext: 'ReLU is the most popular activation function in deep learning. It solves the vanishing gradient problem and allows models to learn faster and perform better.'
    }
  };

  const current = content[activeFunction] || content.linear;

  return (
    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent2/50 flex flex-col gap-6 relative shadow-lg">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="p-3 bg-lab-accent2/10 rounded-xl text-lab-accent2">
          <BookOpen size={24} />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-white tracking-tight">{current.title}</h2>
          <p className="text-sm text-lab-muted">Mathematical Foundations</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 text-sm text-slate-300">
        <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
            <Calculator size={64} />
          </div>
          <h3 className="font-bold text-white flex items-center gap-2">
            <Info size={16} className="text-lab-accent2" /> Formula
          </h3>
          <div className="font-mono text-xl text-lab-accent2 bg-black/40 p-3 rounded-lg text-center font-bold shadow-inner">
            {current.formula}
          </div>
          <p className="mt-2">{current.description}</p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-white border-b border-white/10 pb-2">Parameters</h3>
          <ul className="flex flex-col gap-3">
            {current.variables.map((v, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-3 bg-white/5 p-3 rounded-lg border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-lab-accent2/20 text-lab-accent2 flex items-center justify-center font-mono font-bold shrink-0 border border-lab-accent2/30">
                  {v.symbol}
                </div>
                <div>
                  <span className="font-bold text-white block text-xs uppercase tracking-wider mb-0.5">{v.name}</span>
                  <span className="text-slate-400 text-xs leading-relaxed">{v.desc}</span>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-2 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-4 rounded-xl border border-indigo-500/20">
          <h3 className="font-bold text-indigo-300 flex items-center gap-2 mb-2 text-xs uppercase tracking-wider">
            <Activity size={16} /> Connection to AI
          </h3>
          <p className="text-sm text-indigo-100/80 leading-relaxed">
            {current.aiContext}
          </p>
        </div>
      </div>
    </div>
  );
}
