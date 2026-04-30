import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CircleGauge, HelpCircle, Activity, BookOpen } from 'lucide-react';

import ScrewGauge from '../components/screw-gauge/ScrewGauge.jsx';
import ScrewGaugeControls from '../components/screw-gauge/ScrewGaugeControls.jsx';
import ScrewGaugeLearningPanel from '../components/screw-gauge/ScrewGaugeLearningPanel.jsx';
import ScrewGaugeObservationTable from '../components/screw-gauge/ScrewGaugeObservationTable.jsx';

const INITIAL_OBJECTS = [
  { id: 'copper_wire', name: 'Copper Wire', value: 2.14 },
  { id: 'steel_wire', name: 'Steel Wire', value: 1.52 },
  { id: 'glass_plate', name: 'Glass Plate', value: 5.60 },
  { id: 'cardboard', name: 'Cardboard', value: 1.25 },
  { id: 'lead_shot', name: 'Lead Shot', value: 3.45 },
];

export default function ScrewGaugePage() {
  const [selectedObjectId, setSelectedObjectId] = useState(INITIAL_OBJECTS[0].id);
  const [thimblePosition, setThimblePosition] = useState(0); // linear mm
  const [mode, setMode] = useState('practice');
  const [zeroError, setZeroError] = useState(0); // in mm
  const [showHint, setShowHint] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const selectedObject = INITIAL_OBJECTS.find(obj => obj.id === selectedObjectId);

  // Math for real-time readings
  // Pitch = 1mm, 100 divisions
  const mainScaleReading = Math.floor(thimblePosition);
  const circularScaleReading = Math.round((thimblePosition % 1) * 100);

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
              <CircleGauge className="text-lab-accent2" size={28} />
              Screw Gauge Practical
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
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
              isSidebarOpen ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' : 'bg-white/5 text-lab-muted border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BookOpen size={16} />
            {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
          </button>
          <button
            onClick={() => setShowHint(!showHint)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
              showHint ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-white/5 text-lab-muted border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <HelpCircle size={16} />
            {showHint ? 'Hide Hints' : 'Show Hints'}
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-lab-accent2/80 bg-lab-accent2/10 px-4 py-2 rounded-full border border-lab-accent2/20">
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
              <ScrewGaugeLearningPanel />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Middle/Right Column: Interactive Simulator & Table */}
        <motion.div layout className={`${isSidebarOpen ? 'xl:col-span-2' : 'xl:col-span-1'} flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar min-w-0`}>
          {/* Controls */}
          <ScrewGaugeControls 
            objects={INITIAL_OBJECTS}
            selectedObjectId={selectedObjectId}
            setSelectedObjectId={setSelectedObjectId}
            mode={mode}
            setMode={setMode}
            zeroError={zeroError}
            setZeroError={setZeroError}
            setThimblePosition={setThimblePosition}
          />

          {/* Interactive Model */}
          <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent2/50 relative shadow-xl overflow-hidden flex flex-col min-h-[400px]">
            <h2 className="text-sm font-bold uppercase tracking-wider text-lab-accent2 mb-4 absolute top-6 left-6 z-10 bg-[#0f172a]/80 px-3 py-1 rounded-full backdrop-blur-sm border border-lab-accent2/20">
              Virtual Instrument
            </h2>
            <div className="flex-1 w-full h-full relative mt-8 flex items-center justify-center">
               <ScrewGauge 
                 thimblePosition={thimblePosition} 
                 setThimblePosition={setThimblePosition}
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
                  className="mt-6 p-4 rounded-xl bg-lab-accent2/10 border border-lab-accent2/20 flex flex-wrap gap-6 justify-center items-center"
                >
                  <div className="text-center">
                    <p className="text-xs font-bold text-lab-muted uppercase">Pitch Scale</p>
                    <p className="text-xl font-mono text-white mt-1">{mainScaleReading} mm</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-lab-muted uppercase">Circular Scale</p>
                    <p className="text-xl font-mono text-white mt-1">{circularScaleReading} div</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-lab-accent2 uppercase">Current Reading</p>
                    <p className="text-xl font-mono text-lab-accent2 mt-1">
                      {(mainScaleReading + circularScaleReading * 0.01).toFixed(2)} mm
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Observation Table */}
          <ScrewGaugeObservationTable 
             thimblePosition={thimblePosition}
             selectedObject={selectedObject}
             zeroError={zeroError}
             mode={mode}
          />
        </motion.div>
      </div>
    </section>
  );
}
