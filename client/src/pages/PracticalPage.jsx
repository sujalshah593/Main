import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Target, Award, CodeSquare, FileText } from 'lucide-react';
import { PRACTICAL_CONTENT } from '../data/semesterContent.js';
import PracticalFeedback from '../components/shared/PracticalFeedback.jsx';

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
    <>
    <section className="grid gap-6 lg:grid-cols-[340px,1fr]">
      <motion.aside 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-6"
      >
        <div className="glass-card p-6 border-t-2 border-t-lab-primary">
          <div className="flex items-center gap-3 mb-2">
            <FlaskConical size={20} className="text-lab-primary" />
            <h1 className="font-display text-xl font-black text-black dark:text-black dark:text-white tracking-tight">Practical - {semesterId.toUpperCase()}</h1>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 font-bold">Select a practical subject below.</p>

          <div className="mt-6 flex flex-col gap-3">
            <div className="text-[11px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-500 mb-1">Subjects</div>
            {subjects.map((subject, index) => (
              <button
                type="button"
                key={subject.subject}
                onClick={() => setSubjectIndex(index)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                  subjectIndex === index
                    ? 'border-lab-primary/30 bg-lab-primary/10 text-lab-primary shadow-sm'
                    : 'border-transparent bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <p className="text-sm font-bold">{subject.subject}</p>
              </button>
            ))}
          </div>
        </div>
      </motion.aside>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="lab-page-container"
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
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black text-black dark:text-white tracking-tight">{selectedSubject.subject}</h2>
              <p className="mt-4 text-[13px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-400">
                Credits {selectedSubject.meta?.credits} &bull; Contact Hours {selectedSubject.meta?.hours} &bull;{' '}
                <span className="text-amber-700 dark:text-amber-500">{selectedSubject.meta?.type}</span>
              </p>

              <div className="mt-8 space-y-6">
                {selectedSubject.objectives?.length > 0 && (
                  <div className="rounded-3xl border border-slate-700 bg-[#7A1540] dark:bg-[#7A1540] dark:bg-slate-900 text-white p-8 shadow-2xl text-white">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">
                      <Target size={16} /> Course Objectives
                    </h3>
                    <ul className="list-disc space-y-3 pl-6 text-[15px] text-slate-200 font-medium">
                      {selectedSubject.objectives.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="rounded-3xl border border-slate-700 bg-[#7A1540] dark:bg-[#7A1540] dark:bg-slate-900 text-white p-8 shadow-2xl text-white">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-sky-400 uppercase tracking-wider">
                      <FlaskConical size={16} /> List of Practical Experiments
                    </h3>
                    {selectedSubject.defaultPdf && (
                      <a 
                        href={selectedSubject.defaultPdf} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-lab-accent/10 border border-lab-accent/20 px-4 py-2 text-xs font-bold text-lab-accent transition-all hover:bg-lab-accent/20 hover:shadow-[0_0_15px_rgba(45,212,191,0.2)]"
                      >
                        <FileText size={14} />
                        View Lab Manual
                      </a>
                    )}
                  </div>
                  <ol className="list-decimal space-y-3 pl-6 text-[15px] text-slate-200 font-medium">
                    {selectedSubject.experiments.map((item, i) => (
                      <li key={i}>
                        {typeof item === 'string' ? (
                          item
                        ) : (
                          <Link to={item.path} className="text-sky-400 hover:text-sky-300 hover:underline transition-all font-bold">
                            {item.title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>

                {selectedSubject.outcomes?.length > 0 && (
                  <div className="rounded-3xl border border-slate-700 bg-[#7A1540] dark:bg-[#7A1540] dark:bg-slate-900 text-white p-8 shadow-2xl text-white">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-violet-400 uppercase tracking-wider mb-4">
                      <Award size={16} /> Course Outcomes
                    </h3>
                    <ul className="list-disc space-y-3 pl-6 text-[15px] text-slate-200 font-medium">
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
                  className="btn-primary inline-flex items-center gap-3 px-8 py-4"
                >
                  <CodeSquare size={20} />
                  Open Python Editor
                </Link>
              </div>
              <PracticalFeedback 
                experimentTitle={`${semesterId.toUpperCase()} Laboratory Portal`} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  </>
  );
}
