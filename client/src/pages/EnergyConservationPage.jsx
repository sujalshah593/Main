import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Save, RefreshCw, BookOpen } from 'lucide-react';

import EnergySimulation from '../components/energy/EnergySimulation';
import EnergyControls from '../components/energy/EnergyControls';
import EnergyTable from '../components/energy/EnergyTable';
import EnergyGraphs from '../components/energy/EnergyGraphs';
import EnergyCalculations from '../components/energy/EnergyCalculations';
import EnergyQuiz from '../components/energy/EnergyQuiz';
import { saveEnergyAttempt } from '../api/energyApi';

export default function EnergyConservationPage() {
  const [initialHeight, setInitialHeight] = useState(4); // m
  const [isFrictionEnabled, setIsFrictionEnabled] = useState(false);
  const [isReleased, setIsReleased] = useState(false);
  const [readings, setReadings] = useState([]);
  const [history, setHistory] = useState([]);
  const [metrics, setMetrics] = useState({ x: 0, h: 4, v: 0, pe: 39.24, ke: 0 });
  const [isSaving, setIsSaving] = useState(false);
  const [showTheory, setShowTheory] = useState(false);

  // Update history for graphs
  const handleUpdateMetrics = (newMetrics) => {
    setMetrics(newMetrics);
    if (isReleased) {
      setHistory(prev => [...prev, newMetrics].slice(-200));
    }
  };

  const handleSnapshot = () => {
    setReadings(prev => [...prev, { ...metrics, total: metrics.pe + metrics.ke }]);
  };

  const resetExperiment = () => {
    setIsReleased(false);
    setReadings([]);
    setHistory([]);
    setMetrics({ x: 0, h: initialHeight, v: 0, pe: 1 * 9.81 * initialHeight, ke: 0 });
  };

  const handleSave = async () => {
    if (readings.length === 0) return;
    setIsSaving(true);
    try {
      await saveEnergyAttempt({
        initialHeight,
        isFrictionEnabled,
        readings: readings.map(r => ({
          position: r.x,
          height: r.h,
          velocity: r.v,
          potentialEnergy: r.pe,
          kineticEnergy: r.ke,
          totalEnergy: r.total
        }))
      });
      alert('Experiment data saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save experiment data.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="flex flex-col min-h-[calc(100vh-6rem)] relative z-10 w-full overflow-hidden p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <Link to="/semester/sem-1/practical" className="group flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white/10 text-lab-muted hover:text-white transition-all border border-white/5 hover:border-white/20">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="font-display text-xl lg:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <Zap className="text-amber-400" size={24} />
              Conservation of Mechanical Energy
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowTheory(!showTheory)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors border ${showTheory ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
          >
            <BookOpen size={14} /> Theory
          </button>
          <button 
            onClick={resetExperiment}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
          >
            <RefreshCw size={14} /> Reset
          </button>
          <button 
            onClick={handleSave}
            disabled={readings.length === 0 || isSaving}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors font-semibold ${readings.length === 0 || isSaving ? 'bg-emerald-500/50 cursor-not-allowed text-emerald-200' : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'}`}
          >
            <Save size={14} /> {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {showTheory && (
        <div className="mb-6 bg-slate-800/50 border border-amber-500/20 p-6 rounded-2xl backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-300">
           <h2 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
             <BookOpen size={18} /> Theory: Energy Conservation
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
              <div>
                 <p className="mb-3">The Law of Conservation of Energy states that in an isolated system, the total mechanical energy remains constant over time.</p>
                 <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 font-mono text-center mb-3">
                    E_total = K + U = ½mv² + mgh
                 </div>
                 <p>As the ball rolls down, <strong>Potential Energy (U)</strong> is converted into <strong>Kinetic Energy (K)</strong>. At any point, their sum remains constant if friction is ignored.</p>
              </div>
              <div className="space-y-2">
                 <p>• <strong>Kinetic Energy (K):</strong> Energy due to motion. K = ½mv².</p>
                 <p>• <strong>Potential Energy (U):</strong> Energy due to position. U = mgh.</p>
                 <p>• <strong>Non-Conservative Forces:</strong> Friction and air resistance convert mechanical energy into thermal energy (heat), causing the total mechanical energy to decrease.</p>
              </div>
           </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto custom-scrollbar pb-6">
        
        {/* Upper Half */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-5">
            <EnergySimulation 
              initialHeight={initialHeight}
              isFrictionEnabled={isFrictionEnabled}
              isReleased={isReleased}
              onUpdateMetrics={handleUpdateMetrics}
            />
          </div>
          <div className="lg:col-span-3">
            <EnergyControls 
              initialHeight={initialHeight} setInitialHeight={setInitialHeight}
              isFrictionEnabled={isFrictionEnabled} setIsFrictionEnabled={setIsFrictionEnabled}
              isReleased={isReleased} setIsReleased={setIsReleased}
              onReset={resetExperiment}
            />
          </div>
          <div className="lg:col-span-4 h-full">
            <EnergyGraphs history={history} />
          </div>
        </div>

        {/* Lower Half */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[350px]">
          <div className="lg:col-span-5 h-full">
             <EnergyTable 
                readings={readings} 
                onSnapshot={handleSnapshot} 
                isReleased={isReleased} 
             />
          </div>
          <div className="lg:col-span-3 h-full">
             <EnergyCalculations 
               metrics={metrics} 
               isFrictionEnabled={isFrictionEnabled} 
             />
          </div>
          <div className="lg:col-span-4 h-full">
             <EnergyQuiz />
          </div>
        </div>

      </div>
    </section>
  );
}
