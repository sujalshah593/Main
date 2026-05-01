import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Dice5 } from 'lucide-react';

import ProbabilityLearningPanel from '../components/probability/ProbabilityLearningPanel.jsx';
import ProbabilityControls from '../components/probability/ProbabilityControls.jsx';
import ProbabilitySimulator from '../components/probability/ProbabilitySimulator.jsx';
import ProbabilityObservationTable from '../components/probability/ProbabilityObservationTable.jsx';

export default function BasicProbabilityPage() {
  const [config, setConfig] = useState({
    type: 'coin',
    condition: 'heads',
    trials: 10
  });

  const [isSimulating, setIsSimulating] = useState(false);
  const [outcomes, setOutcomes] = useState({});
  const [totalRun, setTotalRun] = useState(0);
  const [favorableCount, setFavorableCount] = useState(0);
  const [latestOutcome, setLatestOutcome] = useState(null);
  const [observations, setObservations] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Simulation references for cancellation
  const simRef = useRef(null);

  // Calculate Theoretical Probability
  const getTheoreticalProbability = () => {
    switch (config.type) {
      case 'coin':
        return 0.5; // heads or tails
      case 'dice':
        if (config.condition === 'even' || config.condition === 'odd' || config.condition === 'prime') return 3 / 6; // {2,4,6}, {1,3,5}, {2,3,5}
        if (config.condition === 'greater_4') return 2 / 6; // {5,6}
        if (config.condition === 'six') return 1 / 6; // {6}
        return 0;
      case 'cards':
        if (config.condition === 'red' || config.condition === 'black') return 26 / 52;
        if (config.condition === 'spade') return 13 / 52;
        if (config.condition === 'face') return 12 / 52; // J,Q,K * 4
        if (config.condition === 'ace') return 4 / 52;
        return 0;
      case 'spinner':
        return 1 / 4; // Assuming 4 equal sections: Red, Blue, Green, Yellow
      case 'marbles':
        // Assuming bag has 5 Red, 3 Blue, 2 Green (Total 10)
        if (config.condition === 'red') return 5 / 10;
        if (config.condition === 'blue') return 3 / 10;
        if (config.condition === 'green') return 2 / 10;
        return 0;
      case 'rng':
        // Assume RNG is 1 to 100
        if (config.condition === 'even' || config.condition === 'odd') return 0.5;
        if (config.condition === 'multiple_5') return 20 / 100;
        return 0;
      default:
        return 0;
    }
  };

  const theoreticalProbability = getTheoreticalProbability();

  // Helper to check if a specific outcome is favorable based on current condition
  const checkFavorable = (type, condition, outcomeValue) => {
    switch (type) {
      case 'coin':
        return outcomeValue === condition; // 'heads' or 'tails'
      case 'dice':
        const num = parseInt(outcomeValue);
        if (condition === 'even') return num % 2 === 0;
        if (condition === 'odd') return num % 2 !== 0;
        if (condition === 'prime') return [2, 3, 5].includes(num);
        if (condition === 'greater_4') return num > 4;
        if (condition === 'six') return num === 6;
        return false;
      case 'cards':
        // outcomeValue format: "Suit Rank" e.g., "♥ Ace", "♠ 10", "♦ King"
        const isRed = ['♥', '♦'].some(s => outcomeValue.includes(s));
        if (condition === 'red') return isRed;
        if (condition === 'black') return !isRed;
        if (condition === 'spade') return outcomeValue.includes('♠');
        if (condition === 'face') return ['Jack', 'Queen', 'King'].some(r => outcomeValue.includes(r));
        if (condition === 'ace') return outcomeValue.includes('Ace');
        return false;
      case 'spinner':
      case 'marbles':
        return outcomeValue === condition; // 'red', 'blue', etc.
      case 'rng':
        const rNum = parseInt(outcomeValue);
        if (condition === 'even') return rNum % 2 === 0;
        if (condition === 'odd') return rNum % 2 !== 0;
        if (condition === 'multiple_5') return rNum % 5 === 0;
        return false;
      default:
        return false;
    }
  };

  const generateOutcome = (type) => {
    switch (type) {
      case 'coin':
        return Math.random() < 0.5 ? 'heads' : 'tails';
      case 'dice':
        return (Math.floor(Math.random() * 6) + 1).toString();
      case 'cards':
        const suits = ['♥', '♦', '♣', '♠'];
        const ranks = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
        const suit = suits[Math.floor(Math.random() * suits.length)];
        const rank = ranks[Math.floor(Math.random() * ranks.length)];
        return `${suit} ${rank}`;
      case 'spinner':
        const sections = ['red', 'blue', 'green', 'yellow'];
        return sections[Math.floor(Math.random() * sections.length)];
      case 'marbles':
        // 5 Red, 3 Blue, 2 Green
        const rand = Math.random();
        if (rand < 0.5) return 'red';
        if (rand < 0.8) return 'blue';
        return 'green';
      case 'rng':
        return (Math.floor(Math.random() * 100) + 1).toString();
      default:
        return '';
    }
  };

  const runSimulation = () => {
    setIsSimulating(true);
    let currentOutcomes = { ...outcomes };
    let currentRun = totalRun;
    let currentFavorable = favorableCount;
    let runsDone = 0;

    const targetRuns = config.trials;

    // Fast Mode if trials > 50
    if (targetRuns > 50) {
      for (let i = 0; i < targetRuns; i++) {
        const val = generateOutcome(config.type);
        const key = config.type === 'cards' || config.type === 'rng' || config.type === 'dice' ? 
          (checkFavorable(config.type, config.condition, val) ? 'Favorable' : 'Unfavorable') : val;
        
        currentOutcomes[key] = (currentOutcomes[key] || 0) + 1;
        if (checkFavorable(config.type, config.condition, val)) currentFavorable++;
        currentRun++;
      }
      setOutcomes(currentOutcomes);
      setTotalRun(currentRun);
      setFavorableCount(currentFavorable);
      setLatestOutcome('Fast Simulation Completed');
      setIsSimulating(false);
      return;
    }

    // Animated mode for small trials
    const interval = setInterval(() => {
      if (runsDone >= targetRuns) {
        clearInterval(interval);
        setIsSimulating(false);
        return;
      }

      const val = generateOutcome(config.type);
      
      // For charting we might group categories if there are too many unique values
      const chartKey = config.type === 'cards' || config.type === 'rng' || config.type === 'dice' ? 
        (checkFavorable(config.type, config.condition, val) ? 'Favorable' : 'Unfavorable') : val;

      setOutcomes(prev => ({ ...prev, [chartKey]: (prev[chartKey] || 0) + 1 }));
      setLatestOutcome(val);
      
      setTotalRun(prev => prev + 1);
      if (checkFavorable(config.type, config.condition, val)) {
        setFavorableCount(prev => prev + 1);
      }

      runsDone++;
    }, 200); // 200ms per trial

    simRef.current = interval;
  };

  const resetSimulation = () => {
    if (simRef.current) clearInterval(simRef.current);
    setIsSimulating(false);
    setOutcomes({});
    setTotalRun(0);
    setFavorableCount(0);
    setLatestOutcome(null);
  };

  // Reset when type changes
  useEffect(() => {
    resetSimulation();
  }, [config.type, config.condition]);

  const addObservation = () => {
    if (totalRun === 0) return;
    setObservations([
      ...observations,
      {
        id: Date.now(),
        type: config.type,
        condition: config.condition,
        trials: totalRun,
        favorableCount,
        theoreticalProbability,
        experimentalProbability: favorableCount / totalRun
      }
    ]);
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (simRef.current) clearInterval(simRef.current);
    };
  }, []);

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
              <Dice5 className="text-amber-500" size={28} />
              Basic Probability Lab
            </h1>
            <p className="text-sm text-lab-muted mt-1 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Probability & Statistics
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
              <ProbabilityLearningPanel />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Middle/Right Column: Interactive Simulator & Table */}
        <motion.div layout className={`${isSidebarOpen ? 'xl:col-span-2' : 'xl:col-span-1'} flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar min-w-0`}>
          
          <ProbabilityControls
            config={config}
            setConfig={setConfig}
            isRunning={isSimulating}
            runSimulation={runSimulation}
            resetSimulation={resetSimulation}
            addObservation={addObservation}
            theoreticalProbability={theoreticalProbability}
          />

          <ProbabilitySimulator
            config={config}
            outcomes={outcomes}
            totalRun={totalRun}
            latestOutcome={latestOutcome}
            isSimulating={isSimulating}
            theoreticalProbability={theoreticalProbability}
            favorableCount={favorableCount}
          />

          <ProbabilityObservationTable 
            observations={observations} 
            setObservations={setObservations} 
          />
          
        </motion.div>
      </div>
    </section>
  );
}
