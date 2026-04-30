import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, RotateCcw, Timer } from 'lucide-react';

export default function Stopwatch({ onRecordTime, isReactionErrorEnabled }) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const requestRef = useRef();
  const startTimeRef = useRef();

  const animate = (currentTime) => {
    if (startTimeRef.current !== undefined) {
      const elapsed = currentTime - startTimeRef.current;
      setTime(elapsed / 1000); // seconds
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning]);

  const handleStartStop = () => {
    // Simulate human reaction time error on start/stop
    let delay = 0;
    if (isReactionErrorEnabled) {
      // Add a random delay between 0.1 and 0.25 seconds
      delay = 100 + Math.random() * 150;
    }

    setTimeout(() => {
      if (!isRunning) {
        startTimeRef.current = performance.now() - (time * 1000);
        setIsRunning(true);
      } else {
        setIsRunning(false);
        cancelAnimationFrame(requestRef.current);
      }
    }, delay);
  };

  const handleReset = () => {
    setIsRunning(false);
    cancelAnimationFrame(requestRef.current);
    setTime(0);
    startTimeRef.current = undefined;
  };

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    const ms = Math.floor((totalSeconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
        <Timer size={16} className="text-rose-400" /> Stopwatch
      </h3>
      
      <div className="bg-[#0f172a] p-6 rounded-lg border border-slate-600 flex flex-col items-center shadow-inner">
        <div className="text-4xl font-mono font-bold text-white mb-6 tracking-wider" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {formatTime(time)}
        </div>
        
        <div className="flex gap-4 w-full">
          <button 
            onClick={handleStartStop}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${isRunning ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'}`}
          >
            {isRunning ? <><Square size={18} fill="currentColor" /> Stop</> : <><Play size={18} fill="currentColor" /> Start</>}
          </button>
          <button 
            onClick={handleReset}
            disabled={isRunning || time === 0}
            className="w-14 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
      
      <button
        onClick={() => onRecordTime(time)}
        disabled={time === 0 || isRunning}
        className="w-full mt-4 py-3 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-sky-600/20"
      >
        Record Trial Data
      </button>
    </div>
  );
}
