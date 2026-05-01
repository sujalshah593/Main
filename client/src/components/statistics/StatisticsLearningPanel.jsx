import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Target, ScrollText, PlayCircle, HelpCircle, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export default function StatisticsLearningPanel() {
  const [activeTab, setActiveTab] = useState('theory');

  const tabs = [
    { id: 'theory', icon: BookOpen, label: 'Theory' },
    { id: 'procedure', icon: PlayCircle, label: 'Procedure' },
    { id: 'quiz', icon: HelpCircle, label: 'Quiz' },
  ];

  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full bg-[#0f172a]/60 backdrop-blur-md">
      <div className="flex border-b border-white/10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'text-sky-400 bg-sky-400/10 border-b-2 border-sky-400'
                : 'text-lab-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
        <AnimatePresence mode="wait">
          {activeTab === 'theory' && (
            <motion.div
              key="theory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 text-sm text-gray-300 leading-relaxed"
            >
              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Target size={18} className="text-sky-500" />
                  Objective
                </h3>
                <p>
                  To understand the basic concepts of statistics by computing the Mean, Variance, and Standard Deviation of small datasets, and to visualize how data spread affects these values.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <ScrollText size={18} className="text-sky-500" />
                  Basic Concepts
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold text-sky-400 mb-2 text-base">Mean (Average)</h4>
                    <p className="text-sm mb-2">The mean is the central value of a set of numbers. It represents the "typical" value in the dataset.</p>
                    <div className="bg-black/30 p-2 rounded text-center font-mono text-sky-200 border border-white/5 text-xs">
                      Mean (μ) = (Sum of all values) ÷ (Total number of values)
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2 text-base">Variance</h4>
                    <p className="text-sm mb-2">Variance measures how far the numbers are spread out from their average value. A higher variance means the data is widely spread.</p>
                    <div className="bg-black/30 p-2 rounded text-center font-mono text-amber-200 border border-white/5 text-[10px] leading-tight">
                      1. Find difference between each value and the mean.<br/>
                      2. Square each difference.<br/>
                      3. Find the average of these squared differences.
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold text-emerald-400 mb-2 text-base">Standard Deviation</h4>
                    <p className="text-sm mb-2">Standard deviation is just the square root of the variance. It is very useful because it uses the exact same units as your original data (e.g., marks, meters).</p>
                    <div className="bg-black/30 p-2 rounded text-center font-mono text-emerald-200 border border-white/5 text-xs">
                      Std Dev (σ) = √Variance
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold text-fuchsia-400 mb-2 text-base">Range</h4>
                    <p className="text-sm">The simplest measure of spread. It is simply the difference between the Highest (Maximum) and Lowest (Minimum) values in your dataset.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-sky-500/10 p-4 rounded-xl border border-sky-500/20">
                <p className="text-xs text-sky-300">
                  <strong>Note:</strong> In this beginner laboratory, we are using the <em>Population Variance</em> formula (dividing by N) to make the calculations easier to understand.
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'procedure' && (
            <motion.div
              key="procedure"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-lg border border-sky-500/30">
                  <PlayCircle size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Experiment Steps</h3>
              </div>

              <div className="space-y-4">
                {[
                  "Select a Dataset Preset (like Student Marks, Heights) or enter your own numbers separated by commas.",
                  "Click the 'Calculate' button if the auto-calculation is off.",
                  "Look at the Graph area. Notice how the values are distributed. The solid line represents the Mean (Average).",
                  "Scroll through the 'Step-by-Step Calculator' to see exactly how the math works for your numbers.",
                  "Try changing one number to a very high value and observe how it affects the Mean and Standard Deviation.",
                  "Turn on 'Compare Mode' and add a second dataset. Compare a dataset that is tightly packed vs one that is widely spread out.",
                  "Click 'Record Observation' to save your dataset summary to the table.",
                  "Once you are comfortable with the concepts, take the Quiz!"
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold font-mono text-sm border border-sky-500/30">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-gray-300 mt-1.5">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <QuizSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function QuizSection() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Which of the following describes the Mean of a dataset?",
      options: [
        "The highest value minus the lowest value",
        "The most common value",
        "The average value (sum divided by count)",
        "The middle value when sorted"
      ],
      correct: 2,
      explanation: "The mean is calculated by adding all values together and dividing by the total number of values."
    },
    {
      id: 2,
      text: "If all students in a class score exactly 80 marks, what is the Standard Deviation?",
      options: ["80", "1", "0", "Cannot be calculated"],
      correct: 2,
      explanation: "Since all values are identical, there is no spread. Therefore, the variance and standard deviation are both 0."
    },
    {
      id: 3,
      text: "A larger standard deviation indicates that:",
      options: [
        "The data values are very close to the mean",
        "The data values are widely spread out from the mean",
        "The mean is very large",
        "There are errors in the data"
      ],
      correct: 1,
      explanation: "Standard deviation measures spread. A larger number means the data points are further away from the average."
    },
    {
      id: 4,
      text: "How is the Range of a dataset calculated?",
      options: [
        "Highest Value + Lowest Value",
        "Highest Value × Lowest Value",
        "Highest Value ÷ Lowest Value",
        "Highest Value - Lowest Value"
      ],
      correct: 3,
      explanation: "The range is simply the difference between the maximum and minimum values in your dataset."
    },
    {
      id: 5,
      text: "Standard Deviation is related to Variance in what way?",
      options: [
        "It is the square of the variance",
        "It is half of the variance",
        "It is the square root of the variance",
        "It is exactly the same as the variance"
      ],
      correct: 2,
      explanation: "Standard deviation is calculated by taking the square root of the variance."
    }
  ];

  const handleOptionSelect = (qId, optionIdx) => {
    if (showResults) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) score++;
    });
    return score;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-fuchsia-500/20 text-fuchsia-400 rounded-lg border border-fuchsia-500/30">
          <HelpCircle size={20} />
        </div>
        <h3 className="text-lg font-bold text-white">Beginner Quiz</h3>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h4 className="text-sm font-semibold text-white mb-4">
              <span className="text-sky-400 mr-2">Q{idx + 1}.</span>
              {q.text}
            </h4>
            
            <div className="space-y-2">
              {q.options.map((opt, optIdx) => {
                const isSelected = answers[q.id] === optIdx;
                const isCorrect = showResults && optIdx === q.correct;
                const isWrong = showResults && isSelected && optIdx !== q.correct;
                
                let btnClass = "w-full text-left px-4 py-3 rounded-lg text-sm transition-all border ";
                
                if (showResults) {
                  if (isCorrect) btnClass += "bg-emerald-500/20 border-emerald-500/50 text-emerald-300";
                  else if (isWrong) btnClass += "bg-red-500/20 border-red-500/50 text-red-300";
                  else btnClass += "bg-white/5 border-white/5 text-gray-500";
                } else {
                  if (isSelected) btnClass += "bg-sky-500/20 border-sky-500/50 text-sky-300";
                  else btnClass += "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10";
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleOptionSelect(q.id, optIdx)}
                    disabled={showResults}
                    className={btnClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt}</span>
                      {showResults && isCorrect && <CheckCircle2 size={16} className="text-emerald-400" />}
                      {showResults && isWrong && <XCircle size={16} className="text-red-400" />}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {showResults && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-3 bg-sky-500/10 border border-sky-500/20 rounded-lg"
              >
                <p className="text-xs text-sky-200 flex items-start gap-2">
                  <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                  {q.explanation}
                </p>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/10">
        {!showResults ? (
          <button
            onClick={() => setShowResults(true)}
            disabled={Object.keys(answers).length !== questions.length}
            className="w-full py-3 bg-sky-500 hover:bg-sky-600 disabled:bg-gray-600 disabled:text-gray-400 text-white rounded-xl font-bold transition-colors"
          >
            Check Answers
          </button>
        ) : (
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">
              Score: <span className="text-sky-400">{calculateScore()} / {questions.length}</span>
            </div>
            <button
              onClick={() => {
                setAnswers({});
                setShowResults(false);
              }}
              className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Retry Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
