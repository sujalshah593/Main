import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Beaker, Play, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-x-hidden">
      {/* Layer 1: Navbar (IAR Header) */}
      <nav className="w-full bg-white flex flex-col md:flex-row items-center">
        {/* Logo Section */}
        <div className="p-4 md:px-10 flex flex-col items-center border-b md:border-b-0 md:border-r border-slate-100 min-w-[220px]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#7A1540] p-1.5 mb-2 shadow-sm">
             {/* Recreating the shield logo look */}
             <div className="h-full w-full rounded-full border border-[#7A1540]/20 flex items-center justify-center bg-white">
                <Shield className="text-[#7A1540]" size={36} fill="#7A1540" fillOpacity={0.05} />
             </div>
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.1em] text-[#7A1540]">IAR University</span>
        </div>

        {/* Brand Text Section */}
        <div className="flex-1 bg-[#7A1540] w-full h-full py-8 px-10 flex flex-col justify-center text-center md:text-left shadow-inner">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white drop-shadow-md">
            Institute of Advanced Research
          </h1>
          <p className="text-lg md:text-xl italic font-serif text-white/80 mt-2 tracking-wide">
            The University for Innovation
          </p>
        </div>
      </nav>

      {/* Layer 2: Hero Section (IAR AI Quantum Lab) */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-lab-accent3/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-lab-accent/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start gap-8"
          >
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lab-accent3 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lab-accent3"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-lab-accent3">Virtual Lab Portal</span>
            </div>

            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
              IAR AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600">
                Quantum Lab
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl leading-relaxed font-medium">
              Step into the future of scientific exploration. Harnessing the power of Artificial Intelligence 
              and Quantum Mechanics to redefine the boundaries of interactive learning.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <Link 
                to="/dashboard" 
                className="group relative flex items-center justify-center gap-4 bg-white text-black px-10 py-5 rounded-2xl font-black text-xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                Explore Labs
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <button className="flex items-center gap-3 px-10 py-5 rounded-2xl border border-white/10 bg-white/5 text-white font-bold hover:bg-white/10 transition-all">
                <Play size={20} fill="currentColor" /> Watch Intro
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Layer 3: Video Section */}
      <section className="px-6 lg:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video w-full rounded-[40px] overflow-hidden border border-white/10 bg-slate-900 shadow-2xl group"
          >
            {/* Video Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500">
                <Play size={40} className="text-white ml-2" fill="currentColor" />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">IAR Innovation Showcase</h3>
                <p className="text-slate-500 font-medium tracking-wide">Video playback area - Content pending</p>
              </div>
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </motion.div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-12">
             <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                   <Beaker size={20} />
                </div>
                <h4 className="text-lg font-bold">Research Grade</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Simulations backed by advanced computational models and academic research.</p>
             </div>
             <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                   <Play size={20} />
                </div>
                <h4 className="text-lg font-bold">AI Driven</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Integrated AI assistants to guide students through complex practical workflows.</p>
             </div>
             <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                   <Shield size={20} />
                </div>
                <h4 className="text-lg font-bold">Verified Learning</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Systematic approach to learning with persistent tracking and validated outcomes.</p>
             </div>
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-slate-600 text-xs font-bold uppercase tracking-[0.2em]">
          &copy; 2026 Institute of Advanced Research • AI Quantum Lab
        </p>
      </footer>
    </div>
  );
}
