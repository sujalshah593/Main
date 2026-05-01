import { useState, useEffect } from 'react';
import { Settings2, RotateCcw, Save, Shuffle, Grid, Superscript } from 'lucide-react';

const MATRIX_TYPES = [
  { id: 'square_matrix', name: 'Square' },
  { id: 'rectangular_matrix', name: 'Rectangular' },
  { id: 'identity_matrix', name: 'Identity' },
  { id: 'zero_matrix', name: 'Zero' },
  { id: 'diagonal_matrix', name: 'Diagonal' },
];

const MATRIX_OPS = [
  { id: 'none', name: 'None (Visualize)' },
  { id: 'add', name: 'Addition (A + B)' },
  { id: 'sub', name: 'Subtraction (A - B)' },
  { id: 'scalar', name: 'Scalar Mul (k * A)' },
  { id: 'mul', name: 'Multiplication (A × B)' },
  { id: 'transpose', name: 'Transpose (Aᵀ)' },
  { id: 'det', name: 'Determinant (|A|)' },
  { id: 'inv', name: 'Inverse (A⁻¹)' },
  { id: 'trace', name: 'Trace (Tr(A))' },
  { id: 'rank', name: 'Rank' },
  { id: 'cofactor', name: 'Cofactor Matrix' },
  { id: 'adjoint', name: 'Adjoint Matrix' }
];

const EQ_METHODS = [
  { id: 'substitution', name: 'Substitution (Text trace)' },
  { id: 'elimination', name: 'Elimination (Text trace)' },
  { id: 'inverse', name: 'Matrix Inverse (X = A⁻¹B)' },
  { id: 'gaussian', name: 'Gaussian Elimination' },
  { id: 'cramer', name: 'Cramer\'s Rule' }
];

const createMatrix = (rows, cols, fill = 0) => Array(rows).fill().map(() => Array(cols).fill(fill));

export default function MatrixEqControls({
  activeMode,
  setActiveMode,
  matrixType,
  setMatrixType,
  operation,
  setOperation,
  solveMethod,
  setSolveMethod,
  systemSize,
  setSystemSize,
  entityA,
  setEntityA,
  entityB,
  setEntityB,
  scalarVal,
  setScalarVal,
  resetSimulator,
  addObservation
}) {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);

  // Sync dimensions when mode or type changes
  useEffect(() => {
    if (activeMode === 'equation_solver') {
      const s = systemSize;
      const newA = createMatrix(s, s, 0);
      const newB = createMatrix(s, 1, 0);
      // Preserve old values
      for (let i = 0; i < Math.min(s, entityA.length); i++) {
        for (let j = 0; j < Math.min(s, entityA[0].length); j++) {
          newA[i][j] = entityA[i][j] || 0;
        }
        if (entityB[i] && entityB[i][0] !== undefined) {
          newB[i][0] = entityB[i][0];
        }
      }
      setEntityA(newA);
      setEntityB(newB);
    } else {
      let r = rows;
      let c = cols;
      if (['square_matrix', 'identity_matrix', 'diagonal_matrix'].includes(matrixType)) {
        r = Math.max(2, rows); c = r;
      }
      setRows(r);
      setCols(c);
      
      let newA = createMatrix(r, c, 0);
      if (matrixType === 'identity_matrix') {
        for (let i = 0; i < Math.min(r, c); i++) newA[i][i] = 1;
      } else {
        for (let i = 0; i < Math.min(r, entityA.length); i++) {
          for (let j = 0; j < Math.min(c, entityA[0].length); j++) {
            newA[i][j] = entityA[i][j] || 0;
          }
        }
      }
      
      if (['add', 'sub', 'mul'].includes(operation)) {
        let bR = r; let bC = c;
        if (operation === 'mul') { bR = c; bC = c; } // Keep B square for simplicity if A is not square
        let newB = createMatrix(bR, bC, 0);
        for (let i = 0; i < Math.min(bR, entityB.length); i++) {
          for (let j = 0; j < Math.min(bC, entityB[0].length); j++) {
            newB[i][j] = entityB[i][j] || 0;
          }
        }
        setEntityB(newB);
      }
      
      setEntityA(newA);
    }
  }, [activeMode, matrixType, operation, systemSize, rows, cols]);

  const handleCellChange = (isA, rIdx, cIdx, val) => {
    const num = parseFloat(val) || 0;
    if (isA) {
      const newA = [...entityA];
      newA[rIdx] = [...newA[rIdx]];
      newA[rIdx][cIdx] = num;
      setEntityA(newA);
    } else {
      const newB = [...entityB];
      newB[rIdx] = [...newB[rIdx]];
      newB[rIdx][cIdx] = num;
      setEntityB(newB);
    }
  };

  const handleRandomize = () => {
    const rand = () => Math.floor(Math.random() * 20 - 10);
    
    if (activeMode === 'matrix_ops') {
      const newA = createMatrix(entityA.length, entityA[0].length, 0).map(row => row.map(() => rand()));
      if (matrixType === 'diagonal_matrix') {
        for(let i=0; i<newA.length; i++) {
          for(let j=0; j<newA[0].length; j++) {
            if(i !== j) newA[i][j] = 0;
          }
        }
        setEntityA(newA);
      } else if (matrixType !== 'zero_matrix' && matrixType !== 'identity_matrix') {
        setEntityA(newA);
      }
      
      if (['add', 'sub', 'mul'].includes(operation)) {
        setEntityB(createMatrix(entityB.length, entityB[0].length, 0).map(row => row.map(() => rand())));
      }
      if (operation === 'scalar') setScalarVal(rand());
    } else {
      setEntityA(createMatrix(systemSize, systemSize, 0).map(row => row.map(() => rand())));
      setEntityB(createMatrix(systemSize, 1, 0).map(row => [rand()]));
    }
  };

  const formatMatrixString = (mat) => `[${mat.map(r => `[${r.join(',')}]`).join(',')}]`;

  const handleRecord = () => {
    addObservation({
      input: activeMode === 'matrix_ops' 
        ? `A=${formatMatrixString(entityA)} ${['add', 'sub', 'mul'].includes(operation) ? `B=${formatMatrixString(entityB)}` : ''}`
        : `A=${formatMatrixString(entityA)}, B=${formatMatrixString(entityB)}`,
      method: activeMode === 'matrix_ops' ? operation : solveMethod,
      steps: "View simulator for details",
      result: "Logged in UI",
      remarks: activeMode === 'equation_solver' ? `${systemSize} variables` : `${entityA.length}x${entityA[0].length}`
    });
  };

  const renderMatrixGrid = (entity, isA) => {
    if (!entity || entity.length === 0) return null;
    return (
      <div className="flex flex-col items-center p-3 bg-white/5 border border-white/10 rounded-xl">
        <span className="text-xs font-bold text-lab-muted mb-2">{isA ? 'Matrix A' : 'Matrix B'}</span>
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${entity[0].length}, minmax(0, 1fr))` }}>
          {entity.map((row, i) => row.map((val, j) => {
            const isDisabled = activeMode === 'matrix_ops' && isA && (
              matrixType === 'identity_matrix' || 
              matrixType === 'zero_matrix' || 
              (matrixType === 'diagonal_matrix' && i !== j)
            );
            return (
              <input
                key={`${i}-${j}`}
                type="number"
                value={isDisabled ? val : (val === 0 && !isDisabled ? '' : val)}
                onChange={(e) => handleCellChange(isA, i, j, e.target.value)}
                disabled={isDisabled}
                placeholder="0"
                className={`w-12 h-10 text-center text-sm font-mono rounded bg-black/40 border border-white/10 focus:border-pink-400 focus:outline-none ${isDisabled ? 'text-lab-muted/50 cursor-not-allowed' : 'text-pink-300'}`}
              />
            );
          }))}
        </div>
      </div>
    );
  };

  const renderEquationInputs = () => {
    const vars = ['x', 'y', 'z', 'w', 'v'];
    return (
      <div className="flex flex-col items-center p-4 bg-white/5 border border-white/10 rounded-xl w-full">
        <span className="text-xs font-bold text-lab-muted mb-4 uppercase tracking-widest">System of Equations</span>
        <div className="flex flex-col gap-3 w-full max-w-md">
          {entityA.map((row, i) => (
            <div key={i} className="flex items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-1 flex-wrap flex-1 justify-end">
                {row.map((val, j) => (
                  <div key={j} className="flex items-center whitespace-nowrap">
                    <input
                      type="number"
                      value={val === 0 ? '' : val}
                      onChange={(e) => handleCellChange(true, i, j, e.target.value)}
                      placeholder="0"
                      className="w-12 h-8 text-center text-sm font-mono rounded bg-black/40 border border-white/10 focus:border-pink-400 text-pink-300"
                    />
                    <span className="text-white font-mono ml-1 mr-2">{vars[j]}{j < row.length - 1 ? ' +' : ''}</span>
                  </div>
                ))}
              </div>
              <span className="text-white font-bold mx-2">=</span>
              <input
                type="number"
                value={entityB[i] && entityB[i][0] === 0 ? '' : entityB[i][0]}
                onChange={(e) => handleCellChange(false, i, 0, e.target.value)}
                placeholder="0"
                className="w-14 h-8 text-center text-sm font-mono rounded bg-black/40 border border-white/10 focus:border-sky-400 text-sky-300"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border-t-2 border-t-pink-500/50 relative shadow-xl">
      <div className="flex items-center gap-2 mb-4 text-pink-400">
        <Settings2 size={20} />
        <h2 className="font-bold text-lg text-white">Lab Controls</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Configuration */}
        <div className="space-y-4">
          <div className="flex bg-white/5 p-1 rounded-xl">
            <button
              onClick={() => { setActiveMode('matrix_ops'); setOperation('none'); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                activeMode === 'matrix_ops' ? 'bg-pink-500/20 text-pink-400 shadow' : 'text-lab-muted hover:text-white'
              }`}
            >
              <Grid size={16} /> Matrix Ops
            </button>
            <button
              onClick={() => { setActiveMode('equation_solver'); setSolveMethod('cramer'); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                activeMode === 'equation_solver' ? 'bg-pink-500/20 text-pink-400 shadow' : 'text-lab-muted hover:text-white'
              }`}
            >
              <Superscript size={16} /> Eq Solver
            </button>
          </div>

          {activeMode === 'matrix_ops' ? (
            <>
              <div className="flex flex-wrap gap-2">
                {MATRIX_TYPES.map((t) => (
                  <button key={t.id} onClick={() => setMatrixType(t.id)} className={`px-2 py-1 rounded-lg text-xs font-medium border transition-all ${matrixType === t.id ? "bg-pink-500/20 border-pink-500/50 text-pink-300" : "bg-white/5 border-white/10 text-lab-muted"}`}>
                    {t.name}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs text-lab-muted font-bold uppercase">Rows</label>
                  <input type="range" min="1" max="5" value={rows} onChange={(e) => setRows(parseInt(e.target.value))} disabled={['square_matrix', 'identity_matrix', 'diagonal_matrix'].includes(matrixType)} className="w-full accent-pink-500 disabled:opacity-50" />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-lab-muted font-bold uppercase">Cols</label>
                  <input type="range" min="1" max="5" value={cols} onChange={(e) => {
                      const c = parseInt(e.target.value);
                      setCols(c);
                      if (['square_matrix', 'identity_matrix', 'diagonal_matrix'].includes(matrixType)) setRows(c);
                    }} className="w-full accent-pink-500" />
                </div>
              </div>
              <div>
                 <label className="text-xs text-lab-muted font-bold uppercase block mb-1">Operation</label>
                 <select value={operation} onChange={(e) => setOperation(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-sm text-pink-300 focus:outline-none">
                   {MATRIX_OPS.map(op => <option key={op.id} value={op.id}>{op.name}</option>)}
                 </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs text-lab-muted font-bold uppercase block mb-1">Variables / Equations</label>
                <input type="range" min="2" max="5" value={systemSize} onChange={(e) => setSystemSize(parseInt(e.target.value))} className="w-full accent-pink-500" />
                <div className="text-right text-xs text-pink-300 font-bold">{systemSize} Variables</div>
              </div>
              <div>
                 <label className="text-xs text-lab-muted font-bold uppercase block mb-1">Solving Method</label>
                 <select value={solveMethod} onChange={(e) => setSolveMethod(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-sm text-pink-300 focus:outline-none">
                   {EQ_METHODS.map(m => <option key={m.id} value={m.id} disabled={(m.id === 'substitution' || m.id === 'elimination') && systemSize > 2}>{m.name}</option>)}
                 </select>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Inputs & Actions */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 justify-center items-center max-h-[220px] overflow-y-auto custom-scrollbar">
            {activeMode === 'matrix_ops' ? (
              <>
                {operation === 'scalar' && (
                  <div className="flex flex-col items-center p-3 bg-white/5 border border-white/10 rounded-xl">
                    <span className="text-xs font-bold text-lab-muted mb-2">Scalar (k)</span>
                    <input type="number" value={scalarVal} onChange={e => setScalarVal(parseFloat(e.target.value)||0)} className="w-16 h-10 text-center font-mono rounded bg-black/40 border border-white/10 focus:border-pink-400 text-pink-300" />
                  </div>
                )}
                {renderMatrixGrid(entityA, true)}
                {['add', 'sub', 'mul'].includes(operation) && renderMatrixGrid(entityB, false)}
              </>
            ) : (
              renderEquationInputs()
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={handleRandomize} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-colors border border-white/10">
              <Shuffle size={14} /> Random
            </button>
            <button onClick={handleRecord} className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 rounded-xl text-sm font-bold transition-all border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
              <Save size={14} /> Record
            </button>
            <button onClick={resetSimulator} className="px-3 py-2 bg-white/5 hover:bg-red-500/20 text-lab-muted hover:text-red-400 rounded-xl text-sm font-semibold transition-colors border border-white/10 hover:border-red-500/30">
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
