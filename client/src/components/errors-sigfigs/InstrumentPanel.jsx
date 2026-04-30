import React from 'react';

export default function InstrumentPanel({ instrument, measuredValue, trueValue }) {
  // Simple visualization based on the instrument type
  
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col items-center justify-center min-h-[200px]">
      <h3 className="text-lg font-bold text-slate-300 mb-4 capitalize">
        Virtual {instrument.replace('_', ' ')}
      </h3>
      
      <div className="relative w-full max-w-md h-32 bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden border border-slate-600 shadow-inner">
        {/* Simple object being measured */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full shadow-lg z-10 border-2 border-amber-400/50"></div>
        
        {/* Fake scale */}
        <div className="absolute top-4 left-0 w-full h-8 flex border-b-2 border-slate-500 z-0">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex-1 border-r border-slate-600 h-full flex flex-col justify-end pb-1">
              {i % 5 === 0 && <span className="text-[8px] text-slate-400 self-center leading-none">{i}</span>}
            </div>
          ))}
        </div>
        
        {/* Measurement indicators */}
        <div className="absolute bottom-4 inset-x-0 flex flex-col items-center z-20">
          <div className="text-2xl font-mono font-bold text-sky-400 tracking-wider">
            {measuredValue.toFixed(3)}
          </div>
          <div className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
            Current Reading
          </div>
        </div>
      </div>
      
      <p className="text-sm text-slate-400 mt-4 text-center max-w-sm">
        Align the object with the instrument's jaws. The reading includes applied systematic, random, and human errors.
      </p>
    </div>
  );
}
