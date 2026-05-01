import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell, ReferenceLine, Label
} from 'recharts';
import { BarChart2, TrendingUp, Info } from 'lucide-react';

export default function StatisticsVisualizer({ datasetA, datasetB, isCompareMode, statsA, statsB }) {
  
  const chartData = useMemo(() => {
    const maxLen = isCompareMode ? Math.max(datasetA.length, datasetB.length) : datasetA.length;
    const data = [];
    for (let i = 0; i < maxLen; i++) {
      data.push({
        name: `Val ${i + 1}`,
        datasetA: datasetA[i] !== undefined ? datasetA[i] : null,
        datasetB: isCompareMode && datasetB[i] !== undefined ? datasetB[i] : null,
      });
    }
    return data;
  }, [datasetA, datasetB, isCompareMode]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="glass-panel p-6 rounded-2xl border border-white/10 shadow-lg relative overflow-hidden flex flex-col min-h-[400px]">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
            <BarChart2 size={18} className="text-sky-400" />
            Data Visualization
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
              <span className="text-[10px] font-bold text-gray-400 uppercase">Dataset A</span>
            </div>
            {isCompareMode && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-fuchsia-500 shadow-[0_0_8px_rgba(217,70,239,0.5)]" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Dataset B</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 w-full bg-black/40 rounded-xl p-6 border border-white/5 shadow-inner relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888', fontSize: 10 }} axisLine={{ stroke: '#444' }} tickLine={false} />
              <YAxis stroke="#888" tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} />
              <RechartsTooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                itemStyle={{ color: '#fff' }}
              />
              
              {/* Mean Reference Lines */}
              <ReferenceLine y={statsA.mean} stroke="#0ea5e9" strokeDasharray="3 3" strokeWidth={2}>
                <Label position="top" fill="#0ea5e9" fontSize={10} fontWeight="bold">Mean A: {statsA.mean.toFixed(2)}</Label>
              </ReferenceLine>
              
              {isCompareMode && (
                <ReferenceLine y={statsB.mean} stroke="#d946ef" strokeDasharray="3 3" strokeWidth={2}>
                  <Label position="top" fill="#d946ef" fontSize={10} fontWeight="bold">Mean B: {statsB.mean.toFixed(2)}</Label>
                </ReferenceLine>
              )}

              <Bar dataKey="datasetA" fill="#0ea5e9" radius={[4, 4, 0, 0]} maxBarSize={60} />
              {isCompareMode && <Bar dataKey="datasetB" fill="#d946ef" radius={[4, 4, 0, 0]} maxBarSize={60} />}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Dataset A Mean" value={statsA.mean.toFixed(2)} color="sky" icon={TrendingUp} />
        <SummaryCard title="Dataset A Std Dev" value={statsA.stdDev.toFixed(2)} color="sky" icon={Info} />
        {isCompareMode ? (
          <>
            <SummaryCard title="Dataset B Mean" value={statsB.mean.toFixed(2)} color="fuchsia" icon={TrendingUp} />
            <SummaryCard title="Dataset B Std Dev" value={statsB.stdDev.toFixed(2)} color="fuchsia" icon={Info} />
          </>
        ) : (
          <>
            <SummaryCard title="Dataset A Variance" value={statsA.variance.toFixed(2)} color="amber" icon={TrendingUp} />
            <SummaryCard title="Dataset A Range" value={statsA.range} color="emerald" icon={TrendingUp} />
          </>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ title, value, color, icon: Icon }) {
  const colorMap = {
    sky: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    fuchsia: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  };

  return (
    <div className={`p-4 rounded-2xl border ${colorMap[color]} flex items-center justify-between shadow-lg backdrop-blur-sm`}>
      <div>
        <p className="text-[10px] uppercase font-bold opacity-70 mb-1">{title}</p>
        <p className="text-2xl font-mono font-bold">{value}</p>
      </div>
      <div className={`p-2 rounded-lg bg-white/5`}>
        <Icon size={20} />
      </div>
    </div>
  );
}
