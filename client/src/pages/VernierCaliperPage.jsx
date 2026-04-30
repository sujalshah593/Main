import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Beaker, HelpCircle, Activity, BookOpen } from 'lucide-react';

import VernierCaliper from '../components/vernier/VernierCaliper.jsx';
import CaliperControls from '../components/vernier/CaliperControls.jsx';
import LearningPanel from '../components/vernier/LearningPanel.jsx';
import ObservationTable from '../components/vernier/ObservationTable.jsx';

const INITIAL_OBJECTS = [
  { id: 'coin', name: 'Coin', type: 'outer', value: 24.5 },
  { id: 'rod', name: 'Rod', type: 'outer', value: 15.2 },
  { id: 'bolt', name: 'Bolt', type: 'outer', value: 8.4 },
  { id: 'ring_outer', name: 'Ring (Outer)', type: 'outer', value: 30.6 },
  { id: 'ring_inner', name: 'Ring (Inner)', type: 'inner', value: 26.2 },
  { id: 'cube', name: 'Cube', type: 'outer', value: 45.0 },
  { id: 'pipe_depth', name: 'Pipe (Depth)', type: 'depth', value: 85.5 },
];

export default function VernierCaliperPage() {
  const [selectedObjectId, setSelectedObjectId] = useState(INITIAL_OBJECTS[0].id);
  const [jawPosition, setJawPosition] = useState(0);
  const [mode, setMode] = useState('practice');
  const [zeroError, setZeroError] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const selectedObject = INITIAL_OBJECTS.find(obj => obj.id === selectedObjectId);

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
              <Beaker className="text-lab-accent" size={28} />
              Vernier Caliper Practical
            </h1>
            <p className="text-sm text-lab-muted mt-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lab-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lab-accent"></span>
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
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lab-accent3/80 bg-lab-accent3/10 px-4 py-2 rounded-full border border-lab-accent3/20">
            <Activity size={14} /> Mechanics
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
              <LearningPanel />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Middle/Right Column: Interactive Simulator & Table */}
        <motion.div layout className={`${isSidebarOpen ? 'xl:col-span-2' : 'xl:col-span-1'} flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar min-w-0`}>
          {/* Controls */}
          <CaliperControls
            objects={INITIAL_OBJECTS}
            selectedObjectId={selectedObjectId}
            setSelectedObjectId={setSelectedObjectId}
            mode={mode}
            setMode={setMode}
            zeroError={zeroError}
            setZeroError={setZeroError}
            setJawPosition={setJawPosition}
          />

          {/* Interactive Caliper Model */}
          <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent/50 relative shadow-xl overflow-hidden flex flex-col min-h-[400px]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-lab-accent mb-4 absolute top-6 left-6 z-10 bg-[#0f172a]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-lab-accent/20">
              Virtual Instrument
            </h2>
            <div className="flex-1 w-full h-full relative mt-8 flex items-center justify-center">
              <VernierCaliper
                jawPosition={jawPosition}
                setJawPosition={setJawPosition}
                selectedObject={selectedObject}
                zeroError={zeroError}
                showHint={showHint}
              />
            </div>

            {/* Live Reading Feedback for Practice Mode */}
            <AnimatePresence>
              {mode === 'practice' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-6 p-4 rounded-xl bg-lab-accent/10 border border-lab-accent/20 flex flex-wrap gap-6 justify-center items-center"
                >
                  <div className="text-center">
                    <p className="text-xs font-bold text-lab-muted uppercase">Main Scale</p>
                    <p className="text-xl font-mono text-white mt-1">{Math.floor(jawPosition)} mm</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-lab-muted uppercase">Vernier Coincidence</p>
                    <p className="text-xl font-mono text-white mt-1">
                      {Math.round((jawPosition % 1) * 10)} div
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-lab-accent uppercase">Current Reading</p>
                    <p className="text-xl font-mono text-lab-accent mt-1">
                      {(Math.floor(jawPosition) + Math.round((jawPosition % 1) * 10) * 0.1).toFixed(2)} mm
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Observation Table */}
          <ObservationTable
            jawPosition={jawPosition}
            selectedObject={selectedObject}
            zeroError={zeroError}
            mode={mode}
          />
        </motion.div>
      </div>
    </section>
  );
}
