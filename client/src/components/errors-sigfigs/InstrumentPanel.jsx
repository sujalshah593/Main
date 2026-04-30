import React, { useState, useEffect } from 'react';

export default function InstrumentPanel({ instrument, measuredValue, trueValue, onJawMove }) {
  const [jawPos, setJawPos] = useState(0);

  // When trueValue changes (instrument changes), reset jaw
  useEffect(() => {
    setJawPos(0);
    if (onJawMove) onJawMove(0);
  }, [trueValue, onJawMove]);

  const handleSliderChange = (e) => {
    const val = parseFloat(e.target.value);
    setJawPos(val);
    if (onJawMove) onJawMove(val);
  };

  // Use 100 as the maximum scale for all instruments to provide a wider range
  const maxScale = 100;
  const percentage = Math.min(100, Math.max(0, (jawPos / maxScale) * 100));

  return (
    <div className="bg-slate-800 p-4 sm:p-6 rounded-xl border border-slate-700 flex flex-col items-center justify-center min-h-[250px] w-full">
      <h3 className="text-lg font-bold text-slate-300 mb-4 capitalize text-center">
        Virtual {instrument.replace('_', ' ')}
      </h3>
      
      <div className="relative w-full h-32 sm:h-40 bg-slate-900 rounded-lg flex items-center justify-start overflow-hidden border border-slate-600 shadow-inner px-4">
        {/* Simple object being measured */}
        <div 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-gradient-to-br from-amber-500 to-amber-700 rounded-sm shadow-lg z-10 border-2 border-amber-400/50"
          style={{ 
            width: `${Math.min(100, (trueValue / maxScale) * 100)}%`, 
            height: '40px' 
          }}
        >
          <div className="text-[10px] text-black/50 text-center font-bold mt-1">OBJECT</div>
        </div>
        
        {/* Fake main scale */}
        <div className="absolute top-0 left-4 right-4 h-10 flex border-b border-slate-500 z-0">
          {[...Array(maxScale)].map((_, i) => (
            <div key={i} className="flex-1 border-r border-slate-600/50 h-full flex flex-col justify-end pb-1 relative">
              {i % 10 === 0 && <span className="absolute -left-2 text-[8px] sm:text-[10px] text-slate-400 bottom-1">{i}</span>}
            </div>
          ))}
        </div>
        
        {/* Sliding Jaw */}
        <div 
          className="absolute top-0 bottom-0 w-4 bg-slate-400 border-l border-r border-slate-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 transition-all duration-75"
          style={{ left: `calc(1rem + ${percentage}%)` }}
        >
           {/* Vernier scale indicator */}
           <div className="absolute top-10 -left-6 w-16 h-8 bg-slate-700 border border-slate-500 flex justify-around items-end pb-1 opacity-80 pointer-events-none">
             {[...Array(10)].map((_, i) => (
               <div key={i} className="w-[1px] h-3 bg-slate-400"></div>
             ))}
           </div>
        </div>

      </div>

      {/* Slider Control */}
      <div className="w-full mt-6 px-2">
        <label className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-2 block">
          Move Instrument Jaw
        </label>
        <input 
          type="range" 
          min="0" 
          max={maxScale} 
          step="0.01" 
          value={jawPos} 
          onChange={handleSliderChange}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
        />
      </div>
      
      {/* Live Reading Indicator */}
      <div className="mt-4 flex flex-col items-center">
        <div className="text-2xl sm:text-3xl font-mono font-bold text-sky-400 tracking-wider bg-slate-900/50 px-4 py-2 rounded-lg border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
          {measuredValue.toFixed(3)}
        </div>
        <div className="text-[10px] sm:text-xs text-slate-400 mt-2 uppercase tracking-widest font-semibold">
          Simulated Reading
        </div>
      </div>
    </div>
  );
}
