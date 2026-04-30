import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Anchor, Save, RefreshCw, BookOpen } from 'lucide-react';

import SpringSimulation from '../components/spring/SpringSimulation';
import SpringControls from '../components/spring/SpringControls';
import SpringTable from '../components/spring/SpringTable';
import SpringGraphs from '../components/spring/SpringGraphs';
import SpringCalculations from '../components/spring/SpringCalculations';
import SpringQuiz from '../components/spring/SpringQuiz';
import { saveSpringAttempt } from '../api/springApi';

export default function SpringLawPage() {
  const [mass, setMass] = useState(0); // kg
  const [springConstant, setSpringConstant] = useState(25); // N/m (Theoretical)
  const [isNoiseEnabled, setIsNoiseEnabled] = useState(false);
  const [dataPoints, setDataPoints] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showTheory, setShowTheory] = useState(false);

  const handleLogData = () => {
    const force = mass * 9.81;
    let extension = force / springConstant;
    
    // Simulate parallax/noise
    if (isNoiseEnabled) {
      extension += (Math.random() - 0.5) * 0.005;
    }

    const newPoint = {
      mass,
      force,
      extension: Math.max(0, extension)
    };

    setDataPoints(prev => [...prev, newPoint]);
  };

  const clearData = () => setDataPoints([]);

  const handleSave = async () => {
    if (dataPoints.length === 0) return;
    setIsSaving(true);
    try {
      const avgK = dataPoints.reduce((acc, p) => acc + (p.force / (p.extension || 1)), 0) / dataPoints.length;
      await saveSpringAttempt({
        springConstant_k: springConstant,
        masses: dataPoints.map(p => p.mass),
        dataPoints,
        calculatedAvgK: avgK,
        errorsApplied: {
          parallax: isNoiseEnabled,
          nonLinearity: false
        }
      });
      alert('Experiment data saved to history!');
    } catch (err) {
      console.error(err);
      alert('Failed to save data.');
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
              <Anchor className="text-sky-500 rotate-180" size={24} />
              Hooke's Law Verification
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowTheory(!showTheory)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors border ${showTheory ? 'bg-sky-500/20 border-sky-500/50 text-sky-400' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
          >
            <BookOpen size={14} /> Theory
          </button>
          <button 
            onClick={clearData}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
          >
            <RefreshCw size={14} /> Reset
          </button>
          <button 
            onClick={handleSave}
            disabled={dataPoints.length === 0 || isSaving}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors font-semibold ${dataPoints.length === 0 || isSaving ? 'bg-emerald-500/50 cursor-not-allowed text-emerald-200' : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'}`}
          >
            <Save size={14} /> {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {showTheory && (
        <div className="mb-6 bg-slate-800/50 border border-sky-500/20 p-6 rounded-2xl backdrop-blur-sm animate-in fade-in slide-in-from-top-4 duration-300">
           <h2 className="text-sky-400 font-bold mb-3 flex items-center gap-2">
             <BookOpen size={18} /> Theory: Hooke's Law
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
              <div>
                 <p className="mb-3">Hooke's Law states that the extension of an elastic object (like a spring) is directly proportional to the force applied to it, provided the limit of proportionality is not exceeded.</p>
                 <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 font-mono text-center mb-3">
                    F = k · x
                 </div>
                 <p>Where <strong>F</strong> is Force (N), <strong>k</strong> is Spring Constant (N/m), and <strong>x</strong> is Extension (m).</p>
              </div>
              <div className="space-y-2">
                 <p>• <strong>Spring Constant (k):</strong> Measure of stiffness. Defined as force per unit extension.</p>
                 <p>• <strong>Elastic Limit:</strong> The maximum extent to which a solid may be stretched without permanent alteration of size or shape.</p>
                 <p>• <strong>Restoring Force:</strong> The force that brings the spring back to its original shape.</p>
              </div>
           </div>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto custom-scrollbar pb-6">
        
        {/* Upper Half */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4">
            <SpringSimulation 
              mass={mass} 
              springConstant={springConstant}
              isNoiseEnabled={isNoiseEnabled}
            />
          </div>
          <div className="lg:col-span-3">
            <SpringControls 
              mass={mass} setMass={setMass}
              isNoiseEnabled={isNoiseEnabled} setIsNoiseEnabled={setIsNoiseEnabled}
              onLogData={handleLogData}
            />
          </div>
          <div className="lg:col-span-5 h-full">
            <SpringGraphs 
              dataPoints={dataPoints} 
              theoreticalK={springConstant}
            />
          </div>
        </div>

        {/* Lower Half */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[350px]">
          <div className="lg:col-span-4 h-full">
             <SpringTable dataPoints={dataPoints} clearData={clearData} />
          </div>
          <div className="lg:col-span-4 h-full">
             <SpringCalculations 
               dataPoints={dataPoints} 
               theoreticalK={springConstant} 
             />
          </div>
          <div className="lg:col-span-4 h-full">
             <SpringQuiz />
          </div>
        </div>

      </div>
    </section>
  );
}
