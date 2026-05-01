import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { determinant, inverse, transpose, rank, cofactorMatrix, adjoint, multiply, solveInverseMethod, solveCramer, solveGaussian, solveSubstitutionText } from '../../utils/matrixMath';

const MatrixView = ({ mat, title }) => {
  if (typeof mat === 'string') return <div className="text-red-400 font-mono text-sm">{mat}</div>;
  if (typeof mat === 'number') return <div className="text-sky-300 font-mono text-xl">{mat.toFixed(2)}</div>;
  if (!mat || !mat.length) return null;

  let maxAbs = 0;
  mat.forEach(row => row.forEach(val => {
    if (Math.abs(val) > maxAbs) maxAbs = Math.abs(val);
  }));

  const getHeatmapColor = (val) => {
    if (maxAbs === 0) return 'rgba(255,255,255,0.05)';
    const intensity = Math.min(1, Math.abs(val) / maxAbs);
    if (val > 0) return `rgba(56, 189, 248, ${intensity * 0.8})`; 
    if (val < 0) return `rgba(244, 63, 94, ${intensity * 0.8})`; 
    return 'rgba(255,255,255,0.05)';
  };

  return (
    <div className="flex flex-col items-center">
      {title && <span className="text-xs font-bold text-lab-muted uppercase tracking-wider mb-2">{title}</span>}
      <div className="flex gap-1 relative">
        <div className="w-2 border-l-2 border-t-2 border-b-2 border-white/20 rounded-l-sm" />
        <div className="grid gap-1 py-1" style={{ gridTemplateColumns: `repeat(${mat[0].length}, minmax(0, 1fr))` }}>
          {mat.map((row, i) => row.map((val, j) => (
            <div key={`${i}-${j}`} className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xs sm:text-sm font-mono text-white rounded shadow-sm border border-white/5" style={{ backgroundColor: getHeatmapColor(val) }} title={`Value: ${val}`}>
              {Number.isInteger(val) ? val : val.toFixed(2)}
            </div>
          )))}
        </div>
        <div className="w-2 border-r-2 border-t-2 border-b-2 border-white/20 rounded-r-sm" />
      </div>
    </div>
  );
};

export default function MatrixEqSimulator({
  activeMode,
  operation,
  solveMethod,
  systemSize,
  entityA,
  entityB,
  scalarVal
}) {

  const renderMatrixOps = () => {
    let matrixResult = null;
    let scalarResult = null;
    let error = null;

    try {
      if (operation === 'add') matrixResult = entityA.map((r, i) => r.map((v, j) => v + entityB[i][j]));
      if (operation === 'sub') matrixResult = entityA.map((r, i) => r.map((v, j) => v - entityB[i][j]));
      if (operation === 'mul') matrixResult = multiply(entityA, entityB);
      if (operation === 'scalar') matrixResult = entityA.map(r => r.map(v => v * scalarVal));
      if (operation === 'transpose') matrixResult = transpose(entityA);
      if (operation === 'det') scalarResult = determinant(entityA);
      if (operation === 'inv') matrixResult = inverse(entityA);
      if (operation === 'trace') {
        if (entityA.length !== entityA[0].length) throw new Error("Matrix must be square");
        scalarResult = entityA.reduce((sum, row, i) => sum + row[i], 0);
      }
      if (operation === 'rank') scalarResult = rank(entityA);
      if (operation === 'cofactor') matrixResult = cofactorMatrix(entityA);
      if (operation === 'adjoint') matrixResult = adjoint(entityA);
    } catch (err) {
      error = err.message;
    }

    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 overflow-x-auto custom-scrollbar">
        {error && <div className="p-4 bg-red-500/20 text-red-300 border border-red-500/50 rounded-xl mb-6">{error}</div>}
        
        {operation === 'none' && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <MatrixView mat={entityA} title="Matrix A" />
          </motion.div>
        )}

        {operation !== 'none' && !error && (
          <div className="flex items-center gap-6 md:gap-12 min-w-max">
            {['transpose', 'det', 'inv', 'trace', 'rank', 'cofactor', 'adjoint'].includes(operation) && (
              <>
                <div className="flex items-center gap-4">
                  <span className="text-4xl text-lab-muted font-light">
                    {operation === 'transpose' ? <>(<MatrixView mat={entityA} />)<sup className="text-pink-400">T</sup></> : ''}
                    {operation === 'det' ? <>|<MatrixView mat={entityA} />|</> : ''}
                    {operation === 'inv' ? <>(<MatrixView mat={entityA} />)<sup className="text-pink-400">-1</sup></> : ''}
                    {operation === 'trace' ? <span className="flex items-center gap-2"><span className="text-pink-400 font-bold text-2xl">Tr</span>(<MatrixView mat={entityA} />)</span> : ''}
                    {operation === 'rank' ? <span className="flex items-center gap-2"><span className="text-pink-400 font-bold text-2xl">Rank</span>(<MatrixView mat={entityA} />)</span> : ''}
                    {operation === 'cofactor' ? <span className="flex items-center gap-2"><span className="text-pink-400 font-bold text-2xl">Cof</span>(<MatrixView mat={entityA} />)</span> : ''}
                    {operation === 'adjoint' ? <span className="flex items-center gap-2"><span className="text-pink-400 font-bold text-2xl">Adj</span>(<MatrixView mat={entityA} />)</span> : ''}
                  </span>
                </div>
                <span className="text-3xl text-lab-muted font-light">=</span>
                {matrixResult !== null && <MatrixView mat={matrixResult} title="Result" />}
                {scalarResult !== null && <span className="text-4xl font-mono text-pink-400">{typeof scalarResult === 'number' ? scalarResult.toFixed(2) : scalarResult}</span>}
              </>
            )}

            {['add', 'sub', 'mul'].includes(operation) && (
              <>
                <MatrixView mat={entityA} title="A" />
                <span className="text-3xl text-lab-muted font-light">{operation === 'add' ? '+' : operation === 'sub' ? '-' : '×'}</span>
                <MatrixView mat={entityB} title="B" />
                <span className="text-3xl text-lab-muted font-light">=</span>
                <MatrixView mat={matrixResult} title="Result" />
              </>
            )}

            {operation === 'scalar' && (
              <>
                <span className="text-4xl font-mono text-pink-400">{scalarVal}</span>
                <span className="text-3xl text-lab-muted font-light">×</span>
                <MatrixView mat={entityA} title="A" />
                <span className="text-3xl text-lab-muted font-light">=</span>
                <MatrixView mat={matrixResult} title="Result" />
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderEquationSolver = () => {
    let result = { solution: null, steps: [], error: null };
    
    // Check if matrix A is valid
    if (entityA.length > 0 && entityA[0].length === systemSize) {
      if (solveMethod === 'inverse') result = solveInverseMethod(entityA, entityB);
      else if (solveMethod === 'cramer') result = solveCramer(entityA, entityB);
      else if (solveMethod === 'gaussian') result = solveGaussian(entityA, entityB);
      else if (solveMethod === 'substitution' || solveMethod === 'elimination') result = solveSubstitutionText(entityA, entityB);
    }

    const render2DPlot = () => {
      if (systemSize !== 2) return null;
      const [a1, b1] = entityA[0]; const c1 = entityB[0][0];
      const [a2, b2] = entityA[1]; const c2 = entityB[1][0];

      const mapPoint = (x, y) => ({ px: 150 + x * 10, py: 150 - y * 10 });
      
      const getLinePoints = (a, b, c) => {
        if (Math.abs(b) < 1e-10) {
           const x = c / a;
           return { p1: mapPoint(x, -15), p2: mapPoint(x, 15) };
        }
        const y1 = (c - a * -15) / b;
        const y2 = (c - a * 15) / b;
        return { p1: mapPoint(-15, y1), p2: mapPoint(15, y2) };
      };

      const l1 = getLinePoints(a1, b1, c1);
      const l2 = getLinePoints(a2, b2, c2);

      let intersect = null;
      if (result.solution) intersect = mapPoint(result.solution[0][0], result.solution[1][0]);

      return (
        <div className="relative w-[300px] h-[300px] bg-[#0f172a] rounded-xl overflow-hidden border border-white/10 shrink-0 mx-auto lg:mx-0 mt-6 lg:mt-0">
          <svg width="300" height="300" viewBox="0 0 300 300">
            <line x1="0" y1="150" x2="300" y2="150" stroke="rgba(255,255,255,0.3)" />
            <line x1="150" y1="0" x2="150" y2="300" stroke="rgba(255,255,255,0.3)" />
            
            <line x1={l1.p1.px} y1={l1.p1.py} x2={l1.p2.px} y2={l1.p2.py} stroke="#ec4899" strokeWidth="2" />
            <line x1={l2.p1.px} y1={l2.p1.py} x2={l2.p2.px} y2={l2.p2.py} stroke="#38bdf8" strokeWidth="2" />
            
            {intersect && (
              <circle cx={intersect.px} cy={intersect.py} r="4" fill="#fbbf24" className="shadow-[0_0_10px_#fbbf24]" />
            )}
          </svg>
          <div className="absolute top-2 right-2 bg-black/60 p-2 rounded text-xs">
            <div className="text-pink-400">Line 1</div>
            <div className="text-sky-400">Line 2</div>
            {intersect && <div className="text-amber-400 mt-1">Intersection</div>}
          </div>
        </div>
      );
    };

    return (
      <div className="w-full h-full min-h-[400px] flex flex-col lg:flex-row gap-8 p-4 overflow-y-auto custom-scrollbar">
        
        {/* Steps Column */}
        <div className="flex-1 space-y-4">
          <h3 className="text-pink-400 font-bold uppercase tracking-wider text-sm border-b border-white/10 pb-2">Step-by-Step Solution</h3>
          
          {result.error ? (
            <div className="p-4 bg-red-500/20 text-red-300 border border-red-500/50 rounded-xl">{result.error}</div>
          ) : (
            <div className="space-y-6">
              {result.steps.map((step, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <p className="text-white/90 font-medium mb-3">{step.desc}</p>
                  {step.matrix && <div className="flex justify-center"><MatrixView mat={step.matrix} /></div>}
                </motion.div>
              ))}
              
              {result.solution && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-5 bg-pink-500/10 border border-pink-500/30 rounded-xl mt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-pink-400 font-bold uppercase tracking-wider text-sm mb-2">Final Solution</h4>
                    <div className="flex gap-4">
                      {result.solution.map((val, idx) => (
                        <div key={idx} className="bg-black/40 px-3 py-1 rounded border border-white/10">
                          <span className="text-lab-muted mr-2">x<sub>{idx+1}</sub> =</span>
                          <span className="text-white font-mono font-bold">{val[0].toFixed(4)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Visualization Column (for 2D) */}
        {render2DPlot()}
        
      </div>
    );
  };

  return (
    <div className="w-full h-full mt-10">
      {activeMode === 'matrix_ops' ? renderMatrixOps() : renderEquationSolver()}
    </div>
  );
}
