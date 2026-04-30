import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle } from 'lucide-react';

export default function EnergyQuiz() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      q: "At the highest point of its path, a ball's energy is mostly...",
      options: ["Kinetic", "Potential", "Thermal", "Zero"],
      correct: 1
    },
    {
      id: 2,
      q: "What happens to the total mechanical energy in an ideal (frictionless) system?",
      options: ["It increases", "It decreases", "It remains constant", "It doubles"],
      correct: 2
    },
    {
      id: 3,
      q: "Which form does energy transform into when friction is present?",
      options: ["Potential Energy", "Kinetic Energy", "Thermal Energy (Heat)", "Nuclear Energy"],
      correct: 2
    }
  ];

  const handleSelect = (qId, idx) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qId]: idx }));
  };

  const score = questions.filter(q => answers[q.id] === q.correct).length;

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full">
      <h3 className="text-lg font-bold text-slate-300 flex items-center gap-2 mb-6">
        <HelpCircle size={20} className="text-amber-400" /> Concept Check
      </h3>

      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="space-y-3">
            <p className="text-sm text-slate-300 font-medium">{q.id}. {q.q}</p>
            <div className="grid grid-cols-1 gap-2">
              {q.options.map((opt, idx) => {
                const isSelected = answers[q.id] === idx;
                const isCorrect = q.correct === idx;
                
                let btnClass = "text-left p-3 rounded-lg border text-xs transition-all ";
                if (!showResults) {
                  btnClass += isSelected 
                    ? "bg-amber-500/20 border-amber-500/50 text-amber-200" 
                    : "bg-slate-900 border-slate-700 hover:border-slate-500 text-slate-400";
                } else {
                  if (isCorrect) btnClass += "bg-emerald-500/20 border-emerald-500/50 text-emerald-200";
                  else if (isSelected) btnClass += "bg-rose-500/20 border-rose-500/50 text-rose-200";
                  else btnClass += "bg-slate-900 border-slate-700 opacity-50 text-slate-500";
                }

                return (
                  <button 
                    key={idx}
                    onClick={() => handleSelect(q.id, idx)}
                    className={btnClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {showResults && isCorrect && <CheckCircle size={14} />}
                      {showResults && isSelected && !isCorrect && <XCircle size={14} />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!showResults ? (
        <button 
          onClick={() => setShowResults(true)}
          disabled={Object.keys(answers).length < questions.length}
          className="w-full mt-8 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-amber-500/20"
        >
          Submit Quiz
        </button>
      ) : (
        <div className="mt-8 p-4 bg-slate-900 rounded-lg border border-slate-700 text-center">
          <p className="text-slate-400 text-sm mb-1">Your Score</p>
          <p className="text-2xl font-bold text-white">{score} / {questions.length}</p>
          <button 
            onClick={() => { setAnswers({}); setShowResults(false); }}
            className="mt-3 text-xs text-amber-400 hover:underline"
          >
            Retry Quiz
          </button>
        </div>
      )}
    </div>
  );
}
