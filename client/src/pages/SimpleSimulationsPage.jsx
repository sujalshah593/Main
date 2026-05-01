import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Activity, Zap } from 'lucide-react';

import SimulationLearningPanel from '../components/simulations/SimulationLearningPanel.jsx';
import SimulationControls from '../components/simulations/SimulationControls.jsx';
import SimulationVisualizer from '../components/simulations/SimulationVisualizer.jsx';
import SimulationAnalytics from '../components/simulations/SimulationAnalytics.jsx';
import SimulationObservationTable from '../components/simulations/SimulationObservationTable.jsx';

export default function SimpleSimulationsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [config, setConfig] = useState({
    type: 'coin',
    trials: 50,
    speed: 500,
    isManual: false
  });

  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [totalRun, setTotalRun] = useState(0);
  const [latestOutcome, setLatestOutcome] = useState(null);
  const [results, setResults] = useState({});
  const [trendData, setTrendData] = useState([]);
  const [observations, setObservations] = useState([]);

  const timerRef = useRef(null);

  const generateOutcome = useCallback((type) => {
    switch (type) {
      case 'coin':
        return Math.random() > 0.5 ? 'Heads' : 'Tails';
      case 'dice':
        return (Math.floor(Math.random() * 6) + 1).toString();
      case 'cards':
        const suits = ['♥', '♦', '♣', '♠'];
        const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        return `${suits[Math.floor(Math.random() * 4)]} ${ranks[Math.floor(Math.random() * 13)]}`;
      case 'spinner':
        return ['Red', 'Blue', 'Green', 'Yellow'][Math.floor(Math.random() * 4)];
      case 'marbles':
        return ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 4)];
      case 'traffic':
        const trafficStates = ['Red', 'Green', 'Yellow'];
        // Simple logic: Red -> Green -> Yellow
        if (!latestOutcome || latestOutcome === 'Yellow') return 'Red';
        if (latestOutcome === 'Red') return 'Green';
        return 'Yellow';
      case 'queue':
        // Simple queue simulation: random arrival vs fixed service
        const currentLen = parseInt(latestOutcome) || 0;
        const arrival = Math.random() > 0.6 ? 1 : 0;
        const departure = Math.random() > 0.7 && currentLen > 0 ? 1 : 0;
        return (currentLen + arrival - departure).toString();
      default:
        return 'Result';
    }
  }, [latestOutcome]);

  const runStep = useCallback(() => {
    setTotalRun(prev => {
      if (prev >= config.trials) {
        setIsRunning(false);
        if (timerRef.current) clearInterval(timerRef.current);
        return prev;
      }

      const outcome = generateOutcome(config.type);
      setLatestOutcome(outcome);
      
      setResults(prevRes => {
        const newRes = { ...prevRes };
        newRes[outcome] = (newRes[outcome] || 0) + 1;
        return newRes;
      });

      setTrendData(prevTrend => {
        const lastSnapshot = prevTrend[prevTrend.length - 1] || {};
        const newSnapshot = { ...lastSnapshot, trial: prev + 1 };
        newSnapshot[outcome] = (lastSnapshot[outcome] || 0) + 1;
        // Keep only last 50 for performance
        const nextTrend = [...prevTrend, newSnapshot];
        return nextTrend.slice(-50);
      });

      return prev + 1;
    });
  }, [config.trials, config.type, generateOutcome]);

  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(runStep, config.speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isPaused, config.speed, runStep]);

  const runSimulation = () => {
    if (totalRun >= config.trials) resetSimulation();
    setIsRunning(true);
    setIsPaused(false);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTotalRun(0);
    setLatestOutcome(null);
    setResults({});
    setTrendData([]);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const addObservation = () => {
    const sorted = Object.entries(results).sort((a, b) => b[1] - a[1]);
    const mostCommon = sorted[0] ? { name: sorted[0][0], prob: ((sorted[0][1] / totalRun) * 100).toFixed(1) } : { name: 'N/A', prob: 0 };
    const leastCommon = sorted[sorted.length - 1] ? { name: sorted[sorted.length - 1][0], prob: ((sorted[sorted.length - 1][1] / totalRun) * 100).toFixed(1) } : { name: 'N/A', prob: 0 };

    const newObs = {
      type: config.type,
      trials: totalRun,
      results: { ...results },
      mostCommon,
      leastCommon
    };
    setObservations([newObs, ...observations]);
  };

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [challenge, setChallenge] = useState(null);

  const startChallenge = () => {
    const challenges = [
      { type: 'coin', target: 'Heads', goal: 50, tolerance: 2, trials: 200, desc: "Get Heads probability within 2% of 50% using 200+ trials." },
      { type: 'dice', target: '6', goal: 16.6, tolerance: 3, trials: 300, desc: "Get '6' probability within 3% of theoretical 16.6% using 300+ trials." },
      { type: 'spinner', target: 'Red', goal: 25, tolerance: 2, trials: 400, desc: "Get 'Red' probability within 2% of 25% using 400+ trials." }
    ];
    const c = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(c);
    setConfig({ ...config, type: c.type, trials: c.trials });
    resetSimulation();
  };

  const downloadReport = () => {
    const report = {
      experiment: config.type,
      totalTrials: totalRun,
      outcomes: results,
      observations: observations,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `simulation_report_${config.type}.json`;
    a.click();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <section className={`flex flex-col min-h-[calc(100vh-6rem)] relative z-10 w-full overflow-hidden p-4 lg:p-8 ${isFullscreen ? 'bg-[#020617] fixed inset-0 z-[100] h-screen overflow-y-auto' : ''}`}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-6">
          {!isFullscreen && (
            <Link to="/semester/sem-1/practical" className="group flex items-center justify-center p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-lab-muted hover:text-white transition-all border border-white/5 hover:border-white/20 shadow-lg">
              <ArrowLeft size={20} />
            </Link>
          )}
          <div>
            <h1 className="font-display text-2xl lg:text-4xl font-extrabold text-white tracking-tight flex items-center gap-4">
              <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Activity className="text-emerald-500" size={28} />
              </div>
              Simulations Lab
            </h1>
            <div className="text-sm text-lab-muted mt-1.5 flex items-center gap-2 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Modeling & Probability
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={startChallenge}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all shadow-lg"
          >
            <Zap size={18} />
            Random Challenge
          </button>
          
          <button
            onClick={downloadReport}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 hover:bg-sky-500/20 transition-all shadow-lg"
          >
            Download Report
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl bg-white/5 text-gray-400 hover:text-white border border-white/10 hover:bg-white/10 transition-all"
            title="Toggle Fullscreen"
          >
            <Activity size={20} />
          </button>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-sm font-bold transition-all border ${
              isSidebarOpen ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-white/5 text-lab-muted border-white/10 hover:bg-white/10 hover:text-white shadow-lg'
            }`}
          >
            <BookOpen size={18} />
            {isSidebarOpen ? 'Close Lab Guide' : 'Open Lab Guide'}
          </button>
        </div>
      </div>

      {challenge && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-xl bg-amber-500 text-white">
              <Zap size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Active Challenge</h4>
              <p className="text-xs text-gray-400">{challenge.desc}</p>
            </div>
          </div>
          <button onClick={() => setChallenge(null)} className="text-xs font-bold text-gray-500 hover:text-white">Dismiss</button>
        </motion.div>
      )}

      <div className={`grid grid-cols-1 ${isSidebarOpen ? 'xl:grid-cols-4' : 'xl:grid-cols-1'} gap-8 flex-1 h-full min-h-0 transition-all duration-300`}>
        {/* Sidebar: Theory & Quiz */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="xl:col-span-1 flex flex-col gap-6 h-[calc(100vh-16rem)]"
            >
              <SimulationLearningPanel />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Workspace */}
        <motion.div 
          layout
          className={`${isSidebarOpen ? 'xl:col-span-3' : 'xl:col-span-1'} flex flex-col gap-8 overflow-y-auto pr-2 custom-scrollbar h-[calc(100vh-16rem)] min-w-0 pb-12`}
        >
          
          {/* Top Row: Visualizer and Control Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SimulationVisualizer 
                config={config} 
                latestOutcome={latestOutcome} 
                totalRun={totalRun} 
                isRunning={isRunning}
                isPaused={isPaused}
              />
            </div>
            <div className="lg:col-span-1">
              <SimulationControls
                config={config} setConfig={setConfig}
                isRunning={isRunning} setIsRunning={setIsRunning}
                isPaused={isPaused} setIsPaused={setIsPaused}
                runSimulation={runSimulation}
                resetSimulation={resetSimulation}
                addObservation={addObservation}
                latestOutcome={latestOutcome}
              />
            </div>
          </div>

          {/* Analytics Section (Spacious) */}
          <div className="w-full">
            <SimulationAnalytics 
              results={results} 
              totalRun={totalRun} 
              trendData={trendData}
              config={config}
            />
          </div>

          {/* Bottom Section: Observations and Conclusions */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <SimulationObservationTable observations={observations} setObservations={setObservations} />
            </div>
            <div className="xl:col-span-1 flex flex-col gap-6">
              <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-emerald-500/5 relative overflow-hidden h-full shadow-lg">
                <div className="absolute -top-4 -right-4 p-8 opacity-5">
                  <Zap size={120} className="text-emerald-500" />
                </div>
                <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider text-emerald-400">Simulation Insights</h3>
                <div className="space-y-5 text-sm text-gray-300 leading-relaxed">
                  <div className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <p>Random events stabilize around theoretical values as you increase trials.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <p>Higher trial counts ({config.trials}) lead to statistically significant results.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <p>The "Convergence" graph shows how chaos turns into predictable patterns.</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-4">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                    <span>Target Trials</span>
                    <span>{config.trials}</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(totalRun / config.trials) * 100}%` }}
                      className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}
