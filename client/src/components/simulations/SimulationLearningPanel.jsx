import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Target, ScrollText, PlayCircle, HelpCircle, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export default function SimulationLearningPanel() {
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
                ? 'text-emerald-400 bg-emerald-400/10 border-b-2 border-emerald-400'
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
                  <Target size={18} className="text-emerald-500" />
                  Objective
                </h3>
                <p>
                  To understand how simulations can be used to model real-world random events, observe patterns over many trials, and see how experimental results converge towards theoretical expectations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <ScrollText size={18} className="text-emerald-500" />
                  What is a Simulation?
                </h3>
                <p>
                  A simulation is a way to replicate a real-world process or system over time. In statistics and AI, we use simulations to:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-400">
                  <li>Predict future outcomes</li>
                  <li>Understand complex systems (like traffic or queues)</li>
                  <li>Test theories without needing real hardware</li>
                  <li>Generate large amounts of data for training models</li>
                </ul>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="font-semibold text-emerald-400 mb-2">Randomness</h4>
                  <p className="text-xs">Most simulations use "Random Numbers" to decide what happens next, just like how a coin flip is random.</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="font-semibold text-amber-400 mb-2">Trials & Iterations</h4>
                  <p className="text-xs">Running a simulation many times (trials) helps us see the big picture. One flip might be heads, but 1000 flips will be roughly 50% heads.</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h4 className="font-semibold text-sky-400 mb-2">Modeling</h4>
                  <p className="text-xs">A traffic light or a queue is a "Model." We set rules (e.g., green for 30s) and see how cars move through it.</p>
                </div>
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
                <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
                  <PlayCircle size={20} />
                </div>
                <h3 className="text-lg font-bold text-white">How to Run</h3>
              </div>

              <div className="space-y-4 text-sm text-gray-300">
                {[
                  "Choose a simulation type (e.g., Traffic Light, Coin Toss).",
                  "Adjust the 'Number of Trials' and 'Simulation Speed'.",
                  "Use 'Auto Run' for fast results or 'Manual' to step through one-by-one.",
                  "Click 'Start' and watch the animation in the central panel.",
                  "Observe the real-time frequency charts and probability stats.",
                  "Use 'Pause' if you want to analyze a specific state.",
                  "Record your final results in the Observation Table.",
                  "Compare different simulation types to see how randomness differs in each."
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-mono font-bold text-emerald-500">{idx + 1}.</span>
                    <p>{step}</p>
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
      text: "What is the main purpose of a simulation?",
      options: [
        "To make games only",
        "To replicate real-world processes and predict outcomes",
        "To generate random numbers for no reason",
        "To replace real life entirely"
      ],
      correct: 1,
      explanation: "Simulations allow us to study complex systems and predict what might happen in the real world."
    },
    {
      id: 2,
      text: "Why do we run simulations many times (e.g., 1000 trials)?",
      options: [
        "To waste time",
        "Because the computer likes it",
        "To get a more accurate average result",
        "To make the graph look pretty"
      ],
      correct: 2,
      explanation: "More trials help experimental results converge towards the true theoretical probability."
    },
    {
      id: 3,
      text: "In a traffic light simulation, 'Green for 30 seconds' is an example of:",
      options: ["A random event", "A rule/parameter", "An error", "A result"],
      correct: 1,
      explanation: "Rules define how the model behaves. Randomness might come from when cars arrive at the light."
    },
    {
      id: 4,
      text: "Which of these is NOT usually a simulation?",
      options: [
        "A weather forecast model",
        "A flight simulator for pilots",
        "Reading a history book",
        "A crash test model for cars"
      ],
      correct: 2,
      explanation: "Reading a book is learning about the past, not simulating a process over time."
    },
    {
      id: 5,
      text: "What happens to the 'Most Common Outcome' as trials increase?",
      options: [
        "It changes randomly forever",
        "It disappears",
        "It usually stabilizes and matches the highest probability",
        "It always becomes equal to all other outcomes"
      ],
      correct: 2,
      explanation: "Over time, the outcome with the highest theoretical probability will show up most frequently."
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
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
          <HelpCircle size={20} />
        </div>
        <h3 className="text-lg font-bold text-white">Knowledge Check</h3>
      </div>

      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white/5 rounded-xl p-5 border border-white/10">
            <h4 className="text-sm font-semibold text-white mb-4">
              <span className="text-emerald-500 mr-2">Q{idx + 1}.</span>
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
                  if (isSelected) btnClass += "bg-emerald-500/20 border-emerald-500/50 text-emerald-300";
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
                className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
              >
                <p className="text-xs text-emerald-200 flex items-start gap-2">
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
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-600 disabled:text-gray-400 text-white rounded-xl font-bold transition-colors"
          >
            Check Answers
          </button>
        ) : (
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-2">
              Score: <span className="text-emerald-400">{calculateScore()} / {questions.length}</span>
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
