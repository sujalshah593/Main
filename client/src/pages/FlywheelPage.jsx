import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCw, Save, RefreshCw, Info, HelpCircle } from 'lucide-react';

import FlywheelSimulation from '../components/flywheel/FlywheelSimulation';
import FlywheelControls from '../components/flywheel/FlywheelControls';
import FlywheelTable from '../components/flywheel/FlywheelTable';
import FlywheelGraph from '../components/flywheel/FlywheelGraph';
import FlywheelCalculations from '../components/flywheel/FlywheelCalculations';
import FlywheelQuiz from '../components/flywheel/FlywheelQuiz';
import Stopwatch from '../components/pendulum/Stopwatch';
import { saveFlywheelAttempt } from '../api/flywheelApi';
import { Play, Square, Timer, Target } from 'lucide-react';

export default function FlywheelPage() {
  const [mass, setMass] = useState(0.5); // kg
  const [radius, setRadius] = useState(0.02); // m (axle radius)
  const [numTurns, setNumTurns] = useState(5); // N
  const [isFrictionEnabled, setIsFrictionEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trials, setTrials] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  
  // Practical workflow state
  const [woundTurns, setWoundTurns] = useState(0);
  const [isMassAttached, setIsMassAttached] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [simulationState, setSimulationState] = useState({
    time: 0,
    omega: 0,
    theta: 0,
    turns: 0,
    isMassAttached: true
  });

  // Stopwatch & Capture state
  const [stopwatchTime, setStopwatchTime] = useState(0);
  
  useEffect(() => {
    setStopwatchTime(simulationState.time);
  }, [simulationState.time]);

  const [capturedT1, setCapturedT1] = useState(null);
  const [capturedT2, setCapturedT2] = useState(null);
  const [capturedN1, setCapturedN1] = useState(null);
  const [capturedN2, setCapturedN2] = useState(null);
  const [capturedOmega, setCapturedOmega] = useState(null);

  const handleCaptureT1 = () => {
    if (simulationState.isMassAttached) {
      alert("Wait for the mass to detach before capturing t1!");
      return;
    }
    setCapturedT1(stopwatchTime);
    setCapturedN1(numTurns);
    setCapturedOmega(simulationState.omega);
  };

  const handleCaptureT2 = () => {
    if (simulationState.omega > 0.01) {
      alert("Wait for the flywheel to stop before capturing t2!");
      return;
    }
    if (!capturedT1) {
      alert("You must capture t1 first!");
      return;
    }
    const t2 = stopwatchTime - capturedT1;
    const n2 = simulationState.turns - capturedN1;
    setCapturedT2(t2);
    setCapturedN2(n2);
  };

  const handleRecordTrial = () => {
    if (!capturedT1 || !capturedT2) return;
    
    const newTrial = {
      mass,
      radius,
      t1: capturedT1,
      n1: capturedN1,
      t2: capturedT2,
      n2: capturedN2,
      omega: capturedOmega
    };
    
    setTrials(prev => [...prev, newTrial]);
    
    // Reset capture state for next trial
    setCapturedT1(null);
    setCapturedT2(null);
    setCapturedN1(null);
    setCapturedN2(null);
    setCapturedOmega(null);
  };

  const resetExperiment = () => {
    setTrials([]);
    setIsPlaying(false);
    setCapturedT1(null);
    setCapturedT2(null);
    setWoundTurns(0);
    setIsMassAttached(false);
    setCurrentStep(1);
  };

  const handleWind = () => {
    if (woundTurns < numTurns) {
      setWoundTurns(prev => prev + 1);
      if (woundTurns + 1 === numTurns) setCurrentStep(2);
    }
  };

  const handleAttachMass = () => {
    if (woundTurns < numTurns) {
      alert("Wind the string fully first!");
      return;
    }
    setIsMassAttached(true);
    setCurrentStep(3);
  };

  const handleSave = async () => {
    if (trials.length === 0) return;
    setIsSaving(true);
    try {
      const avgI = trials.reduce((acc, t) => {
        const g = 9.81;
        const h = 2 * Math.PI * t.radius * t.n1;
        const v = t.radius * t.omega;
        const numerator = t.mass * (2 * g * h - v * v);
        const denominator = t.omega * t.omega * (1 + t.n1 / t.n2);
        return acc + (numerator / denominator);
      }, 0) / trials.length;

      await saveFlywheelAttempt({
        trials: trials.map((t, idx) => ({
          trialNumber: idx + 1,
          massAttached: t.mass,
          axleRadius: t.radius,
          numTurns: t.n1,
          heightFalling: 2 * Math.PI * t.radius * t.n1,
          timeFalling: t.t1,
          rotationsFalling: t.n1,
          timeStopping: t.t2,
          rotationsStopping: t.n2,
          calculatedAngularVelocity: t.omega,
          calculatedI: (t.mass * (2 * 9.81 * 2 * Math.PI * t.radius * t.n1 - Math.pow(t.radius * t.omega, 2))) / (Math.pow(t.omega, 2) * (1 + t.n1 / t.n2))
        })),
        averageI: avgI,
        appliedErrors: { friction: isFrictionEnabled }
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
              <RotateCw className="text-lab-accent3 animate-spin-slow" size={28} />
              Determination of Moment of Inertia of a Flywheel
            </h1>
            <p className="text-sm text-lab-muted mt-1">
              Mechanics Laboratory • Rotational Dynamics
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
            <FlywheelSimulation 
              mass={mass}
              radius={radius}
              numTurns={numTurns}
              woundTurns={woundTurns}
              isMassAttached={isMassAttached}
              isFrictionEnabled={isFrictionEnabled}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              onMassDetach={() => {}} 
              onFlywheelStop={() => {}} 
              setSimulationState={setSimulationState}
            />
            
            <div className="mt-4 flex flex-col gap-3">
              {/* Step 1: Winding */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleWind}
                  disabled={isPlaying || woundTurns >= numTurns}
                  className={`flex-1 py-3 rounded-lg font-bold transition-all border ${currentStep === 1 ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-slate-900 border-slate-700 text-slate-500'}`}
                >
                  {woundTurns >= numTurns ? 'Fully Wound' : `Wind String (${woundTurns}/${numTurns})`}
                </button>
                <button 
                  onClick={() => setWoundTurns(0)}
                  disabled={isPlaying}
                  className="px-3 py-3 bg-slate-900 border border-slate-700 text-slate-400 rounded-lg hover:text-white"
                >
                  <RefreshCw size={18} />
                </button>
              </div>

              {/* Step 2: Attach Mass */}
              <button 
                onClick={handleAttachMass}
                disabled={isPlaying || isMassAttached || woundTurns < numTurns}
                className={`w-full py-3 rounded-lg font-bold transition-all border ${currentStep === 2 ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'bg-slate-900 border-slate-700 text-slate-500'}`}
              >
                {isMassAttached ? 'Mass Attached' : 'Attach Mass'}
              </button>

              {/* Step 3: Release */}
              <div className="flex gap-4">
                {!isPlaying ? (
                  <button 
                    onClick={() => {
                      if (!isMassAttached) return alert("Attach mass first!");
                      setIsPlaying(true);
                      setCurrentStep(4);
                    }}
                    disabled={!isMassAttached}
                    className="flex-1 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Play size={20} fill="currentColor" /> Release Flywheel
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setIsPlaying(false);
                      setWoundTurns(0);
                      setIsMassAttached(false);
                      setCurrentStep(1);
                    }}
                    className="flex-1 py-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Square size={20} fill="currentColor" /> Reset Wheel
                  </button>
                )}
              </div>

              {/* Capture Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                <button
                  onClick={handleCaptureT1}
                  disabled={capturedT1 || simulationState.time === 0}
                  className={`flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all border ${capturedT1 ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'}`}
                >
                  <Target size={16} /> {capturedT1 ? `t1: ${capturedT1.toFixed(2)}s` : 'Capture t1'}
                </button>
                <button
                  onClick={handleCaptureT2}
                  disabled={!capturedT1 || capturedT2 || (isPlaying && simulationState.omega > 0.01)}
                  className={`flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all border ${capturedT2 ? 'bg-amber-500/10 border-amber-500/50 text-amber-400' : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'}`}
                >
                  <Timer size={16} /> {capturedT2 ? `t2: ${capturedT2.toFixed(2)}s` : 'Capture t2'}
                </button>
              </div>

              {capturedT1 && capturedT2 && (
                <button
                  onClick={handleRecordTrial}
                  className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2"
                >
                  <Save size={20} /> Add to Observation Table
                </button>
              )}
            </div>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info size={14} className="text-lab-accent3" /> Experimental Procedure
            </h4>
            <div className="space-y-4">
              {[
                { step: 1, text: "Wind the string around the axle by clicking 'Wind' 5 times." },
                { step: 2, text: "Attach the known mass to the end of the string." },
                { step: 3, text: "Release the flywheel and observe the falling mass." },
                { step: 4, text: "Capture t1 when mass detaches and t2 when wheel stops." }
              ].map((item) => (
                <div key={item.step} className={`flex gap-3 text-[11px] transition-opacity ${currentStep === item.step ? 'opacity-100' : 'opacity-40'}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 font-bold ${currentStep === item.step ? 'bg-lab-accent3 text-black' : 'bg-slate-700 text-slate-400'}`}>
                    {item.step}
                  </span>
                  <p className="text-slate-300 pt-0.5">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <FlywheelControls 
            mass={mass} setMass={setMass}
            radius={radius} setRadius={setRadius}
            numTurns={numTurns} setNumTurns={setNumTurns}
            isFrictionEnabled={isFrictionEnabled} setIsFrictionEnabled={setIsFrictionEnabled}
            isPlaying={isPlaying}
          />
        </div>

        {/* Middle Column (Table & Stopwatch) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Timer size={16} className="text-rose-400" /> Laboratory Stopwatch
            </h3>
            <div className="bg-[#0f172a] p-8 rounded-lg border border-slate-600 flex flex-col items-center shadow-inner">
              <div className="text-6xl font-mono font-bold text-white mb-2 tracking-wider">
                {stopwatchTime.toFixed(2)}<span className="text-2xl text-slate-500">s</span>
              </div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Elapsed Time</p>
            </div>
            {/* We'll use simulation time for now to keep it synchronized, or a real stopwatch */}
            <div className="mt-4 text-center text-[10px] text-slate-500 uppercase font-bold">
              Use simulation time for accurate measurements
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <FlywheelTable trials={trials} removeTrial={(idx) => setTrials(trials.filter((_, i) => i !== idx))} />
          </div>
          <div className="h-[350px]">
            <FlywheelGraph trials={trials} />
          </div>
        </div>

        {/* Right Column (Calculations & Quiz) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <FlywheelCalculations trials={trials} />
          <FlywheelQuiz />
          
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-4">
              <HelpCircle size={18} className="text-lab-accent" /> Theory Brief
            </h4>
            <div className="text-[12px] text-slate-400 space-y-3 leading-relaxed">
              <p>The flywheel stores rotational kinetic energy. The work done by the falling mass is converted into rotational energy of the flywheel and the linear kinetic energy of the mass.</p>
              <p className="p-2 bg-slate-900 rounded font-mono text-sky-400 text-center">τ = Iα</p>
              <p>Friction in the bearings causes retardation after the mass detaches, allowing us to calculate the energy lost per rotation.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
