import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export default function SigFigModule() {
  const [userAns, setUserAns] = useState('');
  const [feedback, setFeedback] = useState(null);

  const question = "Calculate the area of a rectangle with length 12.3 cm and width 4.5 cm. Round your answer to the correct number of significant figures.";
  const trueAnswer = "55"; // 12.3 (3 sig figs) * 4.5 (2 sig figs) = 55.35 -> 55 (2 sig figs)
  
  const checkAnswer = () => {
    if (userAns.trim() === trueAnswer) {
      setFeedback({ correct: true, msg: "Correct! Since 4.5 has 2 significant figures, the result must be rounded to 2 significant figures." });
    } else {
      setFeedback({ correct: false, msg: "Incorrect. Remember the rule for multiplication: the result should have the same number of significant figures as the factor with the fewest significant figures." });
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
      <h3 className="text-lg font-bold text-slate-300 mb-4">Significant Figures Challenge</h3>
      
      <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 mb-4">
        <p className="text-slate-300">{question}</p>
      </div>

      <div className="flex gap-3 items-center">
        <input 
          type="text" 
          value={userAns}
          onChange={(e) => setUserAns(e.target.value)}
          placeholder="Enter your answer..."
          className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-sky-500 transition-colors"
        />
        <button 
          onClick={checkAnswer}
          className="bg-sky-600 hover:bg-sky-500 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
        >
          Check
        </button>
      </div>

      {feedback && (
        <div className={`mt-4 p-4 rounded-lg flex gap-3 ${feedback.correct ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-rose-500/20 border border-rose-500/50'}`}>
          {feedback.correct ? <CheckCircle className="text-emerald-400 shrink-0" /> : <XCircle className="text-rose-400 shrink-0" />}
          <p className={feedback.correct ? 'text-emerald-200' : 'text-rose-200'}>{feedback.msg}</p>
        </div>
      )}
    </div>
  );
}
