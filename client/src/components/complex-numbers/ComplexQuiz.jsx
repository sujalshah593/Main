import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "Identify the real and imaginary parts of z = -3 + 4i.",
    options: [
      "Real: 3, Imaginary: 4",
      "Real: -3, Imaginary: 4",
      "Real: 4, Imaginary: -3",
      "Real: -3, Imaginary: 4i"
    ],
    correct: 1,
    explanation: "In the form z = a + ib, a is the real part and b is the imaginary part. Here a = -3 and b = 4."
  },
  {
    id: 2,
    question: "What is the modulus of the complex number z = 3 + 4i?",
    options: [
      "7",
      "5",
      "25",
      "12"
    ],
    correct: 1,
    explanation: "|z| = √(3² + 4²) = √(9 + 16) = √25 = 5."
  },
  {
    id: 3,
    question: "What is the result of (1 + 2i) + (3 - 4i)?",
    options: [
      "4 - 6i",
      "4 + 6i",
      "4 - 2i",
      "4 + 2i"
    ],
    correct: 2,
    explanation: "(1 + 3) + i(2 - 4) = 4 - 2i."
  },
  {
    id: 4,
    question: "Geometrically, what does the addition of two complex numbers represent?",
    options: [
      "Rotation of one point around the other",
      "Scaling of the distance from origin",
      "Vector addition using the parallelogram law",
      "Mirror reflection across the real axis"
    ],
    correct: 2,
    explanation: "Complex numbers behave like vectors from the origin; their sum is the diagonal of the parallelogram formed by them."
  }
];

export default function ComplexQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === QUESTIONS[currentQ].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="glass-panel p-8 rounded-2xl border-t-2 border-t-amber-500/50 text-center">
        <div className="w-16 h-16 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/30">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Quiz Completed!</h3>
        <p className="text-lab-muted mb-6">You scored {score} out of {QUESTIONS.length}</p>
        <button 
          onClick={restart}
          className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  const q = QUESTIONS[currentQ];

  return (
    <div className="glass-panel p-6 rounded-2xl border-t-2 border-t-amber-500/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
          <HelpCircle size={16} />
          Concept Check
        </h3>
        <span className="text-[11px] font-bold text-lab-muted">Question {currentQ + 1}/{QUESTIONS.length}</span>
      </div>

      <p className="text-[15px] font-medium text-white mb-6 leading-relaxed">
        {q.question}
      </p>

      <div className="space-y-3">
        {q.options.map((opt, i) => (
          <button
            key={i}
            disabled={showResult}
            onClick={() => handleSelect(i)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              showResult
                ? i === q.correct
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200'
                  : i === selected
                    ? 'bg-rose-500/20 border-rose-500/40 text-rose-200'
                    : 'bg-white/5 border-white/5 text-lab-muted opacity-50'
                : 'bg-white/5 border-white/10 hover:border-amber-500/30 text-white hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-bold ${
                showResult && i === q.correct ? 'bg-emerald-500 border-emerald-400' : 'bg-white/10 border-white/20'
              }`}>
                {String.fromCharCode(65 + i)}
              </div>
              {opt}
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20"
          >
            <p className="text-xs text-amber-200 leading-relaxed italic">
              <strong>Explanation:</strong> {q.explanation}
            </p>
            <button
              onClick={nextQuestion}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-all text-xs"
            >
              {currentQ === QUESTIONS.length - 1 ? 'Finish' : 'Next Question'}
              <ChevronRight size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
