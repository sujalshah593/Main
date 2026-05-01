import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Target, ScrollText, PlayCircle, HelpCircle, AlertCircle, ChevronDown, CheckCircle2, XCircle } from 'lucide-react';

export default function ProbabilityLearningPanel() {
  const [activeTab, setActiveTab] = useState('theory');
  const [expandedSection, setExpandedSection] = useState('basic');

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
                ? 'text-amber-400 bg-amber-400/10 border-b-2 border-amber-400'
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
                  <Target size={18} className="text-amber-500" />
                  Objective
                </h3>
                <p>
                  To understand and experimentally verify basic probability concepts including simple events, compound events, and the relationship between theoretical and experimental probability.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <ScrollText size={18} className="text-amber-500" />
                  Key Concepts
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">Sample Space (S)</h4>
                    <p className="text-sm">The set of all possible outcomes of an experiment. For a coin, S = {'{H, T}'}. For a die, S = {'{1, 2, 3, 4, 5, 6}'}.</p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">Theoretical Probability</h4>
                    <p className="text-sm mb-2">The calculated probability based on equally likely outcomes.</p>
                    <div className="bg-black/30 p-2 rounded text-center font-mono text-amber-200 border border-white/5">
                      P(E) = (Favorable Outcomes) / (Total Possible Outcomes)
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">Experimental Probability</h4>
                    <p className="text-sm mb-2">The ratio of the number of times an event occurs to the total number of trials performed.</p>
                    <div className="bg-black/30 p-2 rounded text-center font-mono text-amber-200 border border-white/5">
                      P(E) = (Times Event Occurred) / (Total Trials)
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold text-amber-400 mb-2">Law of Large Numbers</h4>
                    <p className="text-sm">As the number of trials increases, the experimental probability tends to converge towards the theoretical probability.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3">Types of Events</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-300 ml-2">
                  <li><strong className="text-white">Simple Event:</strong> An event with a single outcome.</li>
                  <li><strong className="text-white">Complementary Event (A'):</strong> The event that 'A' does not occur. P(A') = 1 - P(A).</li>
                  <li><strong className="text-white">Independent Events:</strong> Events where the outcome of one does not affect the other. P(A and B) = P(A) × P(B).</li>
                  <li><strong className="text-white">Mutually Exclusive Events:</strong> Events that cannot occur at the same time. P(A or B) = P(A) + P(B).</li>
                </ul>
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
                <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
                  <PlayCircle size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">Simulation Steps</h3>
              </div>

              <div className="space-y-4">
                {[
                  "Select the type of experiment from the controls (Coin, Dice, Cards, Spinner, Marbles, RNG).",
                  "Review the Theoretical Probability calculated for the selected event.",
                  "Set the number of trials using the slider or input field.",
                  "Click 'Run Simulation' to execute the trials. For large numbers (>50), the simulation will run instantly in 'Fast Mode'.",
                  "Observe the outcomes in the visualization area and the real-time updating charts.",
                  "Compare the Experimental Probability with the Theoretical Probability.",
                  "Click 'Record Observation' to save the current run to your table.",
                  "Repeat with a larger number of trials to observe the Law of Large Numbers in effect."
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-mono text-sm border border-amber-500/30">
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
      text: "If you flip a fair coin 3 times, what is the probability of getting exactly 3 heads?",
      options: ["1/2", "1/4", "1/8", "1/6"],
      correct: 2,
      explanation: "Each flip is independent. P(H) = 1/2. P(H and H and H) = 1/2 * 1/2 * 1/2 = 1/8."
    },
    {
      id: 2,
      text: "Which of the following probabilities is impossible?",
      options: ["0", "0.5", "1", "1.2"],
      correct: 3,
      explanation: "Probability must always be a value between 0 and 1, inclusive."
    },
    {
      id: 3,
      text: "If P(A) = 0.3, what is the probability of the complement, P(A')?",
      options: ["0.3", "0.7", "1.3", "0"],
      correct: 1,
      explanation: "The sum of probabilities of an event and its complement is always 1. P(A') = 1 - 0.3 = 0.7."
    },
    {
      id: 4,
      text: "What does the Law of Large Numbers state?",
      options: [
        "Large numbers are more probable than small numbers.",
        "As trials increase, experimental probability approaches theoretical probability.",
        "Theoretical probability changes with more trials.",
        "Large experiments are more accurate than small ones."
      ],
      correct: 1,
      explanation: "With a large number of trials, the observed frequencies tend to closely match the expected (theoretical) probabilities."
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
        <div className="p-2.5 bg-sky-500/20 text-sky-400 rounded-lg border border-sky-500/30">
          <HelpCircle size={20} />
        </div>
        <h3 className="text-lg font-bold text-white">Knowledge Check</h3>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h4 className="text-sm font-semibold text-white mb-4">
              <span className="text-amber-500 mr-2">Q{idx + 1}.</span>
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
                className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg"
              >
                <p className="text-xs text-amber-200 flex items-start gap-2">
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
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-600 disabled:text-gray-400 text-white rounded-xl font-bold transition-colors"
          >
            Submit Answers
          </button>
        ) : (
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">
              Score: <span className="text-amber-400">{calculateScore()} / {questions.length}</span>
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
