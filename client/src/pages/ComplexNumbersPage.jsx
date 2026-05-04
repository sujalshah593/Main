import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Activity, BookOpen, Sigma, GraduationCap } from 'lucide-react';

import ComplexLearningPanel from '../components/complex-numbers/ComplexLearningPanel.jsx';
import ComplexControls from '../components/complex-numbers/ComplexControls.jsx';
import ComplexSimulator from '../components/complex-numbers/ComplexSimulator.jsx';
import ComplexObservationTable from '../components/complex-numbers/ComplexObservationTable.jsx';
import ComplexQuiz from '../components/complex-numbers/ComplexQuiz.jsx';

export default function ComplexNumbersPage() {
  const [z1, setZ1] = useState({ real: 3, imag: 4 });
  const [z2, setZ2] = useState({ real: -2, imag: 2 });
  const [operation, setOperation] = useState('none'); // 'none', 'add', 'subtract', 'multiply'
  
  const [observations, setObservations] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);

  const resetSimulator = () => {
    setZ1({ real: 3, imag: 4 });
    setZ2({ real: -2, imag: 2 });
    setOperation('none');
    setObservations([]);
  };

  const addObservation = (obs) => {
    setObservations((prev) => [{ id: Date.now(), ...obs }, ...prev]);
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
              <Sigma className="text-indigo-500" size={28} />
              Complex Numbers & Argand Plane
            </h1>
            <p className="text-sm text-lab-muted mt-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Algebraic & Geometric Interpretation
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowQuiz(!showQuiz)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-[12px] sm:text-sm font-semibold transition-all border ${
              showQuiz ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-white/5 text-lab-muted border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <GraduationCap size={16} className="shrink-0" />
            <span className="truncate">{showQuiz ? 'Back to Lab' : 'Take Quiz'}</span>
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-[12px] sm:text-sm font-semibold transition-all border ${
              isSidebarOpen ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-white/5 text-lab-muted border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BookOpen size={16} className="shrink-0" />
            <span className="truncate">{isSidebarOpen ? 'Hide Theory' : 'Show Theory'}</span>
          </button>
          <div className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-indigo-400/80 bg-indigo-400/10 px-4 py-2 rounded-full border border-indigo-400/20">
            <Activity size={14} /> AI Mathematics
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 ${isSidebarOpen ? 'xl:grid-cols-3' : 'xl:grid-cols-1'} gap-6 flex-1 h-full min-h-0 transition-all duration-300`}>
        {/* Left Column: Learning & Theory / Quiz */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.div
              key={showQuiz ? 'quiz' : 'theory'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="xl:col-span-1 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar"
            >
              {showQuiz ? <ComplexQuiz /> : <ComplexLearningPanel />}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Middle/Right Column: Interactive Simulator & Table */}
        <motion.div layout className={`${isSidebarOpen ? 'xl:col-span-2' : 'xl:col-span-1'} flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar min-w-0`}>
          
          {/* Controls */}
          <ComplexControls
            z1={z1}
            setZ1={setZ1}
            z2={z2}
            setZ2={setZ2}
            operation={operation}
            setOperation={setOperation}
            resetSimulator={resetSimulator}
            addObservation={addObservation}
          />

          {/* Interactive Graph Area */}
          <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-indigo-500/50 relative shadow-xl flex flex-col min-h-[500px]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-400 mb-4 absolute top-6 left-6 z-10 bg-[#0f172a]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-indigo-400/20">
              Argand Diagram & Vector Visualization
            </h2>
            <ComplexSimulator 
              z1={z1}
              z2={z2}
              operation={operation}
            />
          </div>

          {/* Observation / Analysis Table */}
          <ComplexObservationTable
            observations={observations}
            setObservations={setObservations}
          />
          
        </motion.div>
      </div>
    </section>
  );
}
