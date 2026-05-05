import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BookOpen, TerminalSquare, FlaskConical, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import ThemeToggle from './ThemeToggle.jsx';

const linkClass = (isActive, isOpen) =>
  [
    'group flex items-center rounded-xl font-bold transition-all duration-200',
    isOpen ? 'px-4 py-3 gap-3 text-[14px]' : 'p-3 justify-center text-[14px]',
    isActive
      ? 'bg-amber-100 text-amber-700 shadow-sm'
      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100',
  ].join(' ');

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`hidden shrink-0 border-r border-lab-panelBorder bg-white dark:bg-slate-900 md:flex flex-col relative z-20 transition-all duration-300 ${isOpen ? 'w-72 shadow-lg' : 'w-[88px]'}`}>
      <div className="flex h-full flex-col px-4 py-8">

        {/* Header */}
        <div className={`flex items-start mb-10 ${isOpen ? 'justify-between px-2' : 'flex-col items-center gap-6'} overflow-hidden`}>
          <div className="flex flex-col items-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-lab-primary to-lab-secondary text-white shadow-lg shadow-lab-primary/20 shrink-0">
              <FlaskConical size={20} strokeWidth={2.5} />
            </div>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col items-start mt-3 overflow-hidden whitespace-nowrap"
                >
                  <div className="text-xl font-display font-black text-slate-900 dark:text-white tracking-tight">Virtual Lab</div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Scientific Portal</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-2 shrink-0">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-lab-muted hover:text-lab-primary transition-colors p-2 rounded-xl hover:bg-lab-primary/5 shrink-0"
              title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-1 flex-col gap-2">
          <NavLink to="/" className={({ isActive }) => linkClass(isActive, isOpen)} end title={!isOpen ? "Semesters" : ""}>
            <LayoutDashboard size={20} className="shrink-0" />
            <AnimatePresence>
              {isOpen && (
                <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden whitespace-nowrap font-bold">
                  Quantum World
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
          <NavLink to="/semester/sem-1/theory" className={({ isActive }) => linkClass(isActive, isOpen)} title={!isOpen ? "Theory Portal" : ""}>
            <BookOpen size={20} className="shrink-0" />
            <AnimatePresence>
              {isOpen && (
                <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden whitespace-nowrap">
                  Theory Portal
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
          <NavLink to="/semester/sem-1/practical" className={({ isActive }) => linkClass(isActive, isOpen)} title={!isOpen ? "Practical Labs" : ""}>
            <FlaskConical size={20} className="shrink-0" />
            <AnimatePresence>
              {isOpen && (
                <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden whitespace-nowrap">
                  Practical Labs
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
          <NavLink to="/python-editor" className={({ isActive }) => linkClass(isActive, isOpen)} title={!isOpen ? "Python Editor" : ""}>
            <TerminalSquare size={20} className="shrink-0" />
            <AnimatePresence>
              {isOpen && (
                <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden whitespace-nowrap">
                  Python Editor
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        </nav>

        {/* Info Tip */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-auto mb-6 p-4 rounded-2xl bg-gradient-to-br from-lab-primary/10 to-lab-secondary/5 border border-lab-primary/10"
            >
              <div className="flex items-center gap-2 mb-2 text-lab-primary">
                <div className="h-1.5 w-1.5 rounded-full bg-lab-primary animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider">System Ready</span>
              </div>
              <p className="text-[12px] leading-relaxed text-lab-muted">
                Explore interactive simulators and the integrated code editor.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
