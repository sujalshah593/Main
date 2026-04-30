import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save, RefreshCw, Info, HelpCircle, Activity } from 'lucide-react';

import FrictionSimulation from '../components/friction/FrictionSimulation';
import FrictionControls from '../components/friction/FrictionControls';
import FrictionTable from '../components/friction/FrictionTable';
import FrictionGraph from '../components/friction/FrictionGraph';
import FrictionCalculations from '../components/friction/FrictionCalculations';
import FrictionQuiz from '../components/friction/FrictionQuiz';
import { saveFrictionAttempt } from '../api/frictionApi';

export default function FrictionPage() {
  const [mass, setMass] = useState(2.0); // kg
  const [surfaceType, setSurfaceType] = useState('Wood on Wood');
  const [appliedForce, setAppliedForce] = useState(0);
  const [trials, setTrials] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  
  const [simulationState, setSimulationState] = useState({
    x: 100,
    v: 0,
    a: 0,
    frictionForce: 0,
    isMoving: false,
    normalForce: 0
  });

  const recordObservation = () => {
    const newTrial = {
      surfaceType,
      mass,
      normalForce: simulationState.normalForce,
      frictionForce: simulationState.frictionForce,
      isStatic: !simulationState.isMoving,
      timestamp: new Date()
    };
    setTrials(prev => [...prev, newTrial]);
  };

  const resetExperiment = () => {
    setTrials([]);
    setAppliedForce(0);
  };

  const handleSave = async () => {
    if (trials.length === 0) return;
    setIsSaving(true);
    try {
      // Calculate averages
      const staticTrials = trials.filter(t => t.isStatic);
      const kineticTrials = trials.filter(t => !t.isStatic);
      
      const avgStatic = staticTrials.length > 0 
        ? staticTrials.reduce((acc, t) => acc + (t.frictionForce / t.normalForce), 0) / staticTrials.length 
        : 0;
      
      const avgKinetic = kineticTrials.length > 0 
        ? kineticTrials.reduce((acc, t) => acc + (t.frictionForce / t.normalForce), 0) / kineticTrials.length 
        : 0;

      await saveFrictionAttempt({
        trials: trials.map((t, idx) => ({
          trialNumber: idx + 1,
          surfaceType: t.surfaceType,
          mass: t.mass,
          normalReaction: t.normalForce,
          appliedForce: t.frictionForce, // In static, friction = applied
          staticFriction: t.isStatic ? t.frictionForce : null,
          kineticFriction: !t.isStatic ? t.frictionForce : null,
          calculatedMuStatic: t.isStatic ? (t.frictionForce / t.normalForce) : null,
          calculatedMuKinetic: !t.isStatic ? (t.frictionForce / t.normalForce) : null
        })),
        averageMu: {
          static: avgStatic,
          kinetic: avgKinetic
        }
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
              <Activity className="text-lab-accent3" size={28} />
              Study of Friction on Surfaces
            </h1>
            <p className="text-sm text-lab-muted mt-1">
              Mechanics Laboratory • Laws of Friction
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
            <FrictionSimulation 
              mass={mass}
              surfaceType={surfaceType}
              appliedForce={appliedForce}
              setSimulationState={setSimulationState}
            />
            
            <div className="mt-4 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                <div className="text-center border-r border-slate-700/50">
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Applied Force</div>
                  <div className="text-xl font-mono font-black text-emerald-400">{appliedForce.toFixed(1)}<span className="text-xs ml-1">N</span></div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Friction Force</div>
                  <div className="text-xl font-mono font-black text-rose-400">{simulationState.frictionForce.toFixed(1)}<span className="text-xs ml-1">N</span></div>
                </div>
              </div>

              <button
                onClick={recordObservation}
                className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2"
              >
                <Activity size={20} /> Capture Current State
              </button>
            </div>
          </div>

          <FrictionControls 
            mass={mass} setMass={setMass}
            surfaceType={surfaceType} setSurfaceType={setSurfaceType}
            appliedForce={appliedForce} setAppliedForce={setAppliedForce}
          />
        </div>

        {/* Middle Column (Table & Graph) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex-1 min-h-[300px]">
            <FrictionTable trials={trials} removeTrial={(idx) => setTrials(trials.filter((_, i) => i !== idx))} />
          </div>
          <div className="h-[350px]">
            <FrictionGraph trials={trials} />
          </div>
        </div>

        {/* Right Column (Calculations & Quiz) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <FrictionCalculations trials={trials} />
          <FrictionQuiz />
          
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-4">
              <HelpCircle size={18} className="text-lab-accent" /> Friction Theory
            </h4>
            <div className="text-[12px] text-slate-400 space-y-3 leading-relaxed">
              <p><b>Static Friction:</b> The force that resists the initiation of sliding motion. $F_s \le \mu_s N$.</p>
              <p><b>Kinetic Friction:</b> The force that resists the motion of a moving body. $F_k = \mu_k N$.</p>
              <p className="p-2 bg-slate-900 rounded font-mono text-sky-400 text-center">F = μN</p>
              <p>The coefficient of friction ($\mu$) depends on the pair of surfaces in contact and is generally independent of contact area.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
