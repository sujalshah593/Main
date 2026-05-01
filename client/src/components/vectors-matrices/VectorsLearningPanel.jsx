import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Book, Target, ListOrdered, Brain, CheckCircle, XCircle } from 'lucide-react';

const THEORY_CONTENT = {
  vector: {
    title: 'Vectors',
    desc: 'A vector is a mathematical entity that has both magnitude (length) and direction. In AI and Data Science, vectors are often used to represent features, weights, or data points in a multidimensional space.',
    types: 'Row Vector (1xN), Column Vector (Nx1), 2D Vector (x,y), 3D Vector (x,y,z).',
    useCase: 'Representing single data samples, gradients, or physics properties like velocity.',
  },
  matrix: {
    title: 'Matrices',
    desc: 'A matrix is a rectangular array of numbers arranged in rows and columns. Matrices are fundamental in linear algebra for representing linear transformations and solving systems of equations.',
    types: 'Square (NxN), Rectangular (MxN), Identity (1s on diagonal), Zero (all 0s), Diagonal.',
    useCase: 'Representing datasets, image pixels, or layers of weights in a neural network.',
  }
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What does the dot product of two orthogonal (perpendicular) vectors equal?",
    options: ["1", "0", "-1", "It depends on their magnitude"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "In matrix multiplication A × B, if A is (m × n), what must the dimensions of B be?",
    options: ["(m × p)", "(p × n)", "(n × p)", "(m × n)"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Which matrix operation flips a matrix over its diagonal?",
    options: ["Inverse", "Determinant", "Trace", "Transpose"],
    correctAnswer: 3
  },
  {
    id: 4,
    question: "If the determinant of a matrix is zero, the matrix is:",
    options: ["Invertible", "Singular (Non-invertible)", "Diagonal", "Identity"],
    correctAnswer: 1
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
          <div className="p-2 rounded-lg bg-emerald-400/20 text-emerald-400">
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

export default function VectorsLearningPanel({ activeMode, entityType }) {
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

  const currentTheory = THEORY_CONTENT[activeMode] || THEORY_CONTENT.vector;

  return (
    <div className="flex flex-col gap-4">
      {/* Objective */}
      <Section title="Objective" icon={Target} defaultOpen={true}>
        <p>
          To understand and visualize vectors and matrices, learn how to represent them, 
          and observe the geometric and numerical effects of various linear algebra operations 
          fundamental to Artificial Intelligence.
        </p>
      </Section>

      {/* Theory */}
      <Section title="Theory & Concepts" icon={Book} defaultOpen={true}>
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-1">{currentTheory.title}</h4>
            <p>{currentTheory.desc}</p>
          </div>
          
          <ul className="space-y-2 mt-2">
            <li><strong className="text-white">Common Types:</strong> {currentTheory.types}</li>
            <li><strong className="text-white">Use Case in AI:</strong> {currentTheory.useCase}</li>
          </ul>
        </div>
      </Section>

      {/* Procedure */}
      <Section title="Procedure" icon={ListOrdered}>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Select either <strong>Vector</strong> or <strong>Matrix</strong> mode.</li>
          <li>Choose the specific type (e.g., 2D Vector, Square Matrix).</li>
          <li>Adjust dimensions using the sliders if applicable.</li>
          <li>Enter custom values in the input grid or use "Random Data".</li>
          <li>Select an operation to perform (Addition, Dot Product, Inverse, etc.).</li>
          <li>Observe the mathematical result and the visual representation.</li>
          <li>Record observations in the table and attempt the quiz.</li>
        </ol>
      </Section>

      {/* Results / Conclusion */}
      <Section title="Live Conclusion" icon={Brain} defaultOpen={true}>
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <p className="text-emerald-200">
            {activeMode === 'vector' ? (
              "Conclusion: Vectors represent magnitude and direction. Operations like the Dot Product help measure similarity between them, while Cross Product finds orthogonal vectors."
            ) : (
              "Conclusion: Matrices organize complex data into rows and columns. Matrix multiplication transforms data between spaces, and determinants help identify invertibility."
            )}
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
                    if (isSelected) btnClass += "bg-emerald-400/20 border-emerald-400/50 text-white";
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
              className="w-full py-3 mt-4 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold rounded-xl border border-emerald-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answers
            </button>
          ) : (
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-lg font-bold text-white mb-1">
                Score: <span className="text-emerald-400">{calculateScore()}</span> / {QUIZ_QUESTIONS.length}
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
