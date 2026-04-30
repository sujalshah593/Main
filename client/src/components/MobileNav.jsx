import { NavLink } from 'react-router-dom';
import { FlaskConical } from 'lucide-react';

const pill = ({ isActive }) =>
  [
    'rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300',
    isActive 
      ? 'bg-lab-accent3/20 text-lab-accent3 ring-1 ring-lab-accent3/40' 
      : 'text-lab-muted hover:bg-white/10 hover:text-white',
  ].join(' ');

export default function MobileNav() {
  return (
    <div className="sticky top-0 z-40 border-b border-lab-panelBorder bg-lab-panel/80 backdrop-blur-3xl md:hidden shadow-lg">
      <div className="flex flex-col gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <FlaskConical size={16} className="text-lab-accent3" />
          <div className="font-display text-sm font-bold tracking-tight text-white">Virtual Lab</div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <NavLink to="/" className={pill} end>
            Semesters
          </NavLink>
          <NavLink to="/semester/sem-1/theory" className={pill}>
            Theory
          </NavLink>
          <NavLink to="/python-editor" className={pill}>
            Python
          </NavLink>
        </div>
      </div>
    </div>
  );
}
