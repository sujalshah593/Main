import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, MountainSnow, HelpCircle, BookOpen, Activity } from 'lucide-react';

import LearningPanel from '../components/partial-derivatives/LearningPanel.jsx';
import LabControls from '../components/partial-derivatives/LabControls.jsx';
import VisualizationPanel from '../components/partial-derivatives/VisualizationPanel.jsx';
import AnalysisPanel from '../components/partial-derivatives/AnalysisPanel.jsx';

// Predefined mathematical functions and their analytical derivatives
const functionsDict = {
  paraboloid: {
    name: 'Standard Paraboloid',
    formula: 'f(x, y) = x² + y²',
    computeValue: (x, y) => x * x + y * y,
    computeDx: (x, y) => 2 * x,
    computeDy: (x, y) => 2 * y,
    criticalPoints: [{ x: 0, y: 0, type: 'Local Minimum' }],
    domain: { x: [-5, 5], y: [-5, 5] },
    zRange: [0, 50]
  },
  inverted_paraboloid: {
    name: 'Inverted Paraboloid',
    formula: 'f(x, y) = -(x² + y²)',
    computeValue: (x, y) => -(x * x + y * y),
    computeDx: (x, y) => -2 * x,
    computeDy: (x, y) => -2 * y,
    criticalPoints: [{ x: 0, y: 0, type: 'Local Maximum' }],
    domain: { x: [-5, 5], y: [-5, 5] },
    zRange: [-50, 0]
  },
  saddle: {
    name: 'Saddle Point (Hyperbolic Paraboloid)',
    formula: 'f(x, y) = x² - y²',
    computeValue: (x, y) => x * x - y * y,
    computeDx: (x, y) => 2 * x,
    computeDy: (x, y) => -2 * y,
    criticalPoints: [{ x: 0, y: 0, type: 'Saddle Point' }],
    domain: { x: [-5, 5], y: [-5, 5] },
    zRange: [-25, 25]
  },
  complex: {
    name: 'Complex Nonlinear (Ackley-like)',
    formula: 'f(x, y) = sin(x) * cos(y) + 0.1*(x² + y²)',
    computeValue: (x, y) => Math.sin(x) * Math.cos(y) + 0.1 * (x * x + y * y),
    computeDx: (x, y) => Math.cos(x) * Math.cos(y) + 0.2 * x,
    computeDy: (x, y) => -Math.sin(x) * Math.sin(y) + 0.2 * y,
    criticalPoints: [{ x: 0, y: 0, type: 'Complex' }], // Simplified
    domain: { x: [-5, 5], y: [-5, 5] },
    zRange: [-1, 6]
  }
};

export default function PartialDerivativesPage() {
  const [activeFunctionKey, setActiveFunctionKey] = useState('paraboloid');
  const activeFn = functionsDict[activeFunctionKey];

  // Current point logic
  const [point, setPoint] = useState({ x: 2, y: 2 });
  
  // Optimization logic
  const [mode, setMode] = useState('explore'); // explore | optimize
  const [optimizationType, setOptimizationType] = useState('descent'); // descent | ascent
  const [learningRate, setLearningRate] = useState(0.1);
  const [path, setPath] = useState([]); // Array of {x, y, z}
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationStepCount, setOptimizationStepCount] = useState(0);

  // UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showHint, setShowHint] = useState(true);

  // Perform a single optimization step
  const performOptimizationStep = () => {
    const { x, y } = path.length > 0 ? path[path.length - 1] : point;
    const dx = activeFn.computeDx(x, y);
    const dy = activeFn.computeDy(x, y);
    
    const sign = optimizationType === 'descent' ? -1 : 1;
    const nextX = x + sign * learningRate * dx;
    const nextY = y + sign * learningRate * dy;
    const nextZ = activeFn.computeValue(nextX, nextY);

    const newPath = [...(path.length > 0 ? path : [{...point, z: activeFn.computeValue(point.x, point.y)}]), { x: nextX, y: nextY, z: nextZ }];
    setPath(newPath);
    setPoint({ x: nextX, y: nextY }); // Update current point as well
    setOptimizationStepCount(prev => prev + 1);
  };

  const resetOptimization = () => {
    setPath([]);
    setIsOptimizing(false);
    setOptimizationStepCount(0);
    // Point stays where it is, or we could reset to a default
  };

  return (
    <section className="flex flex-col min-h-[calc(100vh-6rem)] relative z-10 w-full overflow-hidden p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link to="/semester/sem-1/practical" className="group flex items-center justify-center p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-lab-muted hover:text-white transition-all border border-white/5 hover:border-white/20">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <MountainSnow className="text-lab-accent2" size={28} />
              Partial Derivatives & Optimization
            </h1>
            <p className="text-sm text-lab-muted mt-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lab-accent2 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lab-accent2"></span>
              </span>
              3D Surfaces & Gradient Descent
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${isSidebarOpen ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' : 'bg-white/5 text-lab-muted border-white/10 hover:bg-white/10 hover:text-white'
              }`}
          >
            <BookOpen size={16} />
            {isSidebarOpen ? 'Hide Theory' : 'Show Theory'}
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lab-accent2/80 bg-lab-accent2/10 px-4 py-2 rounded-full border border-lab-accent2/20">
            <Activity size={14} /> Multivariate Calculus
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${isSidebarOpen ? 'xl:grid-cols-3' : 'xl:grid-cols-1'} gap-6 flex-1 h-full min-h-0 transition-all duration-300`}>
        {/* Left Column: Learning & Theory */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20, display: 'none' }}
              animate={{ opacity: 1, x: 0, display: 'flex' }}
              exit={{ opacity: 0, x: -20, display: 'none' }}
              transition={{ duration: 0.2 }}
              className="xl:col-span-1 flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar"
            >
              <LearningPanel mode={mode} optimizationType={optimizationType} activeFn={activeFn} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Middle/Right Column: Interactive Simulator & Table */}
        <motion.div layout className={`${isSidebarOpen ? 'xl:col-span-2' : 'xl:col-span-1'} flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar min-w-0`}>
          
          <LabControls
            functionsDict={functionsDict}
            activeFunctionKey={activeFunctionKey}
            setActiveFunctionKey={setActiveFunctionKey}
            point={point}
            setPoint={setPoint}
            mode={mode}
            setMode={setMode}
            optimizationType={optimizationType}
            setOptimizationType={setOptimizationType}
            learningRate={learningRate}
            setLearningRate={setLearningRate}
            performOptimizationStep={performOptimizationStep}
            resetOptimization={resetOptimization}
            isOptimizing={isOptimizing}
            setIsOptimizing={setIsOptimizing}
            path={path}
          />

          <VisualizationPanel
            activeFn={activeFn}
            point={point}
            path={path}
            mode={mode}
          />

          <AnalysisPanel
            activeFn={activeFn}
            point={point}
            mode={mode}
            optimizationStepCount={optimizationStepCount}
            path={path}
          />
          
        </motion.div>
      </div>
    </section>
  );
}
