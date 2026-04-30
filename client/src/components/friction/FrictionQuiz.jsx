import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RefreshCcw } from 'lucide-react';

const QUESTIONS = [
  {
    question: "What is the relationship between frictional force (F) and normal reaction (N)?",
    options: ["F is inversely proportional to N", "F is directly proportional to N", "F is independent of N", "F depends only on mass"],
    correct: 1
  },
  {
    question: "Which of the following is usually true?",
    options: ["Static friction < Kinetic friction", "Static friction = Kinetic friction", "Static friction > Kinetic friction", "Kinetic friction is always zero"],
    correct: 2
  },
  {
    question: "The coefficient of friction depends on:",
    options: ["The surface area of contact", "The nature of the surfaces in contact", "The speed of the object", "All of the above"],
    correct: 1
  },
  {
    question: "If a 10kg block is on a surface with μs = 0.5, what is the minimum force needed to move it? (g=9.81)",
    options: ["5 N", "49.05 N", "98.1 N", "10 N"],
    correct: 1
  }
];

export default function FrictionQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === QUESTIONS[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
        <HelpCircle size={18} className="text-rose-400" /> Concept Check
      </h3>

      {showResult ? (
        <div className="text-center py-8">
          <div className="text-4xl font-black text-emerald-400 mb-2">{score}/{QUESTIONS.length}</div>
          <p className="text-xs text-slate-400 mb-6">Excellent work! You have a solid grasp of friction.</p>
          <button 
            onClick={resetQuiz}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            <RefreshCcw size={16} /> Retake Quiz
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-xs text-slate-300 leading-relaxed font-medium">
            <span className="text-[10px] text-rose-400 font-bold uppercase tracking-widest block mb-2">Question {currentQuestion + 1}</span>
            {QUESTIONS[currentQuestion].question}
          </div>

          <div className="space-y-2">
            {QUESTIONS[currentQuestion].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className={`w-full p-4 text-left text-xs rounded-lg border transition-all ${
                  isAnswered
                    ? i === QUESTIONS[currentQuestion].correct
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                      : i === selectedOption
                        ? 'bg-rose-500/10 border-rose-500/50 text-rose-400'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{opt}</span>
                  {isAnswered && i === QUESTIONS[currentQuestion].correct && <CheckCircle2 size={16} />}
                  {isAnswered && i === selectedOption && i !== QUESTIONS[currentQuestion].correct && <XCircle size={16} />}
                </div>
              </button>
            ))}
          </div>

          {isAnswered && (
            <button
              onClick={nextQuestion}
              className="w-full py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-sky-600/20"
            >
              {currentQuestion === QUESTIONS.length - 1 ? 'Finish' : 'Next Question'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
