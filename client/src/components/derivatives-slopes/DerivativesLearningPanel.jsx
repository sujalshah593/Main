import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Book, Target, ListOrdered, Brain, CheckCircle, XCircle } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What does the first derivative f'(x) represent?",
    options: ["The area under the curve", "The rate of change or tangent slope", "The y-intercept", "The concavity of the curve"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "If f'(x) = 0 at a certain point, that point is called a:",
    options: ["Inflection point", "Critical point", "Asymptote", "Discontinuity"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "What does a negative first derivative f'(x) < 0 indicate about the function?",
    options: ["The function is increasing", "The function is decreasing", "The function is concave down", "The function has a local minimum"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "Which of the following is true regarding secant and tangent lines?",
    options: ["A tangent line intersects the curve at exactly two points.", "As the distance between two points approaches zero, the secant line approaches the tangent line.", "The secant line represents the instantaneous rate of change.", "The tangent line is only used for linear functions."],
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
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500">
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

export default function DerivativesLearningPanel() {
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

  return (
    <div className="flex flex-col gap-4">
      {/* Objective */}
      <Section title="Objective" icon={Target} defaultOpen={true}>
        <p>
          To visually understand derivatives, instantaneous rates of change, tangent slopes, and secant limits, which are foundational concepts in Calculus, AI Optimization, and Physics.
        </p>
      </Section>

      {/* Theory */}
      <Section title="Theory & Concepts" icon={Book} defaultOpen={true}>
        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-1">Derivatives & Slopes</h4>
            <p className="mb-3">The derivative of a function measures how its output changes relative to its input. Geometrically, it is the slope of the tangent line to the curve at any given point.</p>
            <ul className="space-y-2">
              <li><strong className="text-amber-300">Tangent Line: </strong> A straight line that "just touches" the curve at a point, representing the instantaneous rate of change.</li>
              <li><strong className="text-amber-300">Secant Line: </strong> A line passing through two points on the curve. As the distance between these points ($\Delta x$) approaches zero, the secant approaches the tangent.</li>
              <li><strong className="text-amber-300">Critical Points: </strong> Points where $f'(x) = 0$. These can be local maxima, minima, or saddle points.</li>
              <li><strong className="text-amber-300">Second Derivative: </strong> Measures the rate of change of the slope itself (concavity).</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Procedure */}
      <Section title="Procedure" icon={ListOrdered}>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Select a function type (Linear, Quadratic, etc.) from the controls.</li>
          <li>Adjust the parameters (a, b, c) using sliders to reshape the curve.</li>
          <li>Move the $x$-slider to trace a point along the curve and observe the Tangent Line and its slope.</li>
          <li>Toggle the <strong>Animate Secant Line</strong> to see how the limit $\Delta x \to 0$ works.</li>
          <li>Toggle <strong>Show First/Second Derivative</strong> to see how the slope graph correlates to the original function.</li>
          <li>Review the Algebraic Steps panel next to the graph to learn the symbolic rules used.</li>
          <li>Record observations and take the quiz.</li>
        </ol>
      </Section>

      {/* Results / Conclusion */}
      <Section title="Live Conclusion" icon={Brain} defaultOpen={true}>
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <p className="text-amber-200 mb-2">
            <strong>Conclusion:</strong> The derivative gives the instantaneous rate of change.
          </p>
          <ul className="list-disc pl-4 text-amber-200/80 space-y-1">
            <li>Positive slope ($f' \gt 0$) means the function is increasing.</li>
            <li>Negative slope ($f' \lt 0$) means the function is decreasing.</li>
            <li>Zero slope ($f' = 0$) marks a critical point (potential max/min).</li>
            <li>The Second derivative helps identify concavity.</li>
          </ul>
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
                    if (isSelected) btnClass += "bg-amber-500/20 border-amber-500/50 text-white";
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
              className="w-full py-3 mt-4 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-bold rounded-xl border border-amber-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answers
            </button>
          ) : (
            <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-lg font-bold text-white mb-1">
                Score: <span className="text-amber-400">{calculateScore()}</span> / {QUIZ_QUESTIONS.length}
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
