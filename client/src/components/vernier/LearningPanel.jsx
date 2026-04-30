import { FileText, Sigma, Scale, Target } from 'lucide-react';

export default function LearningPanel() {
  return (
    <div className="glass-panel p-6 rounded-2xl shadow-lg h-full overflow-y-auto custom-scrollbar flex flex-col gap-8">
      
      {/* Aim */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold text-lab-accent3 uppercase tracking-wider mb-3">
          <Target size={18} /> Aim
        </h3>
        <p className="text-sm text-lab-muted leading-relaxed">
          To measure the length, diameter, and depth of various objects using a Vernier Caliper and to understand the concept of Least Count and Zero Error.
        </p>
      </div>

      {/* Theory */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold text-lab-accent uppercase tracking-wider mb-3">
          <FileText size={18} /> Theory
        </h3>
        <p className="text-sm text-lab-muted leading-relaxed mb-4">
          A Vernier Caliper is a high-precision measurement instrument. It consists of a fixed main scale and a movable vernier scale. The difference between one main scale division (MSD) and one vernier scale division (VSD) allows for precise measurements.
        </p>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-lab-muted">
          <div className="font-semibold text-white mb-2">Least Count (LC)</div>
          <p className="mb-2">The smallest value that can be measured by the measuring instrument is called its least count.</p>
          <div className="bg-black/30 p-3 rounded-lg font-mono text-xs text-lab-accent2 mb-2">
            LC = 1 MSD - 1 VSD<br/>
            LC = (Value of 1 MSD) / (Total divisions on Vernier Scale)
          </div>
          <p>For a standard caliper: 1 MSD = 1mm, 10 VSD = 9 MSD.<br/>
          LC = 1mm / 10 = <span className="text-white font-bold">0.1 mm</span></p>
        </div>
      </div>

      {/* Formula */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold text-lab-accent2 uppercase tracking-wider mb-3">
          <Sigma size={18} /> Formula
        </h3>
        <div className="bg-lab-accent2/10 border border-lab-accent2/20 rounded-xl p-4 text-sm">
          <p className="text-lab-muted mb-3">The final reading is calculated using:</p>
          <div className="text-center font-bold text-white mb-3 text-base">
            Final Reading = MSR + (VC × LC) - Zero Error
          </div>
          <ul className="text-xs text-lab-muted space-y-1">
            <li><span className="text-lab-accent2 font-semibold">MSR:</span> Main Scale Reading (just before the 0 of vernier scale)</li>
            <li><span className="text-lab-accent2 font-semibold">VC:</span> Vernier Coincidence (the division on vernier perfectly aligning with any main scale mark)</li>
            <li><span className="text-lab-accent2 font-semibold">LC:</span> Least Count (0.1 mm)</li>
          </ul>
        </div>
      </div>

      {/* Zero Error */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
          <Scale size={18} /> Zero Error
        </h3>
        <p className="text-sm text-lab-muted leading-relaxed mb-3">
          When the jaws are fully closed, if the zero of the vernier scale does not coincide with the zero of the main scale, the instrument has a zero error.
        </p>
        <ul className="list-disc pl-5 text-sm text-lab-muted space-y-2">
          <li><strong className="text-amber-200">Positive Zero Error:</strong> Vernier zero is to the right of main scale zero. (Correction is negative)</li>
          <li><strong className="text-amber-200">Negative Zero Error:</strong> Vernier zero is to the left of main scale zero. (Correction is positive)</li>
        </ul>
      </div>

      {/* Procedure */}
      <div className="pb-4">
        <h3 className="flex items-center gap-2 text-sm font-bold text-sky-400 uppercase tracking-wider mb-3">
          <FileText size={18} /> Procedure
        </h3>
        <ol className="list-decimal pl-5 text-sm text-lab-muted space-y-2">
          <li>Select an object from the instrument controls.</li>
          <li>Check for any Zero Error by closing the jaws.</li>
          <li>Drag the thumb wheel to open the jaws and place the object between them.</li>
          <li>Close the jaws firmly but gently against the object.</li>
          <li>Note the Main Scale Reading (MSR).</li>
          <li>Find the Vernier Coincidence (VC).</li>
          <li>Click 'Record Reading' to add it to your observation table.</li>
        </ol>
      </div>

    </div>
  );
}
