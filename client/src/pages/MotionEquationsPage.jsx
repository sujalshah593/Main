import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Car, Save, RefreshCw, Play, Square } from 'lucide-react';

import MotionSimulation from '../components/motion/MotionSimulation';
import MotionControls from '../components/motion/MotionControls';
import MotionTable from '../components/motion/MotionTable';
import MotionGraphs from '../components/motion/MotionGraphs';
import MotionCalculations from '../components/motion/MotionCalculations';
import { saveMotionAttempt } from '../api/motionApi';

export default function MotionEquationsPage() {
  const [initialVelocity, setInitialVelocity] = useState(0); // m/s
  const [acceleration, setAcceleration] = useState(2); // m/s^2
  const [isNoiseEnabled, setIsNoiseEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [dataPoints, setDataPoints] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleDataPoint = (point) => {
    // We only want to log unique integer seconds roughly to avoid flooding
    setDataPoints(prev => {
      // Check if we already have a point for this exact time
      if (prev.some(p => p.time === point.time)) {
        return prev;
      }
      return [...prev, point];
    });
  };

  const clearData = () => {
    setDataPoints([]);
  };

  const handleSave = async () => {
    if (dataPoints.length === 0) return;
    setIsSaving(true);
    try {
      // Re-calculate verification slopes
      const first = dataPoints[0];
      const last = dataPoints[dataPoints.length - 1];
      let expA = 0;
      let expS = 0;
      
      if (last.time - first.time > 0) {
        expA = (last.velocity - first.velocity) / (last.time - first.time);
        expS = 0.5 * (first.velocity + last.velocity) * (last.time - first.time);
      }

      await saveMotionAttempt({
        initialVelocity,
        acceleration,
        errorsApplied: {
          measurementNoise: isNoiseEnabled,
          timeDelay: false
        },
        dataPoints,
        calculatedSlope: expA,
        calculatedArea: expS
      });
      alert('Experiment data saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save data.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="flex flex-col min-h-[calc(100vh-6rem)] relative z-10 w-full overflow-hidden p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link to="/semester/sem-1/practical" className="group flex items-center justify-center p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-lab-muted hover:text-white transition-all border border-white/5 hover:border-white/20">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <Car className="text-sky-500" size={28} />
              Verification of Equations of Motion
            </h1>
            <p className="text-sm text-lab-muted mt-1">
              Virtual Interactive Laboratory
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => { clearData(); setIsPlaying(false); }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
          >
            <RefreshCw size={16} /> Reset Lab
          </button>
          <button 
            onClick={handleSave}
            disabled={dataPoints.length === 0 || isSaving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-semibold ${dataPoints.length === 0 || isSaving ? 'bg-emerald-500/50 cursor-not-allowed text-emerald-200' : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'}`}
          >
            <Save size={16} /> {isSaving ? 'Saving...' : 'Save Data'}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-y-auto custom-scrollbar pb-10">
        
        {/* Left Column (Simulation & Controls) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <MotionSimulation 
            initialVelocity={initialVelocity}
            acceleration={acceleration}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            onDataPoint={handleDataPoint}
            isNoiseEnabled={isNoiseEnabled}
          />

          <div className="flex gap-4">
            <button 
              onClick={() => {
                if (!isPlaying && dataPoints.length > 0) {
                  // Prompt user or auto-clear if starting fresh? Let's auto-clear if they start a new run.
                  if (dataPoints.length > 0 && !confirm("Starting again will append to your current data. Clear first if you want a fresh run. Continue?")) {
                    return;
                  }
                }
                setIsPlaying(true);
              }}
              disabled={isPlaying}
              className="flex-1 py-4 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Play size={20} fill="currentColor" /> Start Motion
            </button>
            <button 
              onClick={() => setIsPlaying(false)}
              disabled={!isPlaying}
              className="flex-1 py-4 bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2"
            >
              <Square size={20} fill="currentColor" /> Pause/Stop
            </button>
          </div>

          <MotionControls 
            initialVelocity={initialVelocity} setInitialVelocity={setInitialVelocity}
            acceleration={acceleration} setAcceleration={setAcceleration}
            isNoiseEnabled={isNoiseEnabled} setIsNoiseEnabled={setIsNoiseEnabled}
            isPlaying={isPlaying}
          />
        </div>

        {/* Middle Column (Data Table) */}
        <div className="lg:col-span-3 flex flex-col gap-6 h-full min-h-[400px]">
          <MotionTable dataPoints={dataPoints} clearData={clearData} />
        </div>

        {/* Right Column (Graphs & Calcs) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <MotionGraphs 
            dataPoints={dataPoints} 
            theoreticalU={initialVelocity} 
            theoreticalA={acceleration} 
          />
          <MotionCalculations 
            dataPoints={dataPoints} 
            theoreticalU={initialVelocity} 
            theoreticalA={acceleration} 
          />
        </div>

      </div>
    </section>
  );
}
