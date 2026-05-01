import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings2, RotateCcw, Save, Shuffle, Box, Grid } from 'lucide-react';

const VECTOR_TYPES = [
  { id: '2d_vector', name: '2D Vector' },
  { id: '3d_vector', name: '3D Vector' },
  { id: 'row_vector', name: 'Row Vector' },
  { id: 'column_vector', name: 'Col Vector' },
];

const MATRIX_TYPES = [
  { id: 'square_matrix', name: 'Square' },
  { id: 'rectangular_matrix', name: 'Rectangular' },
  { id: 'identity_matrix', name: 'Identity' },
  { id: 'zero_matrix', name: 'Zero' },
  { id: 'diagonal_matrix', name: 'Diagonal' },
];

const VECTOR_OPS = [
  { id: 'none', name: 'None (Visualize)' },
  { id: 'add', name: 'Addition (A + B)' },
  { id: 'sub', name: 'Subtraction (A - B)' },
  { id: 'dot', name: 'Dot Product (A • B)' },
  { id: 'cross', name: 'Cross Product (A × B)' },
  { id: 'mag', name: 'Magnitude (|A|)' },
  { id: 'norm', name: 'Normalize (Â)' },
];

const MATRIX_OPS = [
  { id: 'none', name: 'None (Visualize)' },
  { id: 'add', name: 'Addition (A + B)' },
  { id: 'sub', name: 'Subtraction (A - B)' },
  { id: 'mul', name: 'Multiplication (A × B)' },
  { id: 'transpose', name: 'Transpose (Aᵀ)' },
  { id: 'det', name: 'Determinant (|A|)' },
  { id: 'inv', name: 'Inverse (A⁻¹)' },
  { id: 'trace', name: 'Trace (Tr(A))' },
];

// Helper to create empty matrix
const createMatrix = (rows, cols, fill = 0) => Array(rows).fill().map(() => Array(cols).fill(fill));

export default function VectorsControls({
  activeMode,
  setActiveMode,
  entityType,
  setEntityType,
  entityA,
  setEntityA,
  entityB,
  setEntityB,
  operation,
  setOperation,
  resetSimulator,
  addObservation
}) {
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);

  // Update dimensions when type changes
  useEffect(() => {
    let r = rows;
    let c = cols;
    if (entityType === '2d_vector') { r = 2; c = 1; }
    else if (entityType === '3d_vector') { r = 3; c = 1; }
    else if (entityType === 'row_vector') { r = 1; c = Math.max(2, cols); }
    else if (entityType === 'column_vector') { r = Math.max(2, rows); c = 1; }
    else if (entityType === 'square_matrix' || entityType === 'identity_matrix' || entityType === 'diagonal_matrix') {
      r = Math.max(2, rows); c = r;
    }
    // Rectangular / Zero can be anything
    
    setRows(r);
    setCols(c);
    
    // Auto-generate matrices based on type
    let newA = createMatrix(r, c, 0);
    let newB = createMatrix(r, c, 0);

    if (entityType === 'identity_matrix') {
      for (let i = 0; i < Math.min(r, c); i++) newA[i][i] = 1;
    } else {
      // Preserve existing data where possible
      for (let i = 0; i < Math.min(r, entityA.length); i++) {
        for (let j = 0; j < Math.min(c, entityA[0].length); j++) {
          newA[i][j] = entityA[i][j] || 0;
        }
      }
    }
    
    // Setup B for operations that need it
    if (['add', 'sub', 'dot', 'cross', 'mul'].includes(operation)) {
      let bR = r; let bC = c;
      if (operation === 'mul' && activeMode === 'matrix') {
        // For A * B, B needs to have 'c' rows. Let's make B square for simplicity if A is square, or c x c.
        bR = c; bC = c;
      }
      newB = createMatrix(bR, bC, 0);
      for (let i = 0; i < Math.min(bR, entityB.length); i++) {
        for (let j = 0; j < Math.min(bC, entityB[0].length); j++) {
          newB[i][j] = entityB[i][j] || 0;
        }
      }
      setEntityB(newB);
    }
    
    setEntityA(newA);
  }, [entityType, rows, cols, activeMode]); // Intentionally left operation out to avoid infinite loops, handled below

  // When operation changes, fix B dimensions
  useEffect(() => {
    if (['add', 'sub', 'dot', 'cross'].includes(operation)) {
      setEntityB(createMatrix(entityA.length, entityA[0].length, 0));
    } else if (operation === 'mul') {
      setEntityB(createMatrix(entityA[0].length, entityA[0].length, 0)); // simple square B to match A's cols
    }
  }, [operation]);

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
    const newA = createMatrix(entityA.length, entityA[0].length, 0).map(row => row.map(() => rand()));
    
    if (entityType === 'identity_matrix') {
       // do nothing to A
    } else if (entityType === 'diagonal_matrix') {
       for(let i=0; i<newA.length; i++) {
         for(let j=0; j<newA[0].length; j++) {
           if(i !== j) newA[i][j] = 0;
         }
       }
       setEntityA(newA);
    } else if (entityType !== 'zero_matrix') {
      setEntityA(newA);
    }

    if (['add', 'sub', 'dot', 'cross', 'mul'].includes(operation)) {
      const newB = createMatrix(entityB.length, entityB[0].length, 0).map(row => row.map(() => rand()));
      setEntityB(newB);
    }
  };

  const formatMatrixString = (mat) => {
    return `[${mat.map(r => `[${r.join(',')}]`).join(',')}]`;
  };

  const handleRecord = () => {
    addObservation({
      type: entityType.replace('_', ' '),
      dimensions: `${entityA.length}x${entityA[0].length}`,
      inputs: `A=${formatMatrixString(entityA)} ${['add', 'sub', 'dot', 'cross', 'mul'].includes(operation) ? `B=${formatMatrixString(entityB)}` : ''}`,
      operation: operation,
      result: 'See visualization' // Or calculate it here if needed
    });
  };

  const isBinaryOp = ['add', 'sub', 'dot', 'cross', 'mul'].includes(operation);
  
  // Render a matrix input grid
  const renderGrid = (entity, isA) => {
    if (!entity || entity.length === 0) return null;
    return (
      <div className="flex flex-col items-center p-3 bg-white/5 border border-white/10 rounded-xl">
        <span className="text-xs font-bold text-lab-muted mb-2">{isA ? 'Entity A' : 'Entity B'}</span>
        <div 
          className="grid gap-1" 
          style={{ gridTemplateColumns: `repeat(${entity[0].length}, minmax(0, 1fr))` }}
        >
          {entity.map((row, i) => (
            row.map((val, j) => {
              const isDisabled = (isA && entityType === 'identity_matrix') || 
                                 (isA && entityType === 'zero_matrix') ||
                                 (isA && entityType === 'diagonal_matrix' && i !== j);
              return (
                <input
                  key={`${i}-${j}`}
                  type="number"
                  value={isDisabled ? val : (val === 0 && !isDisabled ? '' : val)}
                  onChange={(e) => handleCellChange(isA, i, j, e.target.value)}
                  disabled={isDisabled}
                  placeholder="0"
                  className={`w-12 h-10 text-center text-sm font-mono rounded bg-black/40 border border-white/10 focus:border-emerald-400 focus:outline-none ${isDisabled ? 'text-lab-muted/50 cursor-not-allowed' : 'text-emerald-300'}`}
                />
              );
            })
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border-t-2 border-t-emerald-400/50 relative shadow-xl">
      <div className="flex items-center gap-2 mb-4 text-emerald-400">
        <Settings2 size={20} />
        <h2 className="font-bold text-lg text-white">Simulator Controls</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Col: Mode, Type, Dimensions */}
        <div className="space-y-4">
          
          {/* Mode Switcher */}
          <div className="flex bg-white/5 p-1 rounded-xl">
            <button
              onClick={() => { setActiveMode('vector'); setEntityType('2d_vector'); setOperation('none'); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                activeMode === 'vector' ? 'bg-emerald-500/20 text-emerald-400 shadow' : 'text-lab-muted hover:text-white'
              }`}
            >
              <Box size={16} /> Vector
            </button>
            <button
              onClick={() => { setActiveMode('matrix'); setEntityType('square_matrix'); setOperation('none'); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${
                activeMode === 'matrix' ? 'bg-emerald-500/20 text-emerald-400 shadow' : 'text-lab-muted hover:text-white'
              }`}
            >
              <Grid size={16} /> Matrix
            </button>
          </div>

          {/* Type Select */}
          <div className="flex flex-wrap gap-2">
            {(activeMode === 'vector' ? VECTOR_TYPES : MATRIX_TYPES).map((t) => (
              <button
                key={t.id}
                onClick={() => setEntityType(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  entityType === t.id 
                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.2)]" 
                  : "bg-white/5 border-white/10 text-lab-muted hover:bg-white/10 hover:text-white"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Dimension Sliders */}
          <div className="flex gap-4">
            {(!['2d_vector', '3d_vector', 'row_vector'].includes(entityType)) && (
              <div className="flex-1 space-y-1">
                <label className="text-xs text-lab-muted font-bold uppercase">Rows (M)</label>
                <input
                  type="range" min="1" max="5" value={rows}
                  onChange={(e) => setRows(parseInt(e.target.value))}
                  disabled={entityType === 'square_matrix' || entityType === 'identity_matrix' || entityType === 'diagonal_matrix'}
                  className="w-full accent-emerald-500 disabled:opacity-50"
                />
              </div>
            )}
            {(!['2d_vector', '3d_vector', 'column_vector'].includes(entityType)) && (
              <div className="flex-1 space-y-1">
                <label className="text-xs text-lab-muted font-bold uppercase">Cols (N)</label>
                <input
                  type="range" min="1" max="5" value={cols}
                  onChange={(e) => {
                    const c = parseInt(e.target.value);
                    setCols(c);
                    if (entityType === 'square_matrix' || entityType === 'identity_matrix' || entityType === 'diagonal_matrix') setRows(c);
                  }}
                  className="w-full accent-emerald-500"
                />
              </div>
            )}
          </div>

          {/* Operation Select */}
          <div className="space-y-1">
             <label className="text-xs text-lab-muted font-bold uppercase">Operation</label>
             <select 
               value={operation} 
               onChange={(e) => setOperation(e.target.value)}
               className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-sm text-emerald-300 focus:border-emerald-500 focus:outline-none"
             >
               {(activeMode === 'vector' ? VECTOR_OPS : MATRIX_OPS).map(op => (
                 <option key={op.id} value={op.id}>{op.name}</option>
               ))}
             </select>
          </div>

        </div>

        {/* Right Col: Data Input & Actions */}
        <div className="space-y-4">
          
          <div className="flex flex-wrap gap-4 items-start justify-center min-h-[160px] max-h-[220px] overflow-y-auto custom-scrollbar p-2">
            {renderGrid(entityA, true)}
            {isBinaryOp && (
              <div className="flex flex-col justify-center h-full text-lab-muted font-bold text-xl mt-8">
                {operation === 'add' ? '+' : operation === 'sub' ? '-' : operation === 'mul' ? '×' : operation === 'dot' ? '•' : '×'}
              </div>
            )}
            {isBinaryOp && renderGrid(entityB, false)}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleRandomize}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-colors border border-white/10"
            >
              <Shuffle size={14} /> Random
            </button>
            <button
              onClick={handleRecord}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-xl text-sm font-bold transition-all border border-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.15)]"
            >
              <Save size={14} /> Record
            </button>
            <button
              onClick={resetSimulator}
              className="px-3 py-2 bg-white/5 hover:bg-red-500/20 text-lab-muted hover:text-red-400 rounded-xl text-sm font-semibold transition-colors border border-white/10 hover:border-red-500/30"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
