import { motion } from 'framer-motion';
import { Sigma, Divide, Square, Binary } from 'lucide-react';

export default function StatisticsCalculator({ dataset, stats }) {
  const n = dataset.length;
  
  return (
    <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-lg flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Binary size={20} className="text-amber-400" />
        <h2 className="text-lg font-bold text-white">Step-by-Step Calculation</h2>
      </div>

      <div className="space-y-8">
        
        {/* Step 1: Mean */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs border border-sky-500/30">1</div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Calculate the Mean (Average)</h3>
          </div>
          
          <div className="bg-black/30 rounded-xl p-5 border border-white/5 space-y-4 overflow-x-auto">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Sigma size={16} className="text-sky-400" />
              <span>Sum of all values = {dataset.join(' + ')} = <span className="text-white font-bold">{stats.sum}</span></span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Divide size={16} className="text-sky-400" />
              <span>Divide by count (n = {n}) = {stats.sum} / {n} = <span className="text-sky-400 font-bold font-mono text-base">{stats.mean.toFixed(2)}</span></span>
            </div>
          </div>
        </section>

        {/* Step 2: Variance */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">2</div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Calculate the Variance</h3>
          </div>
          
          <div className="bg-black/30 rounded-xl p-5 border border-white/5 space-y-4 overflow-x-auto">
            <p className="text-xs text-gray-400 italic mb-2">Formula: Average of (Value - Mean)²</p>
            <div className="space-y-2">
              {dataset.slice(0, 5).map((val, i) => (
                <div key={i} className="flex items-center gap-3 text-[11px] text-gray-400 font-mono">
                  <div className="w-4 h-4 bg-white/5 flex items-center justify-center rounded">{(val - stats.mean).toFixed(1)}²</div>
                  <span>({val} - {stats.mean.toFixed(1)})² = {Math.pow(val - stats.mean, 2).toFixed(2)}</span>
                </div>
              ))}
              {n > 5 && <p className="text-[10px] text-gray-500 ml-4 italic">...and so on for remaining {n-5} values</p>}
            </div>
            
            <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-gray-300 text-sm mt-4">
              <Sigma size={16} className="text-amber-400" />
              <span>Sum of squared differences = <span className="text-white font-bold">{stats.sumSquaredDiff.toFixed(2)}</span></span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Divide size={16} className="text-amber-400" />
              <span>Divide by count = {stats.sumSquaredDiff.toFixed(2)} / {n} = <span className="text-amber-400 font-bold font-mono text-base">{stats.variance.toFixed(2)}</span></span>
            </div>
          </div>
        </section>

        {/* Step 3: Std Dev */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">3</div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Calculate Standard Deviation</h3>
          </div>
          
          <div className="bg-black/30 rounded-xl p-5 border border-white/5 space-y-4 overflow-x-auto">
            <div className="flex items-center gap-3 text-gray-300 text-sm">
              <Square size={16} className="text-emerald-400" />
              <span>Take square root of Variance = √{stats.variance.toFixed(2)} = <span className="text-emerald-400 font-bold font-mono text-lg">{stats.stdDev.toFixed(2)}</span></span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
