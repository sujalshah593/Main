import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Book, Target, ListOrdered, Brain, CheckCircle, XCircle } from 'lucide-react';

const THEORY_CONTENT = {
  matrix_ops: {
    title: 'Advanced Matrix Operations',
    desc: 'Matrices are mathematical tools used to organize data and solve complex systems. Advanced operations help analyze their properties.',
    details: [
      { name: 'Determinant (|A|)', text: 'A scalar value that can be computed from the elements of a square matrix. It helps identify solvability and scaling factors.' },
      { name: 'Inverse (A⁻¹)', text: 'A matrix that, when multiplied by the original matrix, yields the identity matrix. Useful for solving linear systems.' },
      { name: 'Trace (Tr(A))', text: 'The sum of elements on the main diagonal of a square matrix.' },
      { name: 'Rank', text: 'The maximum number of linearly independent column (or row) vectors in the matrix.' },
      { name: 'Adjoint / Cofactor', text: 'Intermediate matrices used in finding the inverse and understanding matrix transformations.' }
    ]
  },
  equation_solver: {
    title: 'Solving Linear Equations',
    desc: 'Systems of linear equations can be represented as AX = B and solved using various algorithms.',
    details: [
      { name: 'Gaussian Elimination', text: 'A systematic method of row operations to convert a matrix into row echelon form, simplifying the equations to allow back-substitution.' },
      { name: 'Cramer\'s Rule', text: 'Uses determinants to solve for each variable. Only works for square, non-singular coefficient matrices.' },
      { name: 'Inverse Method', text: 'Calculates X = A⁻¹B. Efficient if you need to solve AX = B for many different B vectors.' },
      { name: 'Substitution/Elimination', text: 'Basic algebraic methods suitable for small systems (2 or 3 variables).' }
    ]
  }
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "If a matrix has a determinant of zero, which of the following is true?",
    options: ["It has no inverse (it is singular).", "It is an identity matrix.", "Its rank is equal to its dimension.", "It cannot be transposed."],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "What does Gaussian Elimination aim to achieve?",
    options: ["Find the trace of the matrix", "Convert the augmented matrix to Row Echelon Form", "Calculate the cross product", "Make the matrix symmetric"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "In the system AX = B, if you solve using the inverse method, X equals:",
    options: ["A * B", "B * A⁻¹", "A⁻¹ * B", "A / B"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "Which of these operations is NOT commutative? (i.e., A * B ≠ B * A generally)",
    options: ["Matrix Addition", "Scalar Multiplication", "Matrix Multiplication", "Finding the Trace"],
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
          <div className="p-2 rounded-lg bg-pink-500/20 text-pink-500">
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

export default function MatrixEqLearningPanel({ activeMode }) {
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

  const currentTheory = THEORY_CONTENT[activeMode] || THEORY_CONTENT.matrix_ops;

  return (
    <div className="flex flex-col gap-4">
      {/* Objective */}
      <Section title="Objective" icon={Target} defaultOpen={true}>
        <p>
          To perform complex matrix operations, understand their significance, and utilize various algorithmic methods to solve systems of linear equations common in AI and engineering.
        </p>
      </Section>

      {/* Theory */}
      <Section title="Theory & Concepts" icon={Book} defaultOpen={true}>
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-1">{currentTheory.title}</h4>
            <p className="mb-3">{currentTheory.desc}</p>
            <ul className="space-y-2">
              {currentTheory.details.map((item, idx) => (
                <li key={idx}>
                  <strong className="text-pink-300">{item.name}: </strong> 
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Procedure */}
      <Section title="Procedure" icon={ListOrdered}>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Select either <strong>Matrix Operations</strong> or <strong>Equation Solver</strong> mode.</li>
          <li>For Matrix Ops, select matrix sizes, input values, and choose an operation.</li>
          <li>For Equations, select the number of variables, input coefficients, and select a solving method.</li>
          <li>Click <strong>Calculate / Solve</strong> to view the results.</li>
          <li>In Equation mode, observe the step-by-step trace to understand the algorithm.</li>
          <li>For 2-variable systems, interact with the graphical plot.</li>
          <li>Record your observations.</li>
        </ol>
      </Section>

      {/* Results / Conclusion */}
      <Section title="Live Conclusion" icon={Brain} defaultOpen={true}>
        <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-lg">
          <p className="text-pink-200">
            {activeMode === 'matrix_ops' ? (
              "Conclusion: Matrix multiplication combines transformations. Determinant helps identify solvability, and the Inverse matrix is the key to reversing transformations."
            ) : (
              "Conclusion: Gaussian elimination simplifies equations systematically. The intersection of lines provides a visual solution for two-variable equations."
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
                    if (isSelected) btnClass += "bg-pink-500/20 border-pink-500/50 text-white";
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
              className="w-full py-3 mt-4 bg-pink-500/20 hover:bg-pink-500/30 text-pink-400 font-bold rounded-xl border border-pink-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answers
            </button>
          ) : (
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-lg font-bold text-white mb-1">
                Score: <span className="text-pink-400">{calculateScore()}</span> / {QUIZ_QUESTIONS.length}
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
