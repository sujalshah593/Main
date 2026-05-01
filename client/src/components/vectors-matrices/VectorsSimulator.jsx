import { useMemo } from 'react';
import { motion } from 'framer-motion';

// --- Math Utilities ---

const getVectorFromMatrix = (mat, is3D = false) => {
  // If it's a column vector nx1 or row vector 1xn, flatten to max 3 elements
  const flat = mat.flat();
  return [
    flat[0] || 0,
    flat[1] || 0,
    is3D ? (flat[2] || 0) : 0
  ];
};

const calcMagnitude = (v) => Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));

const calcDot = (v1, v2) => {
  const len = Math.min(v1.length, v2.length);
  let sum = 0;
  for (let i = 0; i < len; i++) sum += v1[i] * v2[i];
  return sum;
};

const calcCross = (v1, v2) => {
  // Only valid for 3D
  const x1 = v1[0] || 0; const y1 = v1[1] || 0; const z1 = v1[2] || 0;
  const x2 = v2[0] || 0; const y2 = v2[1] || 0; const z2 = v2[2] || 0;
  return [
    y1 * z2 - z1 * y2,
    z1 * x2 - x1 * z2,
    x1 * y2 - y1 * x2
  ];
};

const matrixAddSub = (A, B, isSub) => {
  if (A.length !== B.length || A[0].length !== B[0].length) return 'Dimensions mismatch';
  return A.map((row, i) => row.map((val, j) => val + (isSub ? -B[i][j] : B[i][j])));
};

const matrixMul = (A, B) => {
  if (A[0].length !== B.length) return 'Dimensions mismatch';
  const result = Array(A.length).fill().map(() => Array(B[0].length).fill(0));
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B[0].length; j++) {
      for (let k = 0; k < A[0].length; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return result;
};

const matrixTranspose = (A) => {
  return A[0].map((_, colIndex) => A.map(row => row[colIndex]));
};

const matrixDet2x2 = (A) => {
  return A[0][0] * A[1][1] - A[0][1] * A[1][0];
};

const matrixDet3x3 = (A) => {
  return A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) -
         A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) +
         A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
};

const matrixDet = (A) => {
  if (A.length !== A[0].length) return 'Not square';
  if (A.length === 1) return A[0][0];
  if (A.length === 2) return matrixDet2x2(A);
  if (A.length === 3) return matrixDet3x3(A);
  return 'Det > 3x3 not supported here';
};

const matrixTrace = (A) => {
  if (A.length !== A[0].length) return 'Not square';
  let sum = 0;
  for (let i = 0; i < A.length; i++) sum += A[i][i];
  return sum;
};

const matrixInv2x2 = (A) => {
  const det = matrixDet2x2(A);
  if (det === 0) return 'Singular matrix';
  return [
    [A[1][1]/det, -A[0][1]/det],
    [-A[1][0]/det, A[0][0]/det]
  ];
};

// --- Subcomponents ---

const MatrixView = ({ mat, title }) => {
  if (typeof mat === 'string') return <div className="text-red-400 font-mono text-sm">{mat}</div>;
  if (typeof mat === 'number') return <div className="text-emerald-300 font-mono text-xl">{mat.toFixed(2)}</div>;
  if (!mat || !mat.length) return null;

  // Find max abs value for heatmap scaling
  let maxAbs = 0;
  mat.forEach(row => row.forEach(val => {
    if (Math.abs(val) > maxAbs) maxAbs = Math.abs(val);
  }));

  const getHeatmapColor = (val) => {
    if (maxAbs === 0) return 'rgba(255,255,255,0.05)';
    const intensity = Math.min(1, Math.abs(val) / maxAbs);
    if (val > 0) return `rgba(56, 189, 248, ${intensity * 0.8})`; // Blue for positive
    if (val < 0) return `rgba(244, 63, 94, ${intensity * 0.8})`; // Red for negative
    return 'rgba(255,255,255,0.05)';
  };

  return (
    <div className="flex flex-col items-center">
      {title && <span className="text-xs font-bold text-lab-muted uppercase tracking-wider mb-2">{title}</span>}
      <div className="flex gap-1 relative">
        {/* Matrix Brackets */}
        <div className="w-2 border-l-2 border-t-2 border-b-2 border-white/20 rounded-l-sm" />
        <div 
          className="grid gap-1 py-1" 
          style={{ gridTemplateColumns: `repeat(${mat[0].length}, minmax(0, 1fr))` }}
        >
          {mat.map((row, i) => (
            row.map((val, j) => (
              <div
                key={`${i}-${j}`}
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xs sm:text-sm font-mono text-white rounded shadow-sm border border-white/5"
                style={{ backgroundColor: getHeatmapColor(val) }}
                title={`Value: ${val}`}
              >
                {Number.isInteger(val) ? val : val.toFixed(1)}
              </div>
            ))
          ))}
        </div>
        <div className="w-2 border-r-2 border-t-2 border-b-2 border-white/20 rounded-r-sm" />
      </div>
    </div>
  );
};


export default function VectorsSimulator({
  activeMode,
  entityType,
  entityA,
  entityB,
  operation
}) {

  // --- Computations ---
  const is3D = entityType === '3d_vector';
  const vA = getVectorFromMatrix(entityA, is3D);
  const vB = getVectorFromMatrix(entityB, is3D);

  let vectorResult = null;
  let matrixResult = null;
  let scalarResult = null;

  if (activeMode === 'vector') {
    if (operation === 'add') vectorResult = [vA[0] + vB[0], vA[1] + vB[1], vA[2] + vB[2]];
    if (operation === 'sub') vectorResult = [vA[0] - vB[0], vA[1] - vB[1], vA[2] - vB[2]];
    if (operation === 'dot') scalarResult = calcDot(vA, vB);
    if (operation === 'cross') vectorResult = calcCross(vA, vB);
    if (operation === 'mag') scalarResult = calcMagnitude(vA);
    if (operation === 'norm') {
      const mag = calcMagnitude(vA);
      vectorResult = mag === 0 ? [0,0,0] : [vA[0]/mag, vA[1]/mag, vA[2]/mag];
    }
  } else {
    if (operation === 'add') matrixResult = matrixAddSub(entityA, entityB, false);
    if (operation === 'sub') matrixResult = matrixAddSub(entityA, entityB, true);
    if (operation === 'mul') matrixResult = matrixMul(entityA, entityB);
    if (operation === 'transpose') matrixResult = matrixTranspose(entityA);
    if (operation === 'det') scalarResult = matrixDet(entityA);
    if (operation === 'inv') matrixResult = entityA.length === 2 ? matrixInv2x2(entityA) : 'Only 2x2 inverse supported here';
    if (operation === 'trace') scalarResult = matrixTrace(entityA);
  }

  // --- Rendering Vector SVG ---
  const renderVectorGraph = () => {
    const width = 600;
    const height = 400;
    const cx = width / 2;
    const cy = height / 2;
    const scale = 20; // pixels per unit

    // Isometric projection mapping
    const mapPoint = (x, y, z) => {
      if (!is3D) return { px: cx + x * scale, py: cy - y * scale };
      
      // Simple isometric
      // X axis goes bottom-left, Y axis goes right, Z axis goes up
      const angle = Math.PI / 6; // 30 degrees
      const px = cx + (y - x) * Math.cos(angle) * scale;
      const py = cy + (x + y) * Math.sin(angle) * scale - z * scale;
      return { px, py };
    };

    const drawAxis = (x1, y1, z1, x2, y2, z2, color, label) => {
      const p1 = mapPoint(x1, y1, z1);
      const p2 = mapPoint(x2, y2, z2);
      return (
        <g key={label}>
          <line x1={p1.px} y1={p1.py} x2={p2.px} y2={p2.py} stroke={color} strokeWidth="1" opacity="0.3" />
          <text x={p2.px + 5} y={p2.py + 5} fill={color} fontSize="12" opacity="0.5">{label}</text>
        </g>
      );
    };

    const drawArrow = (x, y, z, color, label, isResult = false, originX = 0, originY = 0, originZ = 0) => {
      const origin = mapPoint(originX, originY, originZ);
      const target = mapPoint(x + originX, y + originY, z + originZ);
      
      // Arrow head calculation
      const angle = Math.atan2(target.py - origin.py, target.px - origin.px);
      const headLen = 10;
      const h1x = target.px - headLen * Math.cos(angle - Math.PI / 6);
      const h1y = target.py - headLen * Math.sin(angle - Math.PI / 6);
      const h2x = target.px - headLen * Math.cos(angle + Math.PI / 6);
      const h2y = target.py - headLen * Math.sin(angle + Math.PI / 6);

      return (
        <g key={label}>
          <motion.line 
            initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.5 }}
            x1={origin.px} y1={origin.py} 
            x2={target.px} y2={target.py} 
            stroke={color} 
            strokeWidth={isResult ? "3" : "2"} 
            className="drop-shadow-md"
          />
          <polygon points={`${target.px},${target.py} ${h1x},${h1y} ${h2x},${h2y}`} fill={color} />
          <text x={target.px + 10} y={target.py - 10} fill={color} fontSize="14" fontWeight="bold">{label}</text>
        </g>
      );
    };

    return (
      <div className="relative w-full h-full min-h-[400px] bg-[#0f172a] rounded-xl overflow-hidden border border-white/10">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          {/* Axes */}
          {is3D ? (
            <>
              {drawAxis(-10, 0, 0, 10, 0, 0, '#ef4444', 'X')}
              {drawAxis(0, -10, 0, 0, 10, 0, '#22c55e', 'Y')}
              {drawAxis(0, 0, -10, 0, 0, 10, '#3b82f6', 'Z')}
            </>
          ) : (
            <>
              {drawAxis(-10, 0, 0, 10, 0, 0, 'white', 'X')}
              {drawAxis(0, -10, 0, 0, 10, 0, 'white', 'Y')}
              {/* Grid for 2D */}
              <g opacity="0.05">
                {[...Array(21)].map((_, i) => (
                  <line key={`v${i}`} x1={mapPoint(i-10, 0, 0).px} y1={0} x2={mapPoint(i-10, 0, 0).px} y2={height} stroke="white" />
                ))}
                {[...Array(21)].map((_, i) => (
                  <line key={`h${i}`} x1={0} y1={mapPoint(0, i-10, 0).py} x2={width} y2={mapPoint(0, i-10, 0).py} stroke="white" />
                ))}
              </g>
            </>
          )}

          {/* Vectors */}
          {drawArrow(vA[0], vA[1], vA[2], '#34d399', 'A')}
          
          {['add', 'sub', 'dot', 'cross'].includes(operation) && (
            drawArrow(vB[0], vB[1], vB[2], '#60a5fa', 'B')
          )}

          {/* Vector Results */}
          {operation === 'add' && vectorResult && (
            <>
               {/* Show tail-to-head addition with a dashed line */}
               {drawArrow(vB[0], vB[1], vB[2], '#60a5fa55', '', false, vA[0], vA[1], vA[2])}
               {drawArrow(vectorResult[0], vectorResult[1], vectorResult[2], '#f472b6', 'A+B', true)}
            </>
          )}
          {operation === 'sub' && vectorResult && (
            <>
               {drawArrow(-vB[0], -vB[1], -vB[2], '#60a5fa55', '-B', false, vA[0], vA[1], vA[2])}
               {drawArrow(vectorResult[0], vectorResult[1], vectorResult[2], '#f472b6', 'A-B', true)}
            </>
          )}
          {operation === 'cross' && vectorResult && (
             drawArrow(vectorResult[0], vectorResult[1], vectorResult[2], '#f472b6', 'A×B', true)
          )}
          {operation === 'norm' && vectorResult && (
             drawArrow(vectorResult[0], vectorResult[1], vectorResult[2], '#f472b6', 'Â', true)
          )}

        </svg>

        {/* Overlay for scalar results */}
        {scalarResult !== null && (
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur p-4 rounded-xl border border-white/10 flex flex-col items-center">
            <span className="text-xs text-lab-muted font-bold uppercase tracking-widest mb-1">Result</span>
            <span className="text-2xl font-mono text-emerald-400 font-bold">{typeof scalarResult === 'number' ? scalarResult.toFixed(2) : scalarResult}</span>
          </div>
        )}
      </div>
    );
  };

  // --- Rendering Matrix View ---
  const renderMatrixGraph = () => {
    return (
      <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center p-8 overflow-x-auto custom-scrollbar">
        
        {operation === 'none' ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-8">
            <MatrixView mat={entityA} title="Matrix A" />
          </motion.div>
        ) : (
          <div className="flex items-center gap-6 md:gap-12 min-w-max">
            
            {/* Unary Operations */}
            {['transpose', 'det', 'inv', 'trace'].includes(operation) && (
              <>
                <div className="flex items-center gap-4">
                  <span className="text-4xl text-lab-muted font-light">
                    {operation === 'transpose' ? <>(<MatrixView mat={entityA} />)<sup className="text-emerald-400">T</sup></> : ''}
                    {operation === 'det' ? <>|<MatrixView mat={entityA} />|</> : ''}
                    {operation === 'inv' ? <>(<MatrixView mat={entityA} />)<sup className="text-emerald-400">-1</sup></> : ''}
                    {operation === 'trace' ? <span className="flex items-center gap-2"><span className="text-emerald-400 font-bold text-2xl">Tr</span>(<MatrixView mat={entityA} />)</span> : ''}
                  </span>
                </div>
                <span className="text-3xl text-lab-muted font-light">=</span>
                {matrixResult !== null && <MatrixView mat={matrixResult} title="Result" />}
                {scalarResult !== null && <span className="text-4xl font-mono text-emerald-400">{typeof scalarResult === 'number' ? scalarResult.toFixed(2) : scalarResult}</span>}
              </>
            )}

            {/* Binary Operations */}
            {['add', 'sub', 'mul'].includes(operation) && (
              <>
                <MatrixView mat={entityA} title="A" />
                <span className="text-3xl text-lab-muted font-light">
                  {operation === 'add' ? '+' : operation === 'sub' ? '-' : '×'}
                </span>
                <MatrixView mat={entityB} title="B" />
                <span className="text-3xl text-lab-muted font-light">=</span>
                <MatrixView mat={matrixResult} title="Result" />
              </>
            )}

          </div>
        )}

      </div>
    );
  };

  return (
    <div className="w-full h-full mt-10">
      {activeMode === 'vector' ? renderVectorGraph() : renderMatrixGraph()}
    </div>
  );
}
