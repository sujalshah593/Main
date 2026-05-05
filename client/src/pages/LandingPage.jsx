import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Beaker, Play, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans">
      {/* Layer 1: Simple IAR Navbar Style */}
      <nav className="w-full bg-white flex flex-col md:flex-row items-stretch border-b border-slate-200 shadow-md">
        {/* Logo Section */}
        <div className="p-4 md:px-12 flex flex-col items-center justify-center min-w-[220px]">
          <img 
            src="https://iar.ac.in/wp-content/uploads/2023/12/IAR-Logo.png" 
            alt="IAR Logo" 
            className="h-16 w-auto object-contain mb-1"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7A1540]">IAR University</span>
        </div>

        {/* Brand Text Section */}
        <div className="flex-1 bg-[#7A1540] w-full py-8 px-10 flex flex-col justify-center text-center md:text-left">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white">
            Institute of Advanced Research
          </h1>
          <p className="text-lg md:text-xl italic font-serif text-white/90 mt-1">
            The University for Innovation
          </p>
        </div>
      </nav>

      {/* Layer 2: Hero Section (IAR AI Quantum Lab) */}
      <section className="relative pt-8 pb-16 lg:pt-10 lg:pb-24 px-6 lg:px-12 overflow-hidden bg-slate-50">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-[#7A1540]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start gap-6"
          >
            <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7A1540] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7A1540]"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-[#7A1540]">Virtual Lab Portal</span>
            </div>

            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight text-slate-900">
              IAR AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A1540] to-purple-600">Quantum Lab</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed font-medium">
              Step into the future of scientific exploration. Harnessing the power of Artificial Intelligence 
              and Quantum Mechanics to redefine the boundaries of interactive learning.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                to="/dashboard" 
                className="group relative flex items-center justify-center gap-4 bg-[#7A1540] text-white px-8 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 hover:bg-[#601032] shadow-xl hover:shadow-[#7A1540]/20"
              >
                Explore Labs
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <button className="flex items-center gap-3 px-8 py-4 rounded-2xl border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50 transition-all shadow-sm">
                <Play size={18} className="text-[#7A1540]" fill="currentColor" /> Watch Intro
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Layer 3: Video Section */}
      <section className="px-6 lg:px-12 py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video w-full rounded-[40px] overflow-hidden border border-slate-200 bg-slate-100 shadow-2xl group"
          >
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center border border-slate-200 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                <Play size={40} className="text-[#7A1540] ml-2" fill="currentColor" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">IAR Innovation Showcase</h3>
                <p className="text-slate-500 font-medium tracking-wide">Video playback area - Content pending</p>
              </div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/5 to-transparent pointer-events-none" />
          </motion.div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-100 pt-12">
             <div className="space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-[#7A1540]/5 flex items-center justify-center text-[#7A1540] border border-[#7A1540]/10">
                   <Beaker size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Research Grade</h4>
                <p className="text-slate-600 text-[15px] leading-relaxed">Simulations backed by advanced computational models and academic research.</p>
             </div>
             <div className="space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-purple-500/5 flex items-center justify-center text-purple-600 border border-purple-500/10">
                   <Play size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900">AI Driven</h4>
                <p className="text-slate-600 text-[15px] leading-relaxed">Integrated AI assistants to guide students through complex practical workflows.</p>
             </div>
             <div className="space-y-3">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/5 flex items-center justify-center text-emerald-600 border border-emerald-500/10">
                   <Shield size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Verified Learning</h4>
                <p className="text-slate-600 text-[15px] leading-relaxed">Systematic approach to learning with persistent tracking and validated outcomes.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-16 border-t border-slate-100 text-center bg-slate-50">
        <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em]">
          &copy; 2026 Institute of Advanced Research • AI Quantum Lab
        </p>
      </footer>
    </div>
  );
}
