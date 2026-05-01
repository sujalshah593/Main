import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Users, Car, Circle, LayoutGrid, CreditCard, RotateCw } from 'lucide-react';

export default function SimulationVisualizer({ config, latestOutcome, totalRun, isRunning, isPaused }) {

  const renderExperiment = () => {
    if (!latestOutcome && totalRun === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
          <div className="p-6 rounded-full bg-white/5 border border-white/5 animate-pulse">
            <LayoutGrid size={48} />
          </div>
          <p className="font-semibold uppercase tracking-widest text-xs">Ready to Simulate</p>
        </div>
      );
    }

    switch (config.type) {
      case 'coin':
        return (
          <motion.div
            key={totalRun}
            initial={{ rotateY: 180, scale: 0.5, opacity: 0 }}
            animate={{ rotateY: 0, scale: 1, opacity: 1 }}
            className="w-40 h-40 rounded-full border-8 border-emerald-500/50 bg-emerald-500/10 flex items-center justify-center text-5xl font-bold text-emerald-400 shadow-[0_0_50px_rgba(16,185,129,0.3)]"
          >
            {latestOutcome === 'Heads' ? 'H' : 'T'}
          </motion.div>
        );
      case 'dice':
        return (
          <motion.div
            key={totalRun}
            initial={{ rotate: -45, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center text-5xl font-bold text-gray-900 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            {latestOutcome}
          </motion.div>
        );
      case 'traffic':
        return (
          <div className="flex flex-col gap-4 p-6 bg-gray-900 rounded-3xl border-4 border-gray-800 shadow-2xl">
            <div className={`w-16 h-16 rounded-full border-4 border-black/40 ${latestOutcome === 'Red' ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.8)]' : 'bg-red-900/50'}`} />
            <div className={`w-16 h-16 rounded-full border-4 border-black/40 ${latestOutcome === 'Yellow' ? 'bg-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.8)]' : 'bg-yellow-900/50'}`} />
            <div className={`w-16 h-16 rounded-full border-4 border-black/40 ${latestOutcome === 'Green' ? 'bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.8)]' : 'bg-emerald-900/50'}`} />
          </div>
        );
      case 'queue':
        return (
          <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex items-center gap-4 h-24 relative w-full justify-center">
               <div className="absolute left-0 right-0 h-2 bg-white/5 rounded-full" />
               <AnimatePresence>
                 {Array.from({length: parseInt(latestOutcome) || 0}).map((_, i) => (
                   <motion.div
                     key={`person-${i}-${totalRun}`}
                     initial={{ x: -100, opacity: 0 }}
                     animate={{ x: 0, opacity: 1 }}
                     exit={{ x: 100, opacity: 0 }}
                     className="relative z-10 p-3 bg-sky-500 rounded-full border-2 border-sky-300 text-white shadow-lg"
                   >
                     <Users size={24} />
                   </motion.div>
                 ))}
               </AnimatePresence>
            </div>
            <div className="text-center">
              <div className="text-xs uppercase text-gray-500 font-bold mb-1">Queue Length</div>
              <div className="text-4xl font-mono font-bold text-white">{latestOutcome}</div>
            </div>
          </div>
        );
      case 'spinner':
        return (
          <div className="relative">
            <motion.div
              key={totalRun}
              animate={{ rotate: 360 * 3 + (Math.random() * 360) }}
              transition={{ duration: config.speed / 1000, ease: "easeOut" }}
              className="w-48 h-48 rounded-full border-8 border-white/10 relative overflow-hidden"
              style={{ background: 'conic-gradient(#ef4444 0% 25%, #3b82f6 25% 50%, #10b981 50% 75%, #f59e0b 75% 100%)' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full shadow-lg z-20" />
              </div>
            </motion.div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-white z-30" />
          </div>
        );
      case 'cards':
        return (
          <motion.div
            key={totalRun}
            initial={{ y: 100, opacity: 0, rotate: -10 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            className="w-32 h-48 bg-white rounded-xl border-2 border-gray-200 flex flex-col items-center justify-center gap-2 shadow-2xl overflow-hidden"
          >
             <div className="text-4xl font-bold text-gray-900">{latestOutcome?.split(' ')[1]}</div>
             <div className={`text-6xl ${['♥', '♦'].includes(latestOutcome?.split(' ')[0]) ? 'text-red-600' : 'text-gray-900'}`}>
                {latestOutcome?.split(' ')[0]}
             </div>
          </motion.div>
        );
      case 'marbles':
        return (
          <div className="flex flex-col items-center gap-6">
            <div className="w-48 h-48 rounded-3xl bg-white/5 border-4 border-white/10 p-4 flex flex-wrap gap-2 justify-center items-center content-center relative overflow-hidden shadow-inner">
               <AnimatePresence>
                 {Array.from({length: 12}).map((_, i) => (
                   <div 
                    key={i} 
                    className={`w-8 h-8 rounded-full border-2 border-white/20 opacity-30 ${['bg-red-500', 'bg-blue-500', 'bg-emerald-500', 'bg-amber-500'][i % 4]}`} 
                   />
                 ))}
               </AnimatePresence>
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>
            <motion.div
              key={totalRun}
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className={`w-16 h-16 rounded-full border-4 border-white/40 shadow-2xl`}
              style={{ backgroundColor: latestOutcome }}
            />
          </div>
        );
      default:
        return <div className="text-6xl font-mono text-white font-bold">{latestOutcome}</div>;
    }
  };

  return (
    <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center min-h-[450px] relative shadow-2xl overflow-hidden bg-black/40">
      {/* Dynamic Background Glow */}
      <motion.div 
        animate={{ 
          opacity: isRunning && !isPaused ? [0.05, 0.15, 0.05] : 0.05,
          scale: isRunning && !isPaused ? [1, 1.2, 1] : 1
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/10 pointer-events-none" 
      />
      
      <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <Activity size={20} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Live Experiment</h3>
          <p className="text-sm font-mono font-bold text-emerald-500 tracking-tight">#{totalRun} / {config.trials}</p>
        </div>
      </div>

      {latestOutcome && (
        <div className="absolute top-6 right-6 z-20">
          <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 backdrop-blur-md">
            <span className="text-[10px] font-bold text-gray-500 uppercase mr-2">Latest:</span>
            <span className="text-[10px] font-mono font-bold text-white uppercase">{latestOutcome}</span>
          </div>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center w-full relative z-10">
        <AnimatePresence mode="wait">
          {renderExperiment()}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-full max-w-[200px]">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-[10px] font-bold text-white/30 uppercase tracking-widest px-1">
            <span>Progress</span>
            <span>{Math.round((totalRun / config.trials) * 100)}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(totalRun / config.trials) * 100}%` }}
              className="h-full bg-emerald-500/50" 
            />
          </div>
        </div>
      </div>

      {isRunning && (
        <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col items-center gap-1 opacity-20">
          <div className={`w-1 h-1 rounded-full bg-emerald-500 ${!isPaused && 'animate-ping'}`} />
          <div className={`w-1 h-1 rounded-full bg-emerald-500 ${!isPaused && 'animate-ping delay-75'}`} />
          <div className={`w-1 h-1 rounded-full bg-emerald-500 ${!isPaused && 'animate-ping delay-150'}`} />
        </div>
      )}
    </div>
  );
}
