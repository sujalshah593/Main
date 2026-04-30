import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Target, Award, CodeSquare } from 'lucide-react';
import { PRACTICAL_CONTENT } from '../data/semesterContent.js';

export default function PracticalPage() {
  const { semesterId } = useParams();
  const subjects = PRACTICAL_CONTENT[semesterId] || [];
  const [subjectIndex, setSubjectIndex] = useState(0);
  const selectedSubject = subjects[subjectIndex];

  if (!subjects.length) {
    return (
      <section className="glass-panel border-amber-500/30 p-8 text-amber-100">
        <h1 className="font-display text-2xl font-semibold">No practical content yet</h1>
        <p className="mt-2 text-sm text-amber-100/80">Add practical content in `client/src/data/semesterContent.js`.</p>
      </section>
    );
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[340px,1fr]">
      <motion.aside 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-6"
      >
        <div className="glass-card p-6 border-t-2 border-t-lab-accent/50">
          <div className="flex items-center gap-3 mb-2">
            <FlaskConical size={20} className="text-lab-accent" />
            <h1 className="font-display text-xl font-bold text-white">Practical - {semesterId.toUpperCase()}</h1>
          </div>
          <p className="text-sm text-lab-muted">Select a practical subject.</p>

          <div className="mt-6 flex flex-col gap-3">
            <div className="text-xs font-bold uppercase tracking-wider text-lab-muted mb-1">Subjects</div>
            {subjects.map((subject, index) => (
              <button
                type="button"
                key={subject.subject}
                onClick={() => setSubjectIndex(index)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                  subjectIndex === index
                    ? 'border-lab-accent/40 bg-lab-accent/10 text-white shadow-[0_4px_20px_rgba(45,212,191,0.1)]'
                    : 'border-white/5 bg-white/5 text-lab-muted hover:border-white/20 hover:text-white'
                }`}
              >
                <p className="text-sm font-semibold">{subject.subject}</p>
              </button>
            ))}
          </div>
        </div>
      </motion.aside>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-8"
      >
        <AnimatePresence mode="wait">
          {selectedSubject && (
            <motion.div
              key={selectedSubject.subject}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-display text-3xl font-bold text-white tracking-tight">{selectedSubject.subject}</h2>
              <p className="mt-3 text-sm font-medium uppercase tracking-wider text-lab-muted">
                Credits {selectedSubject.meta?.credits} &bull; Contact Hours {selectedSubject.meta?.hours} &bull;{' '}
                <span className="text-lab-accent2">{selectedSubject.meta?.type}</span>
              </p>

              <div className="mt-8 space-y-6">
                {selectedSubject.objectives?.length > 0 && (
                  <div className="rounded-2xl border border-white/5 bg-[#0f172a]/40 p-6 backdrop-blur-md">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-lab-accent3 uppercase tracking-wider mb-3">
                      <Target size={16} /> Course Objectives
                    </h3>
                    <ul className="list-disc space-y-2 pl-6 text-[14px] text-lab-muted">
                      {selectedSubject.objectives.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="rounded-2xl border border-lab-accent/10 bg-lab-accent/5 p-6 backdrop-blur-md">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-lab-accent uppercase tracking-wider mb-3">
                    <FlaskConical size={16} /> List of Practical Experiments
                  </h3>
                  <ol className="list-decimal space-y-2 pl-6 text-[14px] text-lab-muted">
                    {selectedSubject.experiments.map((item, i) => (
                      <li key={i}>
                        {typeof item === 'string' ? (
                          item
                        ) : (
                          <Link to={item.path} className="text-lab-accent hover:text-lab-accent/80 hover:underline transition-all">
                            {item.title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>

                {selectedSubject.outcomes?.length > 0 && (
                  <div className="rounded-2xl border border-white/5 bg-[#0f172a]/40 p-6 backdrop-blur-md">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-lab-accent2 uppercase tracking-wider mb-3">
                      <Award size={16} /> Course Outcomes
                    </h3>
                    <ul className="list-disc space-y-2 pl-6 text-[14px] text-lab-muted">
                      {selectedSubject.outcomes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <Link
                  to="/python-editor"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-lab-accent3 to-lab-accent3/80 px-6 py-3 text-sm font-bold text-[#040b16] transition-transform hover:scale-105 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
                >
                  <CodeSquare size={18} />
                  Open Python Editor
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
