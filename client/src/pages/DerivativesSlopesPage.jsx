import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Activity, BookOpen, LineChart } from 'lucide-react';

import DerivativesLearningPanel from '../components/derivatives-slopes/DerivativesLearningPanel.jsx';
import DerivativesControls from '../components/derivatives-slopes/DerivativesControls.jsx';
import DerivativesSimulator from '../components/derivatives-slopes/DerivativesSimulator.jsx';
import DerivativesObservationTable from '../components/derivatives-slopes/DerivativesObservationTable.jsx';

export default function DerivativesSlopesPage() {
  const [funcType, setFuncType] = useState('quadratic');
  const [params, setParams] = useState({ a: 1, b: 0, c: -4, d: 0 });
  const [xVal, setXVal] = useState(2);
  const [dx, setDx] = useState(2); // For secant line
  
  const [showTangent, setShowTangent] = useState(true);
  const [showSecant, setShowSecant] = useState(false);
  const [showDerivative, setShowDerivative] = useState(false);
  const [showSecondDerivative, setShowSecondDerivative] = useState(false);

  const [observations, setObservations] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const resetSimulator = () => {
    setFuncType('quadratic');
    setParams({ a: 1, b: 0, c: -4, d: 0 });
    setXVal(2);
    setDx(2);
    setShowTangent(true);
    setShowSecant(false);
    setShowDerivative(false);
    setShowSecondDerivative(false);
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
              <LineChart className="text-amber-500" size={28} />
              Derivatives & Slopes Lab
            </h1>
            <p className="text-sm text-lab-muted mt-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Calculus & Optimization
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
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400/80 bg-amber-400/10 px-4 py-2 rounded-full border border-amber-400/20">
            <Activity size={14} /> Rate of Change
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
              <DerivativesLearningPanel />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Middle/Right Column: Interactive Simulator & Table */}
        <motion.div layout className={`${isSidebarOpen ? 'xl:col-span-2' : 'xl:col-span-1'} flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar min-w-0`}>
          
          <DerivativesControls
            funcType={funcType} setFuncType={setFuncType}
            params={params} setParams={setParams}
            xVal={xVal} setXVal={setXVal}
            dx={dx} setDx={setDx}
            showTangent={showTangent} setShowTangent={setShowTangent}
            showSecant={showSecant} setShowSecant={setShowSecant}
            showDerivative={showDerivative} setShowDerivative={setShowDerivative}
            showSecondDerivative={showSecondDerivative} setShowSecondDerivative={setShowSecondDerivative}
            resetSimulator={resetSimulator}
            addObservation={addObservation}
          />

          <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-amber-500/50 relative shadow-xl flex flex-col min-h-[500px]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 absolute top-6 left-6 z-10 bg-[#0f172a]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-amber-400/20">
              Graph Workspace
            </h2>
            <DerivativesSimulator 
              funcType={funcType} params={params}
              xVal={xVal} dx={dx}
              showTangent={showTangent} showSecant={showSecant}
              showDerivative={showDerivative} showSecondDerivative={showSecondDerivative}
            />
          </div>

          <DerivativesObservationTable observations={observations} setObservations={setObservations} />
          
        </motion.div>
      </div>
    </section>
  );
}
