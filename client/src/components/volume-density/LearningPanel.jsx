import { Target, Lightbulb, BookOpen, Calculator, Beaker, Scale } from 'lucide-react';

export default function LearningPanel() {
  return (
    <div className="space-y-6 pb-6">
      <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-lab-accent/10 rounded-bl-full blur-2xl"></div>
        <h2 className="flex items-center gap-2 text-xl font-display font-bold text-white mb-4">
          <BookOpen className="text-lab-accent" size={24} />
          Introduction
        </h2>
        <div className="space-y-4 text-sm text-lab-muted leading-relaxed">
          <p>
            <strong className="text-white">Volume</strong> is the amount of 3D space an object occupies. 
            <strong className="text-white ml-1">Density</strong> is how much mass is packed into that volume.
          </p>
          <p>
            If two objects have the same volume but one is heavier, it has a higher density (e.g., a metal cube vs a wooden block).
          </p>
          <div className="p-4 rounded-xl bg-[#0f172a]/50 border border-white/5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-lab-accent2 flex items-center gap-2">
              <Calculator size={14} /> Formulas
            </h3>
            <div className="font-mono text-center py-2 bg-black/30 rounded border border-white/5 text-sky-300">
              Density (ρ) = Mass (m) / Volume (V)
            </div>
            <div className="font-mono text-center py-2 bg-black/30 rounded border border-white/5 text-emerald-300">
              Volume (Regular) = L × B × H
            </div>
            <div className="font-mono text-center py-2 bg-black/30 rounded border border-white/5 text-blue-300">
              Volume (Irregular) = Final Water Level - Initial Water Level
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent2/50 relative overflow-hidden">
        <h2 className="flex items-center gap-2 text-xl font-display font-bold text-white mb-4">
          <Target className="text-lab-accent2" size={24} />
          Objectives
        </h2>
        <ul className="space-y-3">
          {[
            'Measure the dimensions of a regular object.',
            'Measure the mass of an object using a weighing balance.',
            'Calculate the volume of both regular and irregular objects.',
            'Determine the density of the objects.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-lab-muted">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-lab-accent2/10 text-lab-accent2 flex items-center justify-center font-bold text-xs mt-0.5">
                {i + 1}
              </span>
              <span className="pt-1">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-lab-accent3/50 relative overflow-hidden">
        <h2 className="flex items-center gap-2 text-xl font-display font-bold text-white mb-4">
          <Beaker className="text-lab-accent3" size={24} />
          Apparatus Required
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: 'Weighing Balance', icon: <Scale size={16} /> },
            { name: 'Ruler / Vernier', icon: <Calculator size={16} /> },
            { name: 'Measuring Cylinder', icon: <Beaker size={16} /> },
            { name: 'Objects (Wood, Metal, Stone)', icon: <Lightbulb size={16} /> },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white">
              <span className="text-lab-accent3">{item.icon}</span>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
