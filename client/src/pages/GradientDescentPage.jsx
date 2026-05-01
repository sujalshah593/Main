import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingDown, HelpCircle, BookOpen, Activity } from 'lucide-react';

import LearningPanel from '../components/gradient-descent/LearningPanel.jsx';
import SimulatorControls from '../components/gradient-descent/SimulatorControls.jsx';
import VisualizationPanel from '../components/gradient-descent/VisualizationPanel.jsx';
import AnalysisPanel from '../components/gradient-descent/AnalysisPanel.jsx';

const functionsDict = {
  quadratic_1d: {
    id: 'quadratic_1d',
    name: '1D Quadratic (Convex)',
    formula: 'f(x) = x²',
    type: '1D',
    computeValue: (x) => x * x,
    computeGrad: (x) => 2 * x,
    domain: [-5, 5],
    minPoint: 0
  },
  polynomial_1d: {
    id: 'polynomial_1d',
    name: '1D Polynomial (Non-Convex)',
    formula: 'f(x) = x⁴ - 4x² + x',
    type: '1D',
    computeValue: (x) => Math.pow(x, 4) - 4 * Math.pow(x, 2) + x,
    computeGrad: (x) => 4 * Math.pow(x, 3) - 8 * x + 1,
    domain: [-3, 3],
    minPoint: 1.3 // approx global min
  },
  paraboloid_2d: {
    id: 'paraboloid_2d',
    name: '2D Paraboloid',
    formula: 'f(x, y) = x² + y²',
    type: '2D',
    computeValue: (x, y) => x * x + y * y,
    computeGrad: (x, y) => ({ dx: 2 * x, dy: 2 * y }),
    domain: { x: [-5, 5], y: [-5, 5] },
    zRange: [0, 50]
  }
};

export default function GradientDescentPage() {
  const [activeFunctionKey, setActiveFunctionKey] = useState('quadratic_1d');
  const activeFn = functionsDict[activeFunctionKey];

  // Hyperparameters
  const [learningRate, setLearningRate] = useState(0.1);
  const [maxIterations, setMaxIterations] = useState(50);
  
  // Current Run State
  const [currentPos, setCurrentPos] = useState(activeFn.type === '1D' ? { x: 4 } : { x: 4, y: 4 });
  const [path, setPath] = useState([]); // Array of positions + values
  const [isPlaying, setIsPlaying] = useState(false);
  
  // History
  const [historyRuns, setHistoryRuns] = useState([]);
  
  // UI State
  const [mode, setMode] = useState('explore'); // explore | guided
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showHint, setShowHint] = useState(true);

  // Playback ref
  const timerRef = useRef(null);

  // Handle function switch
  useEffect(() => {
    resetRun();
    setHistoryRuns([]);
    if (activeFn.type === '1D') {
      setCurrentPos({ x: 4 });
    } else {
      setCurrentPos({ x: 4, y: 4 });
    }
  }, [activeFunctionKey]);

  const recordInitialState = () => {
    if (path.length === 0) {
      let val, grad;
      if (activeFn.type === '1D') {
        val = activeFn.computeValue(currentPos.x);
        grad = activeFn.computeGrad(currentPos.x);
        setPath([{ iter: 0, x: currentPos.x, val, grad }]);
      } else {
        val = activeFn.computeValue(currentPos.x, currentPos.y);
        grad = activeFn.computeGrad(currentPos.x, currentPos.y);
        setPath([{ iter: 0, x: currentPos.x, y: currentPos.y, val, grad }]);
      }
    }
  };

  const stepForward = () => {
    recordInitialState();
    
    setPath((prevPath) => {
      const currentIter = prevPath.length > 0 ? prevPath.length : 1;
      if (currentIter > maxIterations) {
        setIsPlaying(false);
        return prevPath;
      }

      const lastPoint = prevPath.length > 0 ? prevPath[prevPath.length - 1] : null;
      let nextPos = {};
      let val, grad;

      if (activeFn.type === '1D') {
        const x = lastPoint ? lastPoint.x : currentPos.x;
        const currentGrad = activeFn.computeGrad(x);
        const nextX = x - learningRate * currentGrad;
        
        val = activeFn.computeValue(nextX);
        grad = activeFn.computeGrad(nextX);
        nextPos = { x: nextX };
        
        setCurrentPos(nextPos);
        return [...prevPath, { iter: currentIter, x: nextX, val, grad }];
      } else {
        const x = lastPoint ? lastPoint.x : currentPos.x;
        const y = lastPoint ? lastPoint.y : currentPos.y;
        const currentGrad = activeFn.computeGrad(x, y);
        
        const nextX = x - learningRate * currentGrad.dx;
        const nextY = y - learningRate * currentGrad.dy;
        
        val = activeFn.computeValue(nextX, nextY);
        grad = activeFn.computeGrad(nextX, nextY);
        nextPos = { x: nextX, y: nextY };
        
        setCurrentPos(nextPos);
        return [...prevPath, { iter: currentIter, x: nextX, y: nextY, val, grad }];
      }
    });
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        stepForward();
      }, 300); // 300ms per step
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, learningRate, maxIterations, activeFunctionKey]);

  const resetRun = () => {
    setIsPlaying(false);
    setPath([]);
    // Restore to slider value or some default? Let's leave pos as is, just clear path
  };

  const saveToHistory = () => {
    if (path.length > 0) {
      setHistoryRuns(prev => [...prev, {
        id: Date.now(),
        path: [...path],
        learningRate,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      }]);
    }
  };

  const clearHistory = () => {
    setHistoryRuns([]);
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
              <TrendingDown className="text-emerald-400" size={28} />
              Gradient Descent Basics
            </h1>
            <p className="text-sm text-lab-muted mt-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Optimization Visualizer
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
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-500/80 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
            <Activity size={14} /> Optimization
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
              <LearningPanel mode={mode} setMode={setMode} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Middle/Right Column: Interactive Simulator & Table */}
        <motion.div layout className={`${isSidebarOpen ? 'xl:col-span-2' : 'xl:col-span-1'} flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar min-w-0`}>
          
          <SimulatorControls
            functionsDict={functionsDict}
            activeFunctionKey={activeFunctionKey}
            setActiveFunctionKey={setActiveFunctionKey}
            currentPos={currentPos}
            setCurrentPos={setCurrentPos}
            learningRate={learningRate}
            setLearningRate={setLearningRate}
            maxIterations={maxIterations}
            setMaxIterations={setMaxIterations}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            stepForward={stepForward}
            resetRun={resetRun}
            saveToHistory={saveToHistory}
            clearHistory={clearHistory}
            pathLength={path.length}
            historyRunsCount={historyRuns.length}
          />

          <div className="grid grid-cols-1 gap-6 flex-1 w-full">
            <VisualizationPanel
              activeFn={activeFn}
              currentPos={currentPos}
              path={path}
              historyRuns={historyRuns}
            />
            
            <AnalysisPanel
              activeFn={activeFn}
              path={path}
              mode={mode}
            />
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
