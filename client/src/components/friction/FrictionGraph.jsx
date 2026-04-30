import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ScatterChart, Scatter, ZAxis } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function FrictionGraph({ trials }) {
  // Group trials by surface type
  const groupedData = trials.reduce((acc, t) => {
    if (!acc[t.surfaceType]) acc[t.surfaceType] = [];
    acc[t.surfaceType].push({
      n: t.normalForce,
      f: t.frictionForce,
      surface: t.surfaceType
    });
    return acc;
  }, {});

  const COLORS = {
    'Wood on Wood': '#92400e',
    'Metal on Metal': '#475569',
    'Rubber on Concrete': '#1e293b',
    'Ice on Ice': '#e0f2fe'
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wider">
          <TrendingUp size={16} className="text-emerald-400" /> Force vs Normal Reaction
        </h3>
      </div>

      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              type="number" 
              dataKey="n" 
              name="Normal Force" 
              unit=" N" 
              stroke="#64748b" 
              fontSize={10}
              label={{ value: 'Normal Reaction (N)', position: 'insideBottom', offset: -10, fill: '#64748b', fontSize: 10 }}
            />
            <YAxis 
              type="number" 
              dataKey="f" 
              name="Frictional Force" 
              unit=" N" 
              stroke="#64748b" 
              fontSize={10}
              label={{ value: 'Friction (N)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px' }}
              itemStyle={{ color: '#fff' }}
              cursor={{ strokeDasharray: '3 3' }}
            />
            <Legend verticalAlign="top" height={36}/>
            
            {Object.keys(groupedData).map(surface => (
              <Scatter 
                key={surface}
                name={surface} 
                data={groupedData[surface]} 
                fill={COLORS[surface] || '#fff'}
                line={{ stroke: COLORS[surface], strokeWidth: 1 }}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
