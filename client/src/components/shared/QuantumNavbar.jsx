import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';

export default function QuantumNavbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Text Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
            <Cpu size={20} />
          </div>
          <span className="font-display font-black text-xl tracking-tight text-slate-900">
            NiSuX<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Labs</span>
          </span>
        </Link>

        {/* Center: Navigation Links (Hidden on Mobile) */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Platform</Link>
          <Link to="/" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Simulations</Link>
          <Link to="/" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Theory</Link>
          <Link to="/" className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Enterprise</Link>
        </div>

        {/* Right: CTA Button */}
        <div className="flex items-center">
          <Link to="/dashboard" className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-bold border border-blue-600 hover:bg-blue-700 hover:border-blue-700 transition-all shadow-[0_4px_15px_rgba(37,99,235,0.3)]">
            Launch Console
          </Link>
        </div>

      </div>
    </nav>
  );
}
