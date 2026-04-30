import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, RefreshCw, Info, HelpCircle, TrendingUp } from 'lucide-react';

import InclinedFrictionSimulation from '../components/friction-inclined/InclinedFrictionSimulation';
import InclinedFrictionControls from '../components/friction-inclined/InclinedFrictionControls';
import InclinedFrictionTable from '../components/friction-inclined/InclinedFrictionTable';
import InclinedFrictionGraph from '../components/friction-inclined/InclinedFrictionGraph';
import InclinedFrictionCalculations from '../components/friction-inclined/InclinedFrictionCalculations';
import InclinedFrictionQuiz from '../components/friction-inclined/InclinedFrictionQuiz';
import { saveInclinedFrictionAttempt } from '../api/inclinedFrictionApi';

export default function InclinedFrictionPage() {
  const [angle, setAngle] = useState(0); // degrees
  const [surfaceType, setSurfaceType] = useState('Wood on Wood');
  const [trials, setTrials] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  
  const [simulationState, setSimulationState] = useState({
    isSliding: false,
    angleReached: 0,
    distance: 0,
    v: 0,
    a: 0
  });

  const recordAngle = () => {
    if (!simulationState.isSliding) {
       alert("Increase the angle until the block begins to slide to record the Angle of Repose.");
       return;
    }
    const newTrial = {
      surfaceType,
      angle: simulationState.angleReached,
      mu: Math.tan(simulationState.angleReached * Math.PI / 180),
      timestamp: new Date()
    };
    setTrials(prev => [...prev, newTrial]);
  };

  const resetExperiment = () => {
    setTrials([]);
    setAngle(0);
  };

  const handleSave = async () => {
    if (trials.length === 0) return;
    setIsSaving(true);
    try {
      const avgMu = trials.reduce((acc, t) => acc + t.mu, 0) / trials.length;

      await saveInclinedFrictionAttempt({
        trials: trials.map((t, idx) => ({
          trialNumber: idx + 1,
          surfaceType: t.surfaceType,
          angleDegrees: t.angle,
          angleRadians: t.angle * Math.PI / 180,
          calculatedMu: t.mu
        })),
        averageMu: avgMu
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
              <TrendingUp className="text-lab-accent3" size={28} />
              Coefficient of Friction via Inclined Plane
            </h1>
            <p className="text-sm text-lab-muted mt-1">
              Mechanics Laboratory • Angle of Repose Method
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
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl">
            <InclinedFrictionSimulation 
              angle={angle}
              surfaceType={surfaceType}
              setSimulationState={setSimulationState}
            />
            
            <div className="mt-4 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                <div className="text-center border-r border-slate-700/50">
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Status</div>
                  <div className={`text-sm font-bold ${simulationState.isSliding ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {simulationState.isSliding ? 'Sliding...' : 'Stationary'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">tan(θ)</div>
                  <div className="text-xl font-mono font-black text-sky-400">{Math.tan(angle * Math.PI / 180).toFixed(3)}</div>
                </div>
              </div>

              <button
                onClick={recordAngle}
                className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2"
              >
                <TrendingUp size={20} /> Record Angle of Repose
              </button>
            </div>
          </div>

          <InclinedFrictionControls 
            angle={angle} setAngle={setAngle}
            surfaceType={surfaceType} setSurfaceType={setSurfaceType}
            resetBlock={() => {
              setAngle(0);
              setSimulationState(prev => ({ ...prev, isSliding: false, distance: 0 }));
            }}
          />
        </div>

        {/* Middle Column (Table & Graph) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex-1 min-h-[300px]">
            <InclinedFrictionTable trials={trials} removeTrial={(idx) => setTrials(trials.filter((_, i) => i !== idx))} />
          </div>
          <div className="h-[350px]">
            <InclinedFrictionGraph trials={trials} />
          </div>
        </div>

        {/* Right Column (Calculations & Quiz) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <InclinedFrictionCalculations trials={trials} />
          <InclinedFrictionQuiz />
          
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-4">
              <HelpCircle size={18} className="text-lab-accent" /> Angle of Repose Theory
            </h4>
            <div className="text-[12px] text-slate-400 space-y-3 leading-relaxed">
              <p>The <b>Angle of Repose</b> is the steepest angle at which a block can remain stationary on an inclined plane without sliding.</p>
              <p>At this specific angle, the downward force component along the plane ($mg \sin \theta$) is exactly balanced by the limiting frictional force ($\mu_s mg \cos \theta$).</p>
              <p className="p-2 bg-slate-900 rounded font-mono text-sky-400 text-center">μ = tan(θ)</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
