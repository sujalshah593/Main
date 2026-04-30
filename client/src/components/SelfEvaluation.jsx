import { useMemo, useState } from 'react';

export default function SelfEvaluation({ questions = [] }) {
  const [answers, setAnswers] = useState({});

  const score = useMemo(() => {
    if (!questions.length) return null;
    let correct = 0;
    questions.forEach((q, idx) => {
      if (Number(answers[idx]) === q.correctIndex) correct += 1;
    });
    return { correct, total: questions.length };
  }, [answers, questions]);

  if (!questions.length) {
    return <p className="text-slate-400">Self evaluation questions will appear here once configured.</p>;
  }

  return (
    <div className="space-y-6">
      {questions.map((q, idx) => (
        <fieldset key={idx} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <legend className="px-1 text-sm font-semibold text-slate-100">{`Question ${idx + 1}`}</legend>
          <p className="mb-3 text-sm text-slate-300">{q.question}</p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => (
              <label key={oi} className="flex cursor-pointer items-center gap-2 text-sm text-slate-200">
                <input
                  type="radio"
                  name={`q-${idx}`}
                  value={oi}
                  checked={Number(answers[idx]) === oi}
                  onChange={() => setAnswers((prev) => ({ ...prev, [idx]: oi }))}
                  className="border-slate-600 text-sky-500 focus:ring-sky-500"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      {score && (
        <div className="rounded-lg border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
          Score: <span className="font-semibold text-sky-300">{score.correct}</span> / {score.total}
        </div>
      )}
    </div>
  );
}
