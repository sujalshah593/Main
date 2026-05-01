import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Book, Target, ListOrdered, Brain, CheckCircle, XCircle } from 'lucide-react';

const THEORY_CONTENT = {
  sigmoid: {
    title: 'Sigmoid Function',
    desc: 'The Sigmoid function maps any input value to a value between 0 and 1. It is often used for binary classification.',
    formula: 'f(x) = 1 / (1 + e^(-x))',
    range: '(0, 1)',
    useCase: 'Output layer of binary classifiers, predicting probabilities.',
    pros: 'Smooth gradient, clear predictions (close to 0 or 1).',
    cons: 'Vanishing gradient problem for very high or low values.'
  },
  relu: {
    title: 'ReLU (Rectified Linear Unit)',
    desc: 'ReLU outputs the input directly if it is positive, otherwise, it outputs zero.',
    formula: 'f(x) = max(0, x)',
    range: '[0, ∞)',
    useCase: 'Hidden layers of deep neural networks.',
    pros: 'Computationally efficient, mitigates vanishing gradient problem for positive values.',
    cons: '"Dying ReLU" problem where neurons can become inactive.'
  },
  tanh: {
    title: 'Tanh (Hyperbolic Tangent)',
    desc: 'Tanh maps any input value to a value between -1 and 1. It is zero-centered, which makes optimization easier than Sigmoid.',
    formula: 'f(x) = (e^x - e^(-x)) / (e^x + e^(-x))',
    range: '(-1, 1)',
    useCase: 'Hidden layers in recurrent neural networks (RNNs).',
    pros: 'Zero-centered, stronger gradients than sigmoid.',
    cons: 'Still suffers from vanishing gradient problem.'
  },
  leaky_relu: {
    title: 'Leaky ReLU',
    desc: 'A variant of ReLU that allows a small, positive gradient when the unit is not active (x < 0).',
    formula: 'f(x) = x if x ≥ 0, else α * x',
    range: '(-∞, ∞)',
    useCase: 'Hidden layers, specifically to fix the "dying ReLU" problem.',
    pros: 'Fixes dying ReLU problem, keeps learning alive.',
    cons: 'Requires parameter tuning for alpha.'
  },
  softmax: {
    title: 'Softmax',
    desc: 'In this 1D visualization, we treat Softmax as e^x / (e^x + C) to show how an input relates to a background sum of other exponentiated inputs.',
    formula: 'f(xi) = e^(xi) / Σ e^(xj)',
    range: '(0, 1)',
    useCase: 'Output layer for multi-class classification.',
    pros: 'Outputs a valid probability distribution.',
    cons: 'Sensitive to outliers.'
  },
  elu: {
    title: 'ELU (Exponential Linear Unit)',
    desc: 'ELU is similar to ReLU for positive inputs, but gently smoothly approaches -α for negative inputs.',
    formula: 'f(x) = x if x ≥ 0, else α * (e^x - 1)',
    range: '(-α, ∞)',
    useCase: 'Hidden layers, alternative to ReLU.',
    pros: 'Smooth for negative values, can produce negative outputs.',
    cons: 'Computationally more expensive due to the exponential function.'
  },
  linear: {
    title: 'Linear Function',
    desc: 'A linear activation function simply outputs the input without any modification.',
    formula: 'f(x) = x',
    range: '(-∞, ∞)',
    useCase: 'Output layers for regression tasks.',
    pros: 'Simple, allows for a wide range of output values.',
    cons: 'Cannot model non-linear relationships.'
  }
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which activation function outputs values specifically in the range (0, 1)?",
    options: ["ReLU", "Tanh", "Sigmoid", "Linear"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "What is the primary advantage of the ReLU activation function?",
    options: ["It is zero-centered.", "It mitigates the vanishing gradient problem for positive inputs.", "It limits the output to [-1, 1].", "It is used for binary classification."],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Which problem does Leaky ReLU aim to solve?",
    options: ["Exploding gradients", "High computational cost", "Dying ReLU problem", "Overfitting"],
    correctAnswer: 2
  }
];

const Section = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="glass-panel rounded-xl overflow-hidden border border-white/5 bg-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-lab-accent2/20 text-lab-accent2">
            <Icon size={18} />
          </div>
          <h3 className="font-bold text-white tracking-wide">{title}</h3>
        </div>
        <ChevronDown
          size={18}
          className={`text-lab-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-sm text-lab-muted/90 leading-relaxed border-t border-white/5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ActivationLearningPanel({ activeFunction }) {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const currentTheory = THEORY_CONTENT[activeFunction] || THEORY_CONTENT.sigmoid;

  return (
    <div className="flex flex-col gap-4">
      {/* Objective */}
      <Section title="Objective" icon={Target} defaultOpen={true}>
        <p>
          To understand and visualize various AI activation functions, observe their 
          input-output mappings, and analyze their characteristics such as range, 
          linearity, and use cases in artificial neural networks.
        </p>
      </Section>

      {/* Theory */}
      <Section title="Theory & Concepts" icon={Book} defaultOpen={true}>
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-1">{currentTheory.title}</h4>
            <p>{currentTheory.desc}</p>
          </div>
          
          <div className="bg-black/30 p-3 rounded-lg border border-white/5 font-mono text-center text-lab-accent2">
            {currentTheory.formula}
          </div>

          <ul className="space-y-2 mt-2">
            <li><strong className="text-white">Range:</strong> {currentTheory.range}</li>
            <li><strong className="text-white">Use Case:</strong> {currentTheory.useCase}</li>
            <li><strong className="text-green-400">Pros:</strong> {currentTheory.pros}</li>
            <li><strong className="text-red-400">Cons:</strong> {currentTheory.cons}</li>
          </ul>
        </div>
      </Section>

      {/* Procedure */}
      <Section title="Procedure" icon={ListOrdered}>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Select an activation function from the dropdown menu.</li>
          <li>Adjust the input value <strong>x</strong> using the slider.</li>
          <li>Observe the real-time changes in the output <strong>y</strong> and the graphical plot.</li>
          <li>Enable <strong>Compare Mode</strong> to plot multiple functions together.</li>
          <li>Record observations at different points to analyze the curve's nature.</li>
          <li>For Leaky ReLU or ELU, adjust the <strong>alpha</strong> parameter.</li>
          <li>Attempt the quiz to test your understanding.</li>
        </ol>
      </Section>

      {/* Results / Conclusion */}
      <Section title="Live Conclusion" icon={Brain} defaultOpen={true}>
        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
          <p className="text-indigo-200">
            {activeFunction === 'relu' && "Conclusion: ReLU removes all negative values by setting them to zero, acting as a threshold."}
            {activeFunction === 'sigmoid' && "Conclusion: Sigmoid squashes all inputs smoothly into a probability space between 0 and 1."}
            {activeFunction === 'tanh' && "Conclusion: Tanh scales values between -1 and 1, keeping the output zero-centered."}
            {activeFunction === 'linear' && "Conclusion: Linear function gives direct proportional output without squashing."}
            {activeFunction === 'leaky_relu' && "Conclusion: Leaky ReLU maintains a slight slope for negative values to prevent dead neurons."}
            {activeFunction === 'elu' && "Conclusion: ELU smooths the negative output to approach a limit softly."}
            {activeFunction === 'softmax' && "Conclusion: Softmax converts inputs into a proportional likelihood relative to other values."}
          </p>
        </div>
      </Section>

      {/* Quiz Section */}
      <Section title="Quiz Assessment" icon={CheckCircle}>
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q) => (
            <div key={q.id} className="space-y-3">
              <p className="text-white font-medium">{q.id}. {q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[q.id] === idx;
                  const isSubmitted = showResults;
                  const isCorrect = q.correctAnswer === idx;
                  
                  let btnClass = "w-full text-left p-3 rounded-xl border transition-all text-sm ";
                  
                  if (isSubmitted) {
                    if (isCorrect) btnClass += "bg-green-500/20 border-green-500/50 text-green-300";
                    else if (isSelected && !isCorrect) btnClass += "bg-red-500/20 border-red-500/50 text-red-300";
                    else btnClass += "bg-white/5 border-white/5 text-lab-muted opacity-50";
                  } else {
                    if (isSelected) btnClass += "bg-lab-accent2/20 border-lab-accent2/50 text-white";
                    else btnClass += "bg-white/5 border-white/10 text-lab-muted hover:bg-white/10 hover:text-white";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !showResults && handleOptionSelect(q.id, idx)}
                      disabled={showResults}
                      className={btnClass}
                    >
                      <div className="flex items-center justify-between">
                        <span>{opt}</span>
                        {isSubmitted && isCorrect && <CheckCircle size={16} className="text-green-400" />}
                        {isSubmitted && isSelected && !isCorrect && <XCircle size={16} className="text-red-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {!showResults ? (
            <button
              onClick={() => setShowResults(true)}
              disabled={Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length}
              className="w-full py-3 mt-4 bg-lab-accent/20 hover:bg-lab-accent/30 text-lab-accent font-bold rounded-xl border border-lab-accent/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answers
            </button>
          ) : (
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-lg font-bold text-white mb-1">
                Score: <span className="text-lab-accent2">{calculateScore()}</span> / {QUIZ_QUESTIONS.length}
              </p>
              <button
                onClick={() => {
                  setShowResults(false);
                  setSelectedAnswers({});
                }}
                className="mt-3 text-sm text-lab-muted hover:text-white underline"
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
