import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "What is the primary role of a flywheel in mechanical systems?",
    options: [
      "To increase friction in bearings",
      "To store rotational kinetic energy",
      "To change the direction of rotation",
      "To measure angular acceleration"
    ],
    correct: 1
  },
  {
    id: 2,
    question: "Which factor does NOT affect the moment of inertia of a flywheel?",
    options: [
      "Mass of the flywheel",
      "Distribution of mass from the axis",
      "Angular velocity of the flywheel",
      "Radius of the flywheel"
    ],
    correct: 2
  },
  {
    id: 3,
    question: "If the mass is detached after N turns, what causes the flywheel to eventually stop?",
    options: [
      "Centripetal force",
      "Gravity acting on the axle",
      "Frictional torque in the bearings",
      "Conservation of angular momentum"
    ],
    correct: 2
  }
];

export default function FlywheelQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionClick = (idx) => {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    if (idx === QUESTIONS[currentIdx].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return (
      <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center">
        <CheckCircle2 size={48} className="mx-auto text-emerald-500 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Quiz Completed!</h3>
        <p className="text-slate-400 mb-6">Your score: <span className="text-white font-bold">{score} / {QUESTIONS.length}</span></p>
        <button 
          onClick={() => {
            setCurrentIdx(0);
            setSelected(null);
            setShowFeedback(false);
            setScore(0);
            setIsFinished(false);
          }}
          className="px-6 py-2 bg-lab-accent hover:bg-lab-accent/80 text-white rounded-lg font-bold transition-all"
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const q = QUESTIONS[currentIdx];

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="text-lab-accent3" size={20} />
        <h3 className="font-display font-bold text-white uppercase tracking-wider text-sm">Concept Check</h3>
        <span className="ml-auto text-[10px] text-slate-500 font-bold">Q {currentIdx + 1}/{QUESTIONS.length}</span>
      </div>

      <p className="text-white font-medium mb-6">{q.question}</p>

      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          let styles = "w-full text-left p-4 rounded-lg border text-sm transition-all ";
          if (!showFeedback) {
            styles += "bg-slate-900/50 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-900";
          } else {
            if (idx === q.correct) styles += "bg-emerald-500/10 border-emerald-500 text-emerald-400";
            else if (idx === selected) styles += "bg-red-500/10 border-red-500 text-red-400";
            else styles += "bg-slate-900/50 border-slate-700 text-slate-500 opacity-50";
          }

          return (
            <button 
              key={idx} 
              onClick={() => handleOptionClick(idx)}
              className={styles}
              disabled={showFeedback}
            >
              <div className="flex items-center justify-between">
                <span>{opt}</span>
                {showFeedback && idx === q.correct && <CheckCircle2 size={16} />}
                {showFeedback && idx === selected && idx !== q.correct && <XCircle size={16} />}
              </div>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <button 
          onClick={nextQuestion}
          className="mt-6 w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all"
        >
          {currentIdx === QUESTIONS.length - 1 ? 'Finish' : 'Next Question'} <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
