import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, GitMerge, HelpCircle, Activity, BookOpen } from 'lucide-react';

import LearningPanel from '../components/limits-continuity/LearningPanel.jsx';
import SimulatorControls from '../components/limits-continuity/SimulatorControls.jsx';
import InteractiveSimulator from '../components/limits-continuity/InteractiveSimulator.jsx';
import ObservationTable from '../components/limits-continuity/ObservationTable.jsx';

export default function LimitsContinuityPage() {
  const [activeFunction, setActiveFunction] = useState('continuous'); // continuous, removable, jump, infinite
  const [params, setParams] = useState({
    a: 2.0, 
    xOffset: -1.5, 
  });
  
  const [mode, setMode] = useState('practice'); // practice | challenge
  const [showHint, setShowHint] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // For challenge mode
  const [challengeTarget, setChallengeTarget] = useState(null);

  const resetSimulator = () => {
    setParams({ a: 2.0, xOffset: -1.5 });
    if (mode === 'practice') {
      setChallengeTarget(null);
    }
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
              <GitMerge className="text-lab-accent2" size={28} />
              Limits & Continuity
            </h1>
            <p className="text-sm text-lab-muted mt-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lab-accent2 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lab-accent2"></span>
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
          <button
            onClick={() => setShowHint(!showHint)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${showHint ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-white/5 text-lab-muted border-white/10 hover:bg-white/10 hover:text-white'
              }`}
          >
            <HelpCircle size={16} />
            {showHint ? 'Hide Hints' : 'Show Hints'}
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lab-accent2/80 bg-lab-accent2/10 px-4 py-2 rounded-full border border-lab-accent2/20">
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
              <LearningPanel activeFunction={activeFunction} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Middle/Right Column: Interactive Simulator & Table */}
        <motion.div layout className={`${isSidebarOpen ? 'xl:col-span-2' : 'xl:col-span-1'} flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar min-w-0`}>
          
          {/* Controls */}
          <SimulatorControls
            activeFunction={activeFunction}
            setActiveFunction={setActiveFunction}
            params={params}
            setParams={setParams}
            mode={mode}
            setMode={setMode}
            resetSimulator={resetSimulator}
            challengeTarget={challengeTarget}
            setChallengeTarget={setChallengeTarget}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[400px]">
            {/* Interactive Graph Area */}
            <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent2/50 relative shadow-xl flex flex-col h-full">
              <h2 className="text-sm font-bold uppercase tracking-wider text-lab-accent2 mb-4 absolute top-6 left-6 z-10 bg-[#0f172a]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-lab-accent2/20">
                Graphing Interface
              </h2>
              <InteractiveSimulator 
                activeFunction={activeFunction}
                params={params}
              />
              {showHint && (
                <div className="absolute bottom-4 right-4 z-50 text-xs text-amber-400 bg-amber-900/40 px-4 py-2 rounded-lg border border-amber-500/30 max-w-[200px]">
                  Hint: Drag the 'Approaching Value' slider to see x physically approach a!
                </div>
              )}
            </div>

            {/* Observation / Analysis Table */}
            <ObservationTable
              activeFunction={activeFunction}
              params={params}
            />
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
