import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart3 } from 'lucide-react';

export default function InclinedFrictionGraph({ trials }) {
  // Calculate average mu per surface
  const summary = trials.reduce((acc, t) => {
    if (!acc[t.surfaceType]) acc[t.surfaceType] = { count: 0, sum: 0 };
    acc[t.surfaceType].count++;
    acc[t.surfaceType].sum += t.mu;
    return acc;
  }, {});

  const data = Object.keys(summary).map(surface => ({
    name: surface.split(' ')[0], // Short name
    fullName: surface,
    mu: summary[surface].sum / summary[surface].count
  }));

  const COLORS = ['#38bdf8', '#fbbf24', '#f87171', '#34d399'];

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
      <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider mb-6">
        <BarChart3 size={16} className="text-sky-400" /> Comparison of μ Across Surfaces
      </h3>

      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" fontSize={10} />
            <YAxis stroke="#64748b" fontSize={10} domain={[0, 1]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#fff' }}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Bar dataKey="mu" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
         {data.map((entry, idx) => (
           <div key={idx} className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
             <span className="text-[10px] text-slate-500 font-bold uppercase">{entry.fullName}</span>
           </div>
         ))}
      </div>
    </div>
  );
}
