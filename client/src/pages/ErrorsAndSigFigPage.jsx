import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Beaker, Save, RefreshCw } from 'lucide-react';

import InstrumentPanel from '../components/errors-sigfigs/InstrumentPanel';
import ErrorSimulationControls from '../components/errors-sigfigs/ErrorSimulationControls';
import CalculationEngine from '../components/errors-sigfigs/CalculationEngine';
import ObservationTable from '../components/errors-sigfigs/ObservationTable';
import SigFigModule from '../components/errors-sigfigs/SigFigModule';
import { saveMeasurementAttempt } from '../api/measurementsApi';

const INSTRUMENTS = [
  { id: 'ruler', name: 'Ruler', trueValue: 15.2, leastCount: 0.1 },
  { id: 'vernier', name: 'Vernier Caliper', trueValue: 24.53, leastCount: 0.01 },
  { id: 'screw_gauge', name: 'Screw Gauge', trueValue: 2.345, leastCount: 0.001 }
];

export default function ErrorsAndSigFigPage() {
  const [instrumentId, setInstrumentId] = useState(INSTRUMENTS[0].id);
  const [errors, setErrors] = useState({ systematic: false, random: false, human: false });
  const [trials, setTrials] = useState([]);
  const [currentReading, setCurrentReading] = useState(0);
  const [jawPosition, setJawPosition] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const selectedInstrument = INSTRUMENTS.find(i => i.id === instrumentId);

  // Generate continuous reading for the UI while sliding
  const generateLiveReading = (baseValue) => {
    let reading = baseValue;
    
    if (errors.systematic) {
      reading += 0.02; 
    }
    
    if (errors.human) {
      // Small constant misread factor while sliding
      reading += 0.015;
    }

    // round to least count
    const factor = 1 / selectedInstrument.leastCount;
    return Math.round(reading * factor) / factor;
  };

  useEffect(() => {
    setCurrentReading(generateLiveReading(jawPosition));
  }, [jawPosition, errors, instrumentId]); 

  const takeMeasurement = () => {
    let finalReading = currentReading;
    
    if (errors.random) {
      // Apply random noise ONLY when taking measurement
      const randError = (Math.random() * 0.06) - 0.03;
      finalReading += randError;
    }
    
    // round to least count again
    const factor = 1 / selectedInstrument.leastCount;
    finalReading = Math.round(finalReading * factor) / factor;
    
    const finalTotalError = finalReading - selectedInstrument.trueValue;

    setTrials([...trials, { 
      measuredValue: finalReading, 
      error: finalTotalError,
      correctedValue: selectedInstrument.trueValue
    }]);
  };

  const removeTrial = (index) => {
    setTrials(trials.filter((_, i) => i !== index));
  };

  const resetExperiment = () => {
    setTrials([]);
    setErrors({ systematic: false, random: false, human: false });
  };

  const handleSave = async () => {
    if (trials.length === 0) return;
    setIsSaving(true);
    try {
      const mean = trials.reduce((sum, t) => sum + t.measuredValue, 0) / trials.length;
      
      await saveMeasurementAttempt({
        experimentType: 'length_rod',
        instrumentUsed: instrumentId,
        errorsApplied: errors,
        systematicErrorValue: errors.systematic ? 0.02 : 0,
        trials: trials,
        calculatedResults: {
          mean: mean
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
              <Beaker className="text-rose-500" size={28} />
              Errors & Significant Figures
            </h1>
            <p className="text-sm text-lab-muted mt-1">
              Virtual Interactive Laboratory
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={instrumentId}
            onChange={(e) => {
              setInstrumentId(e.target.value);
              setTrials([]);
            }}
            className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
          >
            {INSTRUMENTS.map(i => (
              <option key={i.id} value={i.id}>{i.name}</option>
            ))}
          </select>
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 h-full overflow-y-auto custom-scrollbar pb-10">
        
        {/* Left Column (Controls & Tool) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <InstrumentPanel 
            instrument={instrumentId} 
            measuredValue={currentReading} 
            trueValue={selectedInstrument.trueValue} 
            onJawMove={setJawPosition}
          />
          
          <div className="flex justify-center">
            <button 
              onClick={takeMeasurement}
              className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-sky-500/25 transition-all transform hover:-translate-y-1"
            >
              Take Measurement
            </button>
          </div>

          <ErrorSimulationControls errors={errors} setErrors={setErrors} />
        </div>

        {/* Middle Column (Data & Calcs) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <ObservationTable trials={trials} removeTrial={removeTrial} />
          <CalculationEngine trials={trials} trueValue={selectedInstrument.trueValue} />
        </div>

        {/* Right Column (Sig Figs) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <SigFigModule />
          
          {/* Simple Chart / Visualization placeholder */}
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex-1">
            <h3 className="text-lg font-bold text-slate-300 mb-4">Trial Distribution</h3>
            {trials.length > 0 ? (
              <div className="h-48 flex items-end gap-2 border-b border-l border-slate-600 pb-2 pl-2">
                {trials.map((t, i) => {
                  const maxDiff = 0.1;
                  const diff = t.measuredValue - selectedInstrument.trueValue;
                  const heightPct = Math.max(5, 50 + (diff / maxDiff) * 50);
                  return (
                    <div 
                      key={i} 
                      className="w-full bg-sky-500 rounded-t-sm hover:bg-sky-400 transition-colors relative group"
                      style={{ height: `${Math.min(100, Math.max(0, heightPct))}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {t.measuredValue.toFixed(3)}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center border-b border-l border-slate-700">
                <span className="text-slate-500 text-sm">No data to display</span>
              </div>
            )}
            <div className="text-center text-xs text-slate-500 mt-2">Trials →</div>
          </div>
        </div>

      </div>
    </section>
  );
}
