import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Activity, BookOpen, Grid3X3 } from 'lucide-react';

import VectorsLearningPanel from '../components/vectors-matrices/VectorsLearningPanel.jsx';
import VectorsControls from '../components/vectors-matrices/VectorsControls.jsx';
import VectorsSimulator from '../components/vectors-matrices/VectorsSimulator.jsx';
import VectorsObservationTable from '../components/vectors-matrices/VectorsObservationTable.jsx';

export default function VectorsMatricesPage() {
  const [activeMode, setActiveMode] = useState('vector'); // 'vector' or 'matrix'
  const [entityType, setEntityType] = useState('2d_vector'); 
  // vector types: '2d_vector', '3d_vector', 'row_vector', 'column_vector'
  // matrix types: 'square_matrix', 'rectangular_matrix', 'identity_matrix', 'zero_matrix', 'diagonal_matrix'
  
  const [operation, setOperation] = useState('none'); 
  // vector ops: 'add', 'sub', 'dot', 'cross', 'mag', 'norm'
  // matrix ops: 'add', 'sub', 'mul', 'transpose', 'det', 'inv', 'trace'

  // Entities are stored as 2D arrays (even vectors, e.g. [[1], [2]] for column, [[1, 2]] for row)
  const [entityA, setEntityA] = useState([[2], [3]]); 
  const [entityB, setEntityB] = useState([[1], [-1]]);
  
  const [observations, setObservations] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const resetSimulator = () => {
    setActiveMode('vector');
    setEntityType('2d_vector');
    setOperation('none');
    setEntityA([[2], [3]]);
    setEntityB([[1], [-1]]);
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
              <Grid3X3 className="text-emerald-400" size={28} />
              Vectors & Matrices
            </h1>
            <p className="text-sm text-lab-muted mt-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
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
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400/80 bg-emerald-400/10 px-4 py-2 rounded-full border border-emerald-400/20">
            <Activity size={14} /> AI Mathematics
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
              <VectorsLearningPanel activeMode={activeMode} entityType={entityType} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Middle/Right Column: Interactive Simulator & Table */}
        <motion.div layout className={`${isSidebarOpen ? 'xl:col-span-2' : 'xl:col-span-1'} flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar min-w-0`}>
          
          {/* Controls */}
          <VectorsControls
            activeMode={activeMode}
            setActiveMode={setActiveMode}
            entityType={entityType}
            setEntityType={setEntityType}
            entityA={entityA}
            setEntityA={setEntityA}
            entityB={entityB}
            setEntityB={setEntityB}
            operation={operation}
            setOperation={setOperation}
            resetSimulator={resetSimulator}
            addObservation={addObservation}
          />

          {/* Interactive Graph Area */}
          <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-emerald-400/50 relative shadow-xl flex flex-col min-h-[500px]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4 absolute top-6 left-6 z-10 bg-[#0f172a]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-emerald-400/20">
              Visualization Interface
            </h2>
            <VectorsSimulator 
              activeMode={activeMode}
              entityType={entityType}
              entityA={entityA}
              entityB={entityB}
              operation={operation}
            />
          </div>

          {/* Observation / Analysis Table */}
          <VectorsObservationTable
            observations={observations}
            setObservations={setObservations}
          />
          
        </motion.div>
      </div>
    </section>
  );
}
