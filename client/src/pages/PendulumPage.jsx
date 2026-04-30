import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Save, RefreshCw } from 'lucide-react';

import PendulumSimulation from '../components/pendulum/PendulumSimulation';
import PendulumControls from '../components/pendulum/PendulumControls';
import Stopwatch from '../components/pendulum/Stopwatch';
import PendulumTable from '../components/pendulum/PendulumTable';
import PendulumGraph from '../components/pendulum/PendulumGraph';
import PendulumCalculations from '../components/pendulum/PendulumCalculations';
import { savePendulumAttempt } from '../api/pendulumApi';

export default function PendulumPage() {
  const [length, setLength] = useState(0.5); // meters
  const [isDampingEnabled, setIsDampingEnabled] = useState(false);
  const [isReactionErrorEnabled, setIsReactionErrorEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trials, setTrials] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  
  // Track oscillation count from simulation component
  const [oscillationCount, setOscillationCount] = useState(0);
  const oscillationsN = 10;

  const handleRecordTime = (timeForN) => {
    // Make sure we stop the pendulum if it's playing
    setIsPlaying(false);

    const timePeriod = timeForN / oscillationsN;
    const tSquared = timePeriod * timePeriod;

    setTrials([...trials, {
      length,
      timeForN,
      timePeriod,
      tSquared
    }]);
  };

  const removeTrial = (index) => {
    setTrials(trials.filter((_, i) => i !== index));
  };

  const resetExperiment = () => {
    setTrials([]);
    setIsPlaying(false);
  };

  const handleSave = async () => {
    if (trials.length === 0) return;
    setIsSaving(true);
    try {
      // Calculate average g from trials
      let sumXY = 0;
      let sumXX = 0;
      trials.forEach(t => {
        sumXY += t.length * t.tSquared;
        sumXX += t.length * t.length;
      });
      const m = sumXX === 0 ? 0 : sumXY / sumXX;
      const experimentalGravity = m === 0 ? 0 : (4 * Math.PI * Math.PI) / m;

      await savePendulumAttempt({
        oscillationsN,
        errorsApplied: {
          reactionTime: isReactionErrorEnabled,
          airResistance: isDampingEnabled
        },
        trials,
        calculatedGravity: experimentalGravity
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
              <Clock className="text-emerald-500" size={28} />
              Simple Pendulum Motion
            </h1>
            <p className="text-sm text-lab-muted mt-1">
              Virtual Interactive Laboratory
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={resetExperiment}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
          >
            <RefreshCw size={16} /> Reset
          </button>
          <button 
            onClick={handleSave}
            disabled={trials.length === 0 || isSaving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-semibold ${trials.length === 0 || isSaving ? 'bg-emerald-500/50 cursor-not-allowed text-emerald-200' : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'}`}
          >
            <Save size={16} /> {isSaving ? 'Saving...' : 'Save Data'}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-y-auto custom-scrollbar pb-10">
        
        {/* Left Column (Simulation & Controls) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
            <PendulumSimulation 
              length={length}
              isDampingEnabled={isDampingEnabled}
              initialAngle={Math.PI / 6} // ~30 degrees for clear view, though SHM assumes small angle
              setOscillationCount={setOscillationCount}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
            
            <div className="mt-4 flex gap-4">
              <button 
                onClick={() => setIsPlaying(true)}
                disabled={isPlaying}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-bold transition-all"
              >
                Release Bob
              </button>
              <button 
                onClick={() => setIsPlaying(false)}
                disabled={!isPlaying}
                className="flex-1 py-3 bg-slate-600 hover:bg-slate-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-bold transition-all"
              >
                Reset Bob
              </button>
            </div>
            {isPlaying && (
              <div className="mt-4 text-center">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Oscillations</span>
                <div className="text-4xl font-mono text-white">{oscillationCount}</div>
                <div className="text-xs text-amber-400 mt-1">Wait until {oscillationsN} to stop stopwatch!</div>
              </div>
            )}
          </div>

          <PendulumControls 
            length={length} setLength={setLength}
            isDampingEnabled={isDampingEnabled} setIsDampingEnabled={setIsDampingEnabled}
            isReactionErrorEnabled={isReactionErrorEnabled} setIsReactionErrorEnabled={setIsReactionErrorEnabled}
            isPlaying={isPlaying}
          />
        </div>

        {/* Middle Column (Table & Stopwatch) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Stopwatch 
            onRecordTime={handleRecordTime}
            isReactionErrorEnabled={isReactionErrorEnabled}
          />
          <PendulumTable 
            trials={trials} 
            removeTrial={removeTrial} 
            oscillationsN={oscillationsN}
          />
        </div>

        {/* Right Column (Graph & Calculations) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <PendulumGraph trials={trials} />
          <PendulumCalculations trials={trials} oscillationsN={oscillationsN} />
        </div>

      </div>
    </section>
  );
}
