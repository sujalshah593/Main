import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Binary } from 'lucide-react';

import StatisticsLearningPanel from '../components/statistics/StatisticsLearningPanel.jsx';
import StatisticsControls from '../components/statistics/StatisticsControls.jsx';
import StatisticsVisualizer from '../components/statistics/StatisticsVisualizer.jsx';
import StatisticsCalculator from '../components/statistics/StatisticsCalculator.jsx';
import StatisticsObservationTable from '../components/statistics/StatisticsObservationTable.jsx';

export default function BasicStatisticsPage() {
  const [datasetA, setDatasetA] = useState([10, 20, 30, 40, 50]);
  const [datasetB, setDatasetB] = useState([5, 15, 25, 35, 45]);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [observations, setObservations] = useState([]);

  const calculateStats = (data) => {
    if (!data || data.length === 0) return { sum: 0, mean: 0, variance: 0, stdDev: 0, range: 0, sumSquaredDiff: 0 };
    
    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / data.length;
    const sumSquaredDiff = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0);
    const variance = sumSquaredDiff / data.length; // Population Variance
    const stdDev = Math.sqrt(variance);
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min;

    return { sum, mean, variance, stdDev, range, sumSquaredDiff, min, max };
  };

  const statsA = useMemo(() => calculateStats(datasetA), [datasetA]);
  const statsB = useMemo(() => calculateStats(datasetB), [datasetB]);

  const addObservation = () => {
    const newObs = {
      id: Date.now(),
      label: `Set ${observations.length + 1}`,
      count: datasetA.length,
      mean: statsA.mean,
      variance: statsA.variance,
      stdDev: statsA.stdDev,
    };
    setObservations([newObs, ...observations]);
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
              <Binary className="text-sky-500" size={28} />
              Basic Statistics Lab
            </h1>
            <p className="text-sm text-lab-muted mt-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              Mean, Variance & Spread
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
            {isSidebarOpen ? 'Hide Theory' : 'Show Theory'}
          </button>
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
              <StatisticsLearningPanel />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Middle/Right Column: Interactive Simulator & Table */}
        <motion.div layout className={`${isSidebarOpen ? 'xl:col-span-2' : 'xl:col-span-1'} flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar min-w-0`}>
          
          <StatisticsControls
            datasetA={datasetA} setDatasetA={setDatasetA}
            datasetB={datasetB} setDatasetB={setDatasetB}
            isCompareMode={isCompareMode} setIsCompareMode={setIsCompareMode}
            addObservation={addObservation}
          />

          <StatisticsVisualizer 
            datasetA={datasetA} 
            datasetB={datasetB} 
            isCompareMode={isCompareMode}
            statsA={statsA}
            statsB={statsB}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StatisticsCalculator dataset={datasetA} stats={statsA} />
            <div className="flex flex-col gap-6">
               <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-sky-500/5">
                  <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider text-sky-400">Quick Result Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                      <span className="text-gray-400">Sample Count:</span>
                      <span className="text-white font-mono">{datasetA.length}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                      <span className="text-gray-400">Average (Mean):</span>
                      <span className="text-sky-400 font-mono font-bold">{statsA.mean.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Data Spread (SD):</span>
                      <span className="text-emerald-400 font-mono font-bold">{statsA.stdDev.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/5">
                    <p className="text-xs text-gray-400 leading-relaxed italic">
                      "Conclusion: The values in your dataset deviate from the mean by an average of {statsA.stdDev.toFixed(2)} units."
                    </p>
                  </div>
               </div>
               <StatisticsObservationTable observations={observations} setObservations={setObservations} />
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
