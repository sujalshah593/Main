import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, BookOpen, TerminalSquare, FlaskConical, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const linkClass = (isActive, isOpen) =>
  [
    'group flex items-center rounded-xl font-medium transition-all duration-300',
    isOpen ? 'px-4 py-3 gap-3 text-[14px]' : 'p-3 justify-center text-[14px]',
    isActive
      ? 'bg-gradient-to-r from-lab-accent3/20 to-transparent text-lab-accent3 border-l-2 border-lab-accent3'
      : 'text-lab-muted border-l-2 border-transparent hover:bg-white/5 hover:text-white',
  ].join(' ');

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`hidden shrink-0 border-r border-lab-panelBorder bg-lab-panel/40 backdrop-blur-3xl md:flex flex-col shadow-2xl relative z-20 transition-all duration-300 ${isOpen ? 'w-72' : 'w-[88px]'}`}>
      <div className="flex h-full flex-col px-4 py-8">
        
        {/* Header */}
        <div className={`flex items-start mb-10 ${isOpen ? 'justify-between px-2' : 'justify-center'} overflow-hidden`}>
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex flex-col overflow-hidden whitespace-nowrap"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lab-accent3/20 text-lab-accent3 shrink-0">
                    <FlaskConical size={18} strokeWidth={2.5} />
                  </div>
                  <div className="text-xl font-display font-bold text-white tracking-tight">Virtual Lab</div>
                </div>
                <p className="mt-1 text-xs text-lab-muted ml-11">Quantum & Physics Portal</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-lab-muted hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 shrink-0"
            title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-1 flex-col gap-2">
          <NavLink to="/" className={({ isActive }) => linkClass(isActive, isOpen)} end title={!isOpen ? "Semesters" : ""}>
            <LayoutDashboard size={20} className="shrink-0" />
            <AnimatePresence>
              {isOpen && (
                <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden whitespace-nowrap">
                  Semesters
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
          <NavLink to="/semester/sem-1/theory" className={({ isActive }) => linkClass(isActive, isOpen)} title={!isOpen ? "Study Materials" : ""}>
            <BookOpen size={20} className="shrink-0" />
            <AnimatePresence>
              {isOpen && (
                <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: 'auto' }} exit={{ opacity: 0, width: 0 }} className="overflow-hidden whitespace-nowrap">
                  Study Materials
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
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, marginTop: 0, padding: 0, border: 0 }}
              className="mt-8 rounded-xl bg-gradient-to-br from-lab-accent/10 to-lab-accent2/5 p-4 border border-lab-accent/10 overflow-hidden"
            >
              <p className="text-[12px] leading-relaxed text-lab-muted whitespace-normal min-w-[200px]">
                <strong className="text-white">Tip:</strong> Choose your semester to unlock interactive simulators, practical manuals, and the integrated code editor.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
