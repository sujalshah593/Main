import { ListChecks, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ObservationTable({ activeFunction, params }) {

  const a = params.a;

  // Evaluate the analytical properties at point 'a'
  const getContinuityData = () => {
    let f_a, limitLeft, limitRight;

    switch (activeFunction) {
      case 'continuous':
        f_a = a * a - 4;
        limitLeft = f_a;
        limitRight = f_a;
        break;
      case 'removable':
        if (a === 2) {
          f_a = 'Undefined';
          limitLeft = 4;
          limitRight = 4;
        } else {
          f_a = a + 2;
          limitLeft = f_a;
          limitRight = f_a;
        }
        break;
      case 'jump':
        if (a === 2) {
          f_a = 2; // 4 - 2
          limitLeft = 3; // 2 + 1
          limitRight = 2; // 4 - 2
        } else if (a < 2) {
          f_a = a + 1;
          limitLeft = f_a;
          limitRight = f_a;
        } else {
          f_a = 4 - a;
          limitLeft = f_a;
          limitRight = f_a;
        }
        break;
      case 'infinite':
        if (a === 2) {
          f_a = 'Undefined';
          limitLeft = '+∞';
          limitRight = '+∞';
        } else {
          f_a = 1 / Math.pow(a - 2, 2);
          limitLeft = f_a;
          limitRight = f_a;
        }
        break;
      default:
        f_a = 0; limitLeft = 0; limitRight = 0;
    }

    const formatVal = (v) => typeof v === 'number' ? Number(v.toFixed(2)) : v;

    f_a = formatVal(f_a);
    limitLeft = formatVal(limitLeft);
    limitRight = formatVal(limitRight);

    const limitExists = limitLeft === limitRight && limitLeft !== '+∞';
    const overallLimit = limitExists ? limitLeft : 'Does not exist';
    
    const isContinuous = limitExists && f_a === overallLimit;

    let discontinuityType = 'None';
    if (!isContinuous) {
      if (limitExists) discontinuityType = 'Removable (Hole)';
      else if (limitLeft === '+∞' || limitRight === '+∞') discontinuityType = 'Infinite (Asymptote)';
      else discontinuityType = 'Jump';
    }

    return {
      f_a,
      limitLeft,
      limitRight,
      limitExists,
      overallLimit,
      isContinuous,
      discontinuityType
    };
  };

  const data = getContinuityData();

  return (
    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-indigo-500 shadow-xl overflow-hidden flex flex-col h-full">
      <h3 className="text-lg font-display font-bold text-white mb-4 flex items-center gap-2">
        <ListChecks className="text-indigo-400" size={20} />
        Continuity Analysis at x = {a.toFixed(1)}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Step 1: Function Value */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-lab-muted font-bold uppercase tracking-wider mb-1">Step 1: Function Value</p>
          <div className="flex justify-between items-end">
            <span className="font-mono text-white text-lg">f({a.toFixed(1)}) = </span>
            <span className={`font-mono font-bold text-lg ${data.f_a === 'Undefined' ? 'text-amber-400' : 'text-emerald-400'}`}>
              {data.f_a}
            </span>
          </div>
        </div>

        {/* Step 2: Limits */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-lab-muted font-bold uppercase tracking-wider mb-2">Step 2: Limit Evaluation</p>
          <div className="flex justify-between mb-1">
            <span className="font-mono text-sm text-sky-200">Left (x → {a}⁻)</span>
            <span className="font-mono text-sm text-white">{data.limitLeft}</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2 mb-2">
            <span className="font-mono text-sm text-sky-200">Right (x → {a}⁺)</span>
            <span className="font-mono text-sm text-white">{data.limitRight}</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="font-mono text-sm font-bold text-white">Overall Limit:</span>
            <span className={`font-mono font-bold text-sm ${data.limitExists ? 'text-emerald-400' : 'text-amber-400'}`}>
              {data.overallLimit}
            </span>
          </div>
        </div>
      </div>

      {/* Conclusion */}
      <div className={`mt-auto p-5 rounded-xl border flex items-center justify-between ${
        data.isContinuous 
          ? 'bg-emerald-500/10 border-emerald-500/30' 
          : 'bg-amber-500/10 border-amber-500/30'
      }`}>
        <div>
          <h4 className={`font-bold text-lg flex items-center gap-2 ${data.isContinuous ? 'text-emerald-400' : 'text-amber-400'}`}>
            {data.isContinuous ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
            {data.isContinuous ? 'Continuous' : 'Discontinuous'}
          </h4>
          {!data.isContinuous && (
            <p className="text-sm text-amber-200/70 mt-1">
              Type: <strong className="text-amber-300">{data.discontinuityType}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
