// --- Basic Matrix Operations ---

export const getMinor = (matrix, row, col) => {
  return matrix.filter((_, i) => i !== row).map(r => r.filter((_, j) => j !== col));
};

export const determinant = (matrix) => {
  const n = matrix.length;
  if (n !== matrix[0].length) throw new Error("Matrix must be square");
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  
  let det = 0;
  for (let i = 0; i < n; i++) {
    det += Math.pow(-1, i) * matrix[0][i] * determinant(getMinor(matrix, 0, i));
  }
  return det;
};

export const cofactorMatrix = (matrix) => {
  const n = matrix.length;
  if (n !== matrix[0].length) throw new Error("Matrix must be square");
  const cof = Array(n).fill(0).map(() => Array(n).fill(0));
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      cof[i][j] = Math.pow(-1, i + j) * determinant(getMinor(matrix, i, j));
      // Fix -0
      if (cof[i][j] === -0) cof[i][j] = 0;
    }
  }
  return cof;
};

export const transpose = (matrix) => {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
};

export const adjoint = (matrix) => {
  return transpose(cofactorMatrix(matrix));
};

export const inverse = (matrix) => {
  const det = determinant(matrix);
  if (det === 0) throw new Error("Matrix is singular (det = 0)");
  const adj = adjoint(matrix);
  return adj.map(row => row.map(val => val / det));
};

export const rank = (matrix) => {
  // Gaussian elimination to find rank
  let mat = matrix.map(row => [...row]);
  let r = 0;
  let rows = mat.length;
  let cols = mat[0].length;
  
  for (let c = 0; c < cols && r < rows; c++) {
    // Find pivot
    let pivotRow = r;
    for (let i = r + 1; i < rows; i++) {
      if (Math.abs(mat[i][c]) > Math.abs(mat[pivotRow][c])) {
        pivotRow = i;
      }
    }
    if (Math.abs(mat[pivotRow][c]) < 1e-10) continue; // No pivot in this column
    
    // Swap
    [mat[r], mat[pivotRow]] = [mat[pivotRow], mat[r]];
    
    // Eliminate below
    for (let i = r + 1; i < rows; i++) {
      let factor = mat[i][c] / mat[r][c];
      for (let j = c; j < cols; j++) {
        mat[i][j] -= factor * mat[r][j];
      }
    }
    r++;
  }
  return r;
};

export const multiply = (A, B) => {
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


// --- Equation Solvers with Steps ---
// Standard form for systems: Ax = B
// Input format for solvers: A is nxn matrix, B is nx1 matrix

export const solveInverseMethod = (A, B) => {
  const steps = [];
  try {
    steps.push({ desc: "Initial System: AX = B", A: A, B: B });
    const detA = determinant(A);
    steps.push({ desc: `1. Find Determinant of A: |A| = ${detA.toFixed(4)}`, result: detA });
    
    if (Math.abs(detA) < 1e-10) {
      return { solution: null, steps, error: "Matrix A is singular. Unique solution does not exist." };
    }
    
    const cof = cofactorMatrix(A);
    steps.push({ desc: "2. Find Cofactor Matrix", matrix: cof });
    
    const adj = transpose(cof);
    steps.push({ desc: "3. Find Adjoint Matrix (Transpose of Cofactor)", matrix: adj });
    
    const inv = adj.map(row => row.map(val => val / detA));
    steps.push({ desc: "4. Find Inverse Matrix: A⁻¹ = (1/|A|) * Adjoint", matrix: inv });
    
    const x = multiply(inv, B);
    steps.push({ desc: "5. Multiply A⁻¹ by B to find X", matrix: x });
    
    return { solution: x, steps, error: null };
  } catch (err) {
    return { solution: null, steps, error: err.message };
  }
};

export const solveCramer = (A, B) => {
  const steps = [];
  try {
    const n = A.length;
    const detA = determinant(A);
    steps.push({ desc: `1. Find Determinant of coefficient matrix A: D = ${detA.toFixed(4)}` });
    
    if (Math.abs(detA) < 1e-10) {
      return { solution: null, steps, error: "Determinant is zero. Cramer's rule fails." };
    }
    
    const solution = Array(n).fill().map(() => [0]);
    
    for (let i = 0; i < n; i++) {
      // Create Ai matrix by replacing i-th column with B
      const Ai = A.map((row, rIdx) => {
        const newRow = [...row];
        newRow[i] = B[rIdx][0];
        return newRow;
      });
      const detAi = determinant(Ai);
      solution[i][0] = detAi / detA;
      steps.push({ 
        desc: `2.${i+1} Replace column ${i+1} with B to form A${i+1}. Det(A${i+1}) = ${detAi.toFixed(4)}. x${i+1} = ${detAi.toFixed(4)} / ${detA.toFixed(4)} = ${solution[i][0].toFixed(4)}`,
        matrix: Ai
      });
    }
    
    steps.push({ desc: "3. Final Solution Matrix X", matrix: solution });
    return { solution, steps, error: null };
  } catch (err) {
    return { solution: null, steps, error: err.message };
  }
};

export const solveGaussian = (A, B) => {
  const steps = [];
  try {
    const n = A.length;
    // Create augmented matrix
    let mat = A.map((row, i) => [...row, B[i][0]]);
    steps.push({ desc: "1. Initial Augmented Matrix [A | B]", matrix: mat.map(r => [...r]) });
    
    // Forward elimination
    for (let i = 0; i < n; i++) {
      // Find pivot
      let pivotRow = i;
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(mat[j][i]) > Math.abs(mat[pivotRow][i])) {
          pivotRow = j;
        }
      }
      
      if (Math.abs(mat[pivotRow][i]) < 1e-10) {
         return { solution: null, steps, error: "System is dependent or inconsistent." };
      }
      
      // Swap if needed
      if (pivotRow !== i) {
        [mat[i], mat[pivotRow]] = [mat[pivotRow], mat[i]];
        steps.push({ desc: `Swap R${i+1} and R${pivotRow+1}`, matrix: mat.map(r => [...r]) });
      }
      
      // Eliminate
      for (let j = i + 1; j < n; j++) {
        const factor = mat[j][i] / mat[i][i];
        for (let k = i; k <= n; k++) {
          mat[j][k] -= factor * mat[i][k];
        }
        if (Math.abs(factor) > 1e-10) {
           steps.push({ desc: `R${j+1} = R${j+1} - (${factor.toFixed(2)})R${i+1}`, matrix: mat.map(r => [...r]) });
        }
      }
    }
    
    steps.push({ desc: "2. Row Echelon Form Achieved. Beginning Back Substitution.", matrix: mat.map(r => [...r]) });
    
    // Back substitution
    const x = Array(n).fill().map(() => [0]);
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < n; j++) {
        sum += mat[i][j] * x[j][0];
      }
      x[i][0] = (mat[i][n] - sum) / mat[i][i];
    }
    
    steps.push({ desc: "3. Final Solution Matrix X", matrix: x });
    return { solution: x, steps, error: null };
    
  } catch (err) {
    return { solution: null, steps, error: err.message };
  }
};

export const solveSubstitutionText = (A, B) => {
  // Very simplified algebraic text trace for 2x2.
  if (A.length !== 2) return { solution: null, steps: [{desc: "Substitution text trace only supported for 2-variable systems here."}], error: "Unsupported size" };
  const steps = [];
  const [a, b] = A[0]; const c = B[0][0];
  const [d, e] = A[1]; const f = B[1][0];
  
  steps.push({ desc: `Eq 1: (${a})x + (${b})y = ${c}` });
  steps.push({ desc: `Eq 2: (${d})x + (${e})y = ${f}` });
  
  if (Math.abs(a) < 1e-10) return { solution: null, steps, error: "Cannot isolate x in Eq 1" };
  
  steps.push({ desc: `1. Isolate x in Eq 1: x = (${c} - ${b}y) / ${a}` });
  steps.push({ desc: `2. Substitute x into Eq 2: ${d}((${c} - ${b}y) / ${a}) + ${e}y = ${f}` });
  
  const yCoeff = e - (d * b) / a;
  const constTerm = f - (d * c) / a;
  
  steps.push({ desc: `3. Simplify: (${yCoeff.toFixed(4)})y = ${constTerm.toFixed(4)}` });
  
  if (Math.abs(yCoeff) < 1e-10) return { solution: null, steps, error: "No unique solution" };
  
  const y = constTerm / yCoeff;
  steps.push({ desc: `4. Solve for y: y = ${y.toFixed(4)}` });
  
  const x = (c - b * y) / a;
  steps.push({ desc: `5. Substitute y back into x: x = (${c} - ${b}(${y.toFixed(4)})) / ${a} = ${x.toFixed(4)}` });
  
  return { solution: [[x], [y]], steps, error: null };
};
