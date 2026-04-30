import { FileText, Sigma, Scale, Target } from 'lucide-react';

export default function ScrewGaugeLearningPanel() {
  return (
    <div className="glass-panel p-6 rounded-2xl shadow-lg h-full overflow-y-auto custom-scrollbar flex flex-col gap-8">
      
      {/* Aim */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold text-lab-accent2 uppercase tracking-wider mb-3">
          <Target size={18} /> Aim
        </h3>
        <p className="text-sm text-lab-muted leading-relaxed">
          To measure the diameter of a given wire or thickness of a given sheet using a micrometer screw gauge and understand its least count and zero error.
        </p>
      </div>

      {/* Theory */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold text-lab-accent uppercase tracking-wider mb-3">
          <FileText size={18} /> Theory
        </h3>
        <p className="text-sm text-lab-muted leading-relaxed mb-4">
          A micrometer screw gauge is used to measure small dimensions accurately. It operates on the principle that the linear distance moved by the screw is directly proportional to its rotation.
        </p>
        
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-lab-muted mb-4">
          <div className="font-semibold text-white mb-2">Pitch</div>
          <p>The linear distance covered by the screw in one complete rotation is called the pitch.</p>
          <div className="bg-black/30 p-2 rounded-lg font-mono text-xs text-sky-300 mt-2">
            Pitch = 1 mm (standard)
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-lab-muted">
          <div className="font-semibold text-white mb-2">Least Count (LC)</div>
          <p className="mb-2">The smallest value that can be measured by the screw gauge.</p>
          <div className="bg-black/30 p-3 rounded-lg font-mono text-xs text-lab-accent2 mb-2">
            LC = Pitch / Total Divisions on Circular Scale
          </div>
          <p>For a standard screw gauge: Pitch = 1mm, Total Circular Divisions = 100.<br/>
          LC = 1mm / 100 = <span className="text-white font-bold">0.01 mm</span></p>
        </div>
      </div>

      {/* Formula */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold text-sky-400 uppercase tracking-wider mb-3">
          <Sigma size={18} /> Formula
        </h3>
        <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-4 text-sm">
          <p className="text-lab-muted mb-3">The final measurement is calculated using:</p>
          <div className="text-center font-bold text-white mb-3 text-base">
            Final Reading = PSR + (CSR × LC) - Zero Error
          </div>
          <ul className="text-xs text-lab-muted space-y-1">
            <li><span className="text-sky-400 font-semibold">PSR:</span> Pitch Scale Reading (linear scale on the barrel)</li>
            <li><span className="text-sky-400 font-semibold">CSR:</span> Circular Scale Reading (division coinciding with reference line)</li>
            <li><span className="text-sky-400 font-semibold">LC:</span> Least Count (0.01 mm)</li>
          </ul>
        </div>
      </div>

      {/* Zero Error */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
          <Scale size={18} /> Zero Error
        </h3>
        <p className="text-sm text-lab-muted leading-relaxed mb-3">
          When the stud and spindle touch, if the zero of the circular scale does not align with the reference line of the pitch scale, the instrument has a zero error.
        </p>
        <ul className="list-disc pl-5 text-sm text-lab-muted space-y-2">
          <li><strong className="text-amber-200">Positive Zero Error:</strong> Circular zero is below the reference line. (Correction is negative)</li>
          <li><strong className="text-amber-200">Negative Zero Error:</strong> Circular zero is above the reference line. (Correction is positive)</li>
        </ul>
      </div>

      {/* Procedure */}
      <div className="pb-4">
        <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3">
          <FileText size={18} /> Procedure
        </h3>
        <ol className="list-decimal pl-5 text-sm text-lab-muted space-y-2">
          <li>Select an object from the instrument controls.</li>
          <li>Check for any Zero Error by closing the spindle completely.</li>
          <li>Drag the thimble horizontally to rotate it and open the gap.</li>
          <li>Place the object between the stud and spindle, then close it firmly.</li>
          <li>Note the Pitch Scale Reading (PSR).</li>
          <li>Find the Circular Scale Reading (CSR).</li>
          <li>Click 'Record Reading' to add it to your observation table.</li>
        </ol>
      </div>

    </div>
  );
}
