import { NavLink } from 'react-router-dom';
import logo from '../../public/snapshots/logo.png';

const pill = ({ isActive }) =>
  [
    'rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 border',
    isActive
      ? 'bg-sky-100 text-sky-700 border-sky-300 shadow-sm'
      : 'text-slate-500 border-transparent hover:bg-slate-100 hover:text-slate-900',
  ].join(' ');

export default function MobileNav() {
  return (
    <div className="sticky top-0 z-40 border-b border-lab-panelBorder bg-lab-panel backdrop-blur-3xl md:hidden shadow-lg">
      <div className="flex flex-col gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="IAR Logo" className="h-8 w-auto object-contain" />
          <div className="font-display text-lg font-black tracking-tight text-[#7A1540]">QUANTUM AI LAB</div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <NavLink to="/dashboard" className={pill} end>
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
