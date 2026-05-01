import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import { Activity, PieChart as PieChartIcon, BarChart2 } from 'lucide-react';

const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];

export default function ProbabilitySimulator({
  config,
  outcomes,
  totalRun,
  latestOutcome,
  isSimulating,
  theoreticalProbability,
  favorableCount
}) {
  
  const chartData = useMemo(() => {
    return Object.entries(outcomes).map(([key, value]) => ({
      name: key,
      value: value
    }));
  }, [outcomes]);

  const pieData = useMemo(() => {
    const favorable = favorableCount;
    const unfavorable = totalRun - favorableCount;
    if (totalRun === 0) return [{ name: 'No Data', value: 1 }];
    return [
      { name: 'Favorable', value: favorable },
      { name: 'Unfavorable', value: unfavorable }
    ];
  }, [favorableCount, totalRun]);

  const experimentalProb = totalRun > 0 ? favorableCount / totalRun : 0;

  const renderVisual = () => {
    if (!latestOutcome && totalRun === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500 font-semibold">
          Ready to run simulation
        </div>
      );
    }

    // A simple visual representation based on type
    let visualContent = null;
    switch (config.type) {
      case 'coin':
        visualContent = (
          <motion.div
            key={latestOutcome + totalRun}
            initial={{ rotateY: 180, scale: 0.8, opacity: 0 }}
            animate={{ rotateY: 0, scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className={`w-32 h-32 rounded-full border-4 border-amber-500 flex items-center justify-center text-4xl font-bold bg-amber-500/20 text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)]`}
          >
            {latestOutcome === 'heads' ? 'H' : 'T'}
          </motion.div>
        );
        break;
      case 'dice':
        visualContent = (
          <motion.div
            key={latestOutcome + totalRun}
            initial={{ rotateX: 180, scale: 0.8, opacity: 0 }}
            animate={{ rotateX: 0, scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-32 h-32 rounded-3xl border-4 border-white text-white flex items-center justify-center text-6xl font-bold bg-gradient-to-br from-gray-700 to-gray-900 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            {latestOutcome}
          </motion.div>
        );
        break;
      case 'cards':
        visualContent = (
          <motion.div
            key={latestOutcome + totalRun}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`w-28 h-40 rounded-xl border-2 flex items-center justify-center text-5xl bg-white ${
              ['♥', '♦'].some(s => latestOutcome?.includes(s)) ? 'text-red-500 border-red-500' : 'text-black border-gray-800'
            } shadow-xl relative`}
          >
            <div className="absolute top-2 left-2 text-xl">{latestOutcome?.split(' ')[0]}</div>
            <div>{latestOutcome?.split(' ')[1]}</div>
            <div className="absolute bottom-2 right-2 text-xl rotate-180">{latestOutcome?.split(' ')[0]}</div>
          </motion.div>
        );
        break;
      case 'spinner':
        visualContent = (
          <motion.div
            key={latestOutcome + totalRun}
            initial={{ rotate: -180, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            className={`w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center text-xl font-bold text-white shadow-[0_0_40px_rgba(0,0,0,0.5)]`}
            style={{ backgroundColor: latestOutcome }}
          >
            {latestOutcome?.toUpperCase()}
          </motion.div>
        );
        break;
      case 'marbles':
        visualContent = (
          <motion.div
            key={latestOutcome + totalRun}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-24 h-24 rounded-full flex items-center justify-center shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),_0_0_20px_rgba(255,255,255,0.2)]"
            style={{ backgroundColor: latestOutcome }}
          />
        );
        break;
      case 'rng':
        visualContent = (
          <motion.div
            key={latestOutcome + totalRun}
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-7xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
          >
            {latestOutcome}
          </motion.div>
        );
        break;
      default:
        visualContent = <div className="text-4xl font-bold text-white">{latestOutcome}</div>;
    }

    return (
      <div className="flex flex-col items-center justify-center h-full">
        {visualContent}
        {totalRun > 0 && (
          <div className="mt-6 text-center animate-fade-in">
            <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">Latest Outcome</p>
            <p className="text-2xl font-bold text-white capitalize">{latestOutcome}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 mt-6 w-full">
      
      {/* Top Row: Visualizer and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visualization Area (Larger) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 relative flex flex-col min-h-[350px] shadow-lg overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/5 blur-[100px] pointer-events-none" />
          
          <div className="absolute top-6 left-6 flex items-center gap-2 z-10 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/5">
            <Activity size={16} className="text-amber-400" />
            <span className="text-xs font-bold text-white tracking-wider uppercase">Live Simulation Feed</span>
          </div>
          
          <div className="flex-1 mt-12 flex items-center justify-center relative z-10">
            <AnimatePresence mode="wait">
              {renderVisual()}
            </AnimatePresence>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 relative z-10">
            <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10 flex flex-col items-center justify-center text-center shadow-inner">
              <span className="text-xs text-gray-400 uppercase font-semibold mb-1 tracking-wider">Total Trials</span>
              <span className="text-4xl font-mono font-bold text-white drop-shadow-md">{totalRun}</span>
            </div>
            <div className="bg-amber-500/10 backdrop-blur-md p-4 rounded-xl border border-amber-500/30 flex flex-col items-center justify-center text-center shadow-[inset_0_0_20px_rgba(245,158,11,0.1)]">
              <span className="text-xs text-amber-500 uppercase font-semibold mb-1 tracking-wider">Favorable Outcomes</span>
              <span className="text-4xl font-mono font-bold text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">{favorableCount}</span>
            </div>
          </div>
        </div>

        {/* Probability Pie & Comparison (Side Panel) */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 blur-[50px] pointer-events-none" />
           
           <div className="flex items-center gap-2 mb-6">
              <PieChartIcon size={18} className="text-fuchsia-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Probability Analysis
              </h3>
            </div>
            
            <div className="flex-1 flex flex-col justify-center gap-6">
              
              <div className="h-[180px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                      isAnimationActive={!isSimulating || totalRun < 50}
                    >
                      <Cell fill="#f59e0b" /> {/* Favorable - Amber */}
                      <Cell fill="#1e293b" /> {/* Unfavorable - Slate */}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text for pie chart */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] text-gray-500 uppercase font-bold">Total</span>
                  <span className="text-lg font-mono font-bold text-white">{totalRun}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-auto">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center flex flex-col justify-center">
                  <div className="text-[10px] uppercase text-gray-400 font-bold mb-2">Theoretical P(E)</div>
                  <div className="text-2xl font-mono text-white">{(theoreticalProbability * 100).toFixed(1)}%</div>
                </div>
                <div className="bg-amber-500/10 p-4 rounded-xl border border-amber-500/30 text-center flex flex-col justify-center shadow-[inset_0_0_15px_rgba(245,158,11,0.05)]">
                  <div className="text-[10px] uppercase text-amber-500/80 font-bold mb-2">Experimental</div>
                  <div className="text-2xl font-mono text-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.3)]">{(experimentalProb * 100).toFixed(1)}%</div>
                </div>
              </div>
              
              {totalRun > 0 && (
                <div className="text-center text-xs text-gray-400 bg-black/20 py-2 rounded-lg border border-white/5 flex items-center justify-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${Math.abs(theoreticalProbability - experimentalProb) < 0.05 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]'}`} />
                  Difference: <span className="font-mono text-white">{Math.abs((theoreticalProbability - experimentalProb) * 100).toFixed(2)}%</span>
                </div>
              )}

            </div>
        </div>
      </div>

      {/* Bottom Row: Full Width Bar Chart */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col shadow-lg relative overflow-hidden min-h-[300px]">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-emerald-500/5 blur-[50px] pointer-events-none" />
        
        <div className="flex items-center justify-between mb-6 relative z-10">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
            <BarChart2 size={18} className="text-emerald-400" />
            Outcome Frequencies
          </h3>
          <div className="text-xs font-medium text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
            Updated in real-time
          </div>
        </div>
        
        <div className="flex-1 w-full bg-black/40 rounded-xl p-6 border border-white/5 shadow-inner relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888', fontSize: 12, fontWeight: 500 }} axisLine={{ stroke: '#444' }} tickLine={false} dy={10} />
              <YAxis stroke="#888" tick={{ fill: '#888', fontSize: 12, fontWeight: 500 }} allowDecimals={false} axisLine={false} tickLine={false} dx={-10} />
              <RechartsTooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={100} isAnimationActive={!isSimulating || totalRun < 50}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}
