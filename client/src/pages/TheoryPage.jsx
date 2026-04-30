import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, MapPin, Target, Award, List } from 'lucide-react';
import { THEORY_CONTENT } from '../data/semesterContent.js';

export default function TheoryPage() {
  const { semesterId } = useParams();
  const subjects = THEORY_CONTENT[semesterId] || [];
  const [subjectIndex, setSubjectIndex] = useState(0);
  const [chapterIndex, setChapterIndex] = useState(0);

  const selectedSubject = subjects[subjectIndex];
  const chapters = selectedSubject?.chapters || [];
  const selectedChapter = chapters[chapterIndex];

  useEffect(() => {
    setSubjectIndex(0);
    setChapterIndex(0);
  }, [semesterId]);

  if (!subjects.length) {
    return (
      <section className="glass-panel border-amber-500/30 p-8 text-amber-100">
        <h1 className="font-display text-2xl font-semibold">No theory content yet</h1>
        <p className="mt-2 text-sm text-amber-100/80">
          Add PDFs under <code className="bg-amber-500/20 px-1 rounded">client/public/pdfs</code> and update <code className="bg-amber-500/20 px-1 rounded">client/src/data/semesterContent.js</code>.
        </p>
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
        <div className="glass-card p-6 border-t-2 border-t-lab-accent3/50">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={20} className="text-lab-accent3" />
            <h1 className="font-display text-xl font-bold text-white">Theory - {semesterId.toUpperCase()}</h1>
          </div>
          <p className="text-sm text-lab-muted">Select a subject and then choose a unit.</p>

          <div className="mt-6 flex flex-col gap-3">
            <div className="text-xs font-bold uppercase tracking-wider text-lab-muted mb-1">Subjects</div>
            {subjects.map((subject, index) => (
              <button
                type="button"
                key={subject.subject}
                onClick={() => {
                  setSubjectIndex(index);
                  setChapterIndex(0);
                }}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                  subjectIndex === index
                    ? 'border-lab-accent3/40 bg-lab-accent3/10 text-white shadow-[0_4px_20px_rgba(56,189,248,0.1)]'
                    : 'border-white/5 bg-white/5 text-lab-muted hover:border-white/20 hover:text-white'
                }`}
              >
                <p className="text-sm font-semibold">{subject.subject}</p>
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-2">
            <div className="text-xs font-bold uppercase tracking-wider text-lab-muted mb-2">Units</div>
            {chapters.map((chapter, index) => (
              <button
                type="button"
                key={chapter.title}
                onClick={() => setChapterIndex(index)}
                className={`relative w-full rounded-lg px-4 py-2.5 text-left text-sm transition-all ${
                  chapterIndex === index
                    ? 'bg-lab-accent/15 text-lab-accent font-semibold'
                    : 'text-lab-muted hover:bg-white/5 hover:text-white'
                }`}
              >
                {chapterIndex === index && (
                  <div className="absolute left-0 top-1/2 -mt-2.5 h-5 w-1 rounded-r-full bg-lab-accent" />
                )}
                {chapter.title}
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
          {selectedChapter ? (
            <motion.div 
              key={selectedChapter.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="font-display text-3xl font-bold text-white tracking-tight">{selectedChapter.title}</h2>
              {selectedChapter.details && (
                <p className="mt-4 text-[15px] leading-relaxed text-lab-muted/90">{selectedChapter.details}</p>
              )}
              {selectedChapter.applications && (
                <div className="mt-6 rounded-xl border border-lab-accent/20 bg-lab-accent/5 p-4 text-[14px] text-lab-muted">
                  <span className="font-semibold text-lab-accent flex items-center gap-2 mb-2">
                    <Target size={16} /> Applications
                  </span>
                  {selectedChapter.applications}
                </div>
              )}

              {selectedChapter.notesPdf && (
                <div className="mt-8">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                    <BookOpen size={20} className="text-lab-accent" /> Chapter Notes
                  </h3>
                  <div className="w-full aspect-[1/1.414] max-h-[800px] rounded-xl overflow-hidden border border-white/10 bg-white/5 relative group">
                    <div className="absolute inset-0 flex items-center justify-center text-lab-muted opacity-50 z-0">
                      Loading PDF...
                    </div>
                    <iframe 
                      src={selectedChapter.notesPdf} 
                      title={`${selectedChapter.title} Notes`}
                      className="w-full h-full border-0 relative z-10 bg-transparent"
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 space-y-6 rounded-2xl border border-white/5 bg-[#0f172a]/40 p-6 backdrop-blur-md">
                {selectedSubject?.meta && (
                  <div className="flex items-center gap-2 text-xs font-semibold text-lab-muted uppercase tracking-wider mb-4 pb-4 border-b border-white/10">
                    <MapPin size={14} className="text-lab-accent2" />
                    {selectedSubject.meta.programme} &bull; Semester {selectedSubject.meta.semester} &bull; Credits {selectedSubject.meta.credits} &bull; Contact Hours {selectedSubject.meta.hours}
                  </div>
                )}
                
                {selectedSubject?.objectives?.length > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-lab-accent3 uppercase tracking-wider">
                      <Target size={16} /> Course Objectives
                    </h3>
                    <ul className="mt-3 list-disc space-y-2 pl-6 text-[14px] text-lab-muted">
                      {selectedSubject.objectives.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedSubject?.outcomes?.length > 0 && (
                  <div className="pt-4 border-t border-white/5">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-lab-accent uppercase tracking-wider">
                      <Award size={16} /> Course Outcomes
                    </h3>
                    <ul className="mt-3 list-disc space-y-2 pl-6 text-[14px] text-lab-muted">
                      {selectedSubject.outcomes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedSubject?.books?.length > 0 && (
                  <div className="pt-4 border-t border-white/5">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-lab-accent2 uppercase tracking-wider">
                      <List size={16} /> Text Books
                    </h3>
                    <ul className="mt-3 list-disc space-y-2 pl-6 text-[14px] text-lab-muted">
                      {selectedSubject.books.map((book) => (
                        <li key={book}>{book}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <p className="text-sm text-lab-muted">Select a unit to view details.</p>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
