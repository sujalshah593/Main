import { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function ScrewGaugeObservationTable({ thimblePosition, selectedObject, zeroError, mode }) {
  const [observations, setObservations] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins for test mode
  
  // To avoid calculating values constantly if the user hasn't pressed "Record"
  const psr = Math.floor(thimblePosition);
  const csr = Math.round((thimblePosition % 1) * 100);
  const leastCount = 0.01; // mm
  const measuredValue = psr + (csr * leastCount);
  const finalReading = parseFloat((measuredValue - zeroError).toFixed(2));
  const trueValue = selectedObject?.value || 0;

  useEffect(() => {
    let timer;
    if (mode === 'test' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [mode, timeLeft]);

  // Reset observations when mode changes
  useEffect(() => {
    if (mode === 'test') {
      setObservations([]);
      setScore(0);
      setTimeLeft(300);
    }
  }, [mode]);

  const handleRecord = () => {
    // 0.02 mm tolerance
    const isCorrect = Math.abs(finalReading - trueValue) <= 0.02; 
    
    const newObs = {
      id: Date.now(),
      object: selectedObject?.name,
      psr: psr,
      csr: csr,
      measured: measuredValue,
      zeroError: zeroError,
      final: finalReading,
      correct: isCorrect,
      trueValue: trueValue
    };

    setObservations(prev => [newObs, ...prev]);

    if (mode === 'test' && isCorrect) {
      setScore(s => s + 10);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="glass-panel p-6 rounded-2xl shadow-xl flex-1 flex flex-col min-h-[300px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
          <BookOpen size={18} className="text-lab-accent2" />
          Observation Table
        </h3>

        {mode === 'test' && (
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-1.5 text-rose-400 font-mono text-sm bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
               <Clock size={14} /> {formatTime(timeLeft)}
             </div>
             <div className="text-sm font-bold text-emerald-400">
               Score: {score}
             </div>
          </div>
        )}
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
        <div className="text-sm text-lab-muted">
          Current Object: <span className="text-white font-semibold">{selectedObject?.name}</span>
        </div>
        <button 
          onClick={handleRecord}
          disabled={mode === 'test' && timeLeft === 0}
          className="bg-lab-accent2 text-[#0f172a] font-bold text-sm px-6 py-2 rounded-lg hover:bg-lab-accent2/90 transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Record Reading
        </button>
      </div>

      <div className="flex-1 overflow-x-auto rounded-xl border border-white/10 bg-black/20 custom-scrollbar">
        <table className="w-full text-left text-sm text-lab-muted">
          <thead className="bg-white/5 text-xs uppercase text-white font-semibold border-b border-white/10 sticky top-0">
            <tr>
              <th className="px-4 py-3">Object</th>
              <th className="px-4 py-3">PSR (mm)</th>
              <th className="px-4 py-3">CSR (div)</th>
              <th className="px-4 py-3 hidden sm:table-cell">Measured (mm)</th>
              <th className="px-4 py-3 hidden md:table-cell">ZE (mm)</th>
              <th className="px-4 py-3 text-lab-accent2 font-bold">Final (mm)</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {observations.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-lab-muted/50">
                  No observations recorded yet. Rotate the thimble and click 'Record Reading'.
                </td>
              </tr>
            ) : (
              observations.map((obs) => (
                <tr key={obs.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 font-medium text-white">{obs.object}</td>
                  <td className="px-4 py-3">{obs.psr}</td>
                  <td className="px-4 py-3">{obs.csr}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">{obs.measured.toFixed(2)}</td>
                  <td className="px-4 py-3 hidden md:table-cell">{obs.zeroError > 0 ? `+${obs.zeroError}` : obs.zeroError}</td>
                  <td className="px-4 py-3 text-white font-mono">{obs.final.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    {mode === 'test' ? (
                      obs.correct ? (
                        <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold"><CheckCircle size={14}/> Correct</span>
                      ) : (
                        <span className="flex items-center gap-1 text-rose-400 text-xs font-bold"><XCircle size={14}/> Incorrect</span>
                      )
                    ) : (
                      <span className="text-xs text-lab-muted">Recorded</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
