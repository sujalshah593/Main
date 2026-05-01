// Evaluates f(x)
export const evaluateFunction = (type, params, x) => {
  const { a, b, c, d } = params;
  switch (type) {
    case 'linear': return a * x + b;
    case 'quadratic': return a * x * x + b * x + c;
    case 'cubic': return a * x * x * x + b * x * x + c * x + d;
    case 'exponential': return a * Math.exp(b * x) + c;
    case 'logarithmic': return x > 0 ? a * Math.log(b * x) + c : NaN; // Avoid log(<=0)
    case 'trigonometric_sin': return a * Math.sin(b * x) + c;
    case 'trigonometric_cos': return a * Math.cos(b * x) + c;
    case 'rational': return Math.abs(b * x + c) > 1e-10 ? a / (b * x + c) : NaN; // Avoid div by zero
    default: return 0;
  }
};

// Evaluates exact f'(x)
export const evaluateDerivative = (type, params, x) => {
  const { a, b, c } = params;
  switch (type) {
    case 'linear': return a;
    case 'quadratic': return 2 * a * x + b;
    case 'cubic': return 3 * a * x * x + 2 * b * x + c;
    case 'exponential': return a * b * Math.exp(b * x);
    case 'logarithmic': return x > 0 ? a / x : NaN; // d/dx (a * ln(bx) + c) = a/x
    case 'trigonometric_sin': return a * b * Math.cos(b * x);
    case 'trigonometric_cos': return -a * b * Math.sin(b * x);
    case 'rational': 
      const denom = b * x + c;
      return Math.abs(denom) > 1e-10 ? -(a * b) / (denom * denom) : NaN;
    default: return 0;
  }
};

// Evaluates exact f''(x)
export const evaluateSecondDerivative = (type, params, x) => {
  const { a, b, c } = params;
  switch (type) {
    case 'linear': return 0;
    case 'quadratic': return 2 * a;
    case 'cubic': return 6 * a * x + 2 * b;
    case 'exponential': return a * b * b * Math.exp(b * x);
    case 'logarithmic': return x > 0 ? -a / (x * x) : NaN;
    case 'trigonometric_sin': return -a * b * b * Math.sin(b * x);
    case 'trigonometric_cos': return -a * b * b * Math.cos(b * x);
    case 'rational': 
      const denom = b * x + c;
      return Math.abs(denom) > 1e-10 ? (2 * a * b * b) / (denom * denom * denom) : NaN;
    default: return 0;
  }
};

// Formats number nicely
const fmt = (num) => {
  if (num === undefined) return '';
  const str = num.toFixed(2);
  return str.endsWith('.00') ? str.slice(0, -3) : str;
};

// Returns symbolic string representation
export const getFunctionString = (type, params) => {
  const { a, b, c, d } = params;
  switch (type) {
    case 'linear': return `${fmt(a)}x + ${fmt(b)}`;
    case 'quadratic': return `${fmt(a)}x² + ${fmt(b)}x + ${fmt(c)}`;
    case 'cubic': return `${fmt(a)}x³ + ${fmt(b)}x² + ${fmt(c)}x + ${fmt(d)}`;
    case 'exponential': return `${fmt(a)}e^(${fmt(b)}x) + ${fmt(c)}`;
    case 'logarithmic': return `${fmt(a)}ln(${fmt(b)}x) + ${fmt(c)}`;
    case 'trigonometric_sin': return `${fmt(a)}sin(${fmt(b)}x) + ${fmt(c)}`;
    case 'trigonometric_cos': return `${fmt(a)}cos(${fmt(b)}x) + ${fmt(c)}`;
    case 'rational': return `${fmt(a)} / (${fmt(b)}x + ${fmt(c)})`;
    default: return '';
  }
};

// Generates step-by-step symbolic derivation trace
export const getDerivationSteps = (type, params) => {
  const { a, b, c, d } = params;
  const steps = [];
  steps.push(`Original Function: f(x) = ${getFunctionString(type, params)}`);

  switch (type) {
    case 'linear':
      steps.push("1. Apply Power Rule to ax: d/dx(ax) = a");
      steps.push("2. Constant Rule: d/dx(b) = 0");
      steps.push(`f'(x) = ${fmt(a)}`);
      break;
    case 'quadratic':
      steps.push("1. Apply Power Rule to ax²: d/dx(ax²) = 2ax");
      steps.push("2. Apply Power Rule to bx: d/dx(bx) = b");
      steps.push("3. Constant Rule: d/dx(c) = 0");
      steps.push(`f'(x) = ${fmt(2*a)}x + ${fmt(b)}`);
      break;
    case 'cubic':
      steps.push("1. Apply Power Rule to ax³: d/dx(ax³) = 3ax²");
      steps.push("2. Apply Power Rule to bx²: d/dx(bx²) = 2bx");
      steps.push("3. Apply Power Rule to cx: d/dx(cx) = c");
      steps.push("4. Constant Rule: d/dx(d) = 0");
      steps.push(`f'(x) = ${fmt(3*a)}x² + ${fmt(2*b)}x + ${fmt(c)}`);
      break;
    case 'exponential':
      steps.push("1. Derivative of e^(bx) is b * e^(bx) (Chain Rule)");
      steps.push("2. Constant Rule: d/dx(c) = 0");
      steps.push(`f'(x) = ${fmt(a)} * ${fmt(b)}e^(${fmt(b)}x)`);
      steps.push(`f'(x) = ${fmt(a*b)}e^(${fmt(b)}x)`);
      break;
    case 'logarithmic':
      steps.push("1. Derivative of ln(bx) is 1/x (Chain rule: 1/(bx) * b = 1/x)");
      steps.push("2. Constant Rule: d/dx(c) = 0");
      steps.push(`f'(x) = ${fmt(a)} / x`);
      break;
    case 'trigonometric_sin':
      steps.push("1. Derivative of sin(bx) is b * cos(bx) (Chain Rule)");
      steps.push("2. Constant Rule: d/dx(c) = 0");
      steps.push(`f'(x) = ${fmt(a)} * ${fmt(b)}cos(${fmt(b)}x)`);
      steps.push(`f'(x) = ${fmt(a*b)}cos(${fmt(b)}x)`);
      break;
    case 'trigonometric_cos':
      steps.push("1. Derivative of cos(bx) is -b * sin(bx) (Chain Rule)");
      steps.push("2. Constant Rule: d/dx(c) = 0");
      steps.push(`f'(x) = ${fmt(a)} * -${fmt(b)}sin(${fmt(b)}x)`);
      steps.push(`f'(x) = ${fmt(-a*b)}sin(${fmt(b)}x)`);
      break;
    case 'rational':
      steps.push(`1. Apply Quotient Rule or Chain Rule to a(bx+c)⁻¹`);
      steps.push(`2. Let u = bx+c, du/dx = b`);
      steps.push(`3. d/dx(a*u⁻¹) = -a*u⁻² * du/dx`);
      steps.push(`f'(x) = -${fmt(a)} * ${fmt(b)} / (${fmt(b)}x + ${fmt(c)})²`);
      steps.push(`f'(x) = ${fmt(-a*b)} / (${fmt(b)}x + ${fmt(c)})²`);
      break;
  }
  return steps;
};
