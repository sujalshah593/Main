import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Activity, BookOpen, Sigma } from 'lucide-react';

import MatrixEqLearningPanel from '../components/matrix-equations/MatrixEqLearningPanel.jsx';
import MatrixEqControls from '../components/matrix-equations/MatrixEqControls.jsx';
import MatrixEqSimulator from '../components/matrix-equations/MatrixEqSimulator.jsx';
import MatrixEqObservationTable from '../components/matrix-equations/MatrixEqObservationTable.jsx';

export default function MatrixEquationsPage() {
  const [activeMode, setActiveMode] = useState('matrix_ops'); // 'matrix_ops' or 'equation_solver'
  const [matrixType, setMatrixType] = useState('square_matrix'); 
  
  const [operation, setOperation] = useState('none'); 
  const [solveMethod, setSolveMethod] = useState('cramer');
  const [systemSize, setSystemSize] = useState(2); // 2 to 5

  const [entityA, setEntityA] = useState([[1, 2], [3, 4]]); 
  const [entityB, setEntityB] = useState([[5, 6], [7, 8]]); // Used for both operations and equations constants (as Nx1)
  const [scalarVal, setScalarVal] = useState(2);
  
  const [observations, setObservations] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const resetSimulator = () => {
    setActiveMode('matrix_ops');
    setMatrixType('square_matrix');
    setOperation('none');
    setSolveMethod('cramer');
    setSystemSize(2);
    setEntityA([[1, 2], [3, 4]]);
    setEntityB([[5, 6], [7, 8]]);
    setScalarVal(2);
  };

  const addObservation = (obs) => {
    setObservations((prev) => [...prev, { id: Date.now(), ...obs }]);
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
              <Sigma className="text-pink-500" size={28} />
              Matrix & Equations Lab
            </h1>
            <p className="text-sm text-lab-muted mt-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              Virtual Interactive Laboratory
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
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-400/80 bg-pink-400/10 px-4 py-2 rounded-full border border-pink-400/20">
            <Activity size={14} /> Advanced Mathematics
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
              <MatrixEqLearningPanel activeMode={activeMode} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Middle/Right Column: Interactive Simulator & Table */}
        <motion.div layout className={`${isSidebarOpen ? 'xl:col-span-2' : 'xl:col-span-1'} flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar min-w-0`}>
          
          {/* Controls */}
          <MatrixEqControls
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            matrixType={matrixType}
            setMatrixType={setMatrixType}
            operation={operation}
            setOperation={setOperation}
            solveMethod={solveMethod}
            setSolveMethod={setSolveMethod}
            systemSize={systemSize}
            setSystemSize={setSystemSize}
            entityA={entityA}
            setEntityA={setEntityA}
            entityB={entityB}
            setEntityB={setEntityB}
            scalarVal={scalarVal}
            setScalarVal={setScalarVal}
            resetSimulator={resetSimulator}
            addObservation={addObservation}
          />

          {/* Interactive Graph Area */}
          <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-pink-500/50 relative shadow-xl flex flex-col min-h-[500px]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-pink-400 mb-4 absolute top-6 left-6 z-10 bg-[#0f172a]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-pink-400/20">
              Workspace & Visualization
            </h2>
            <MatrixEqSimulator 
              activeMode={activeMode}
              operation={operation}
              solveMethod={solveMethod}
              systemSize={systemSize}
              entityA={entityA}
              entityB={entityB}
              scalarVal={scalarVal}
            />
          </div>

          {/* Observation / Analysis Table */}
          <MatrixEqObservationTable
            observations={observations}
            setObservations={setObservations}
          />
          
        </motion.div>
      </div>
    </section>
  );
}
