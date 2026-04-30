import React from 'react';
import { AlertCircle, Zap, User } from 'lucide-react';

export default function ErrorSimulationControls({ errors, setErrors }) {
  const toggleError = (type) => {
    setErrors(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full">
      <h3 className="text-lg font-bold text-slate-300 mb-6 flex items-center gap-2">
        <AlertCircle size={20} className="text-rose-400" />
        Error Simulation
      </h3>
      
      <div className="space-y-4 flex flex-col justify-center">
        {/* Systematic Error Toggle */}
        <div 
          onClick={() => toggleError('systematic')}
          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
            errors.systematic 
              ? 'bg-rose-500/20 border-rose-500/50 text-rose-200' 
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-bold">
              <div className={`w-3 h-3 rounded-full ${errors.systematic ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]' : 'bg-slate-600'}`}></div>
              Systematic Error
            </div>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${errors.systematic ? 'bg-rose-500' : 'bg-slate-700'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${errors.systematic ? 'left-5' : 'left-0.5'}`}></div>
            </div>
          </div>
          <p className="text-xs opacity-80 pl-5">Adds a constant zero-error offset to all readings (e.g., +0.02 cm).</p>
        </div>

        {/* Random Error Toggle */}
        <div 
          onClick={() => toggleError('random')}
          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
            errors.random 
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-200' 
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-bold">
              <Zap size={16} className={errors.random ? 'text-amber-400' : 'text-slate-500'} />
              Random Error
            </div>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${errors.random ? 'bg-amber-500' : 'bg-slate-700'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${errors.random ? 'left-5' : 'left-0.5'}`}></div>
            </div>
          </div>
          <p className="text-xs opacity-80 pl-6">Introduces unpredictable noise (+/-) due to environmental factors.</p>
        </div>

        {/* Human Error Toggle */}
        <div 
          onClick={() => toggleError('human')}
          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
            errors.human 
              ? 'bg-sky-500/20 border-sky-500/50 text-sky-200' 
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-bold">
              <User size={16} className={errors.human ? 'text-sky-400' : 'text-slate-500'} />
              Human Error
            </div>
            <div className={`w-10 h-5 rounded-full relative transition-colors ${errors.human ? 'bg-sky-500' : 'bg-slate-700'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${errors.human ? 'left-5' : 'left-0.5'}`}></div>
            </div>
          </div>
          <p className="text-xs opacity-80 pl-6">Simulates slight misreadings or parallax errors when observing the scale.</p>
        </div>
      </div>
    </div>
  );
}
