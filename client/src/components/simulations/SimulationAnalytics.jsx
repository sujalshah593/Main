import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { BarChart2, PieChart as PieChartIcon, TrendingUp, Hash, Percent, Star } from 'lucide-react';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function SimulationAnalytics({ results, totalRun, trendData, config }) {
  
  const getTheoretical = (type, name) => {
    switch (type) {
      case 'coin': return 50;
      case 'dice': return 16.67;
      case 'spinner':
      case 'marbles': return 25;
      case 'cards': return 25; // Suits
      default: return null;
    }
  };

  const barData = Object.entries(results).map(([name, value]) => ({
    name,
    value,
    percentage: totalRun > 0 ? parseFloat(((value / totalRun) * 100).toFixed(1)) : 0,
    theoretical: getTheoretical(config.type, name)
  }));

  const pieData = Object.entries(results).map(([name, value]) => ({
    name,
    value
  }));

  // Find most/least common
  const sorted = [...barData].sort((a, b) => b.value - a.value);
  const mostCommon = sorted[0];
  const leastCommon = sorted[sorted.length - 1];

  return (
    <div className="flex flex-col gap-8 w-full">
      
      {/* Analytics Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Trials" value={totalRun} icon={Hash} color="emerald" />
        <StatCard 
          label="Most Frequent" 
          value={mostCommon?.value > 0 ? mostCommon.name : 'N/A'} 
          subValue={mostCommon?.value > 0 ? `${mostCommon.percentage}%` : ''}
          icon={Star} 
          color="amber" 
        />
        <StatCard 
          label="Least Frequent" 
          value={leastCommon?.value > 0 ? leastCommon.name : 'N/A'} 
          subValue={leastCommon?.value > 0 ? `${leastCommon.percentage}%` : ''}
          icon={TrendingUp} 
          color="red" 
        />
        <StatCard label="Confidence Level" value={totalRun > 200 ? '99%' : totalRun > 50 ? '85%' : 'Low'} icon={Percent} color="sky" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Bar Chart - Distribution */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-white/10 flex flex-col min-h-[400px] shadow-xl bg-black/20">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <BarChart2 size={18} className="text-emerald-400" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Outcome Distribution</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 mr-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500/40" /> Experimental
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                <div className="w-2 h-2 bg-white/20 rounded-full border border-white/40" /> Theoretical
              </div>
            </div>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#555" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#555" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="percentage" radius={[6, 6, 0, 0]} maxBarSize={60} name="Exp %">
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.6} />
                  ))}
                </Bar>
                <Bar dataKey="theoretical" radius={[6, 6, 0, 0]} maxBarSize={20} fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" name="Theory %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart - Relative Probability */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-white/10 flex flex-col min-h-[400px] shadow-xl bg-black/20">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-lg bg-sky-500/10">
              <PieChartIcon size={18} className="text-sky-400" />
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Probability Share</h3>
          </div>
          <div className="flex-1 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Total</span>
              <span className="text-2xl font-mono font-bold text-white">{totalRun}</span>
            </div>
          </div>
        </div>

        {/* Trend Analysis - Convergence */}
        <div className="lg:col-span-3 glass-panel p-6 rounded-3xl border border-white/10 flex flex-col min-h-[300px] shadow-xl bg-black/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] pointer-events-none" />
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <TrendingUp size={18} className="text-amber-400" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Convergence Pattern</h3>
            </div>
            <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase">Trend over last 50 iterations</p>
          </div>
          <div className="flex-1 relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="trial" stroke="#444" fontSize={9} tickLine={false} axisLine={false} />
                <YAxis stroke="#444" fontSize={9} hide />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Legend 
                  iconType="circle" 
                  wrapperStyle={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', paddingTop: '20px' }} 
                />
                {Object.keys(results).map((key, i) => (
                  <Line 
                    key={key} 
                    type="monotone" 
                    dataKey={key} 
                    stroke={COLORS[i % COLORS.length]} 
                    strokeWidth={3} 
                    dot={false}
                    isAnimationActive={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, subValue, icon: Icon, color }) {
  const colorMap = {
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
    sky: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  };

  return (
    <div className={`p-4 rounded-2xl border ${colorMap[color]} flex items-center gap-4 backdrop-blur-sm shadow-lg`}>
      <div className="p-3 rounded-xl bg-white/5">
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase font-bold opacity-60 truncate">{label}</div>
        <div className="flex items-baseline gap-2">
          <div className="text-xl font-mono font-bold truncate">{value}</div>
          {subValue && <span className="text-[10px] font-bold opacity-70">{subValue}</span>}
        </div>
      </div>
    </div>
  );
}
