import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Activity, Lightbulb, Zap, Microscope, BookOpen, Star, Users, GraduationCap, Award } from 'lucide-react';
import IAR from '../../public/IAR.png';
import dashboard from '../../public/snapshots/dashboard.png'
import theory from '../../public/snapshots/theory.png'
import mpractial from '../../public/snapshots/mpractial.png'
import ppractical from '../../public/snapshots/ppractical.png'
import pythoneditor from '../../public/snapshots/pythoneditor.png'
import QuantumNavbar from '../components/shared/QuantumNavbar.jsx';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans">
      <QuantumNavbar />

      {/* Layer 2: Hero Section (IAR AI Quantum Lab) */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Background Video */}
        <video
          src="/videos/iarvideo.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/55" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center gap-8"
        >
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.6em] text-pink-300 drop-shadow-md">
            Simulating Intelligence at the Quantum Level
          </span>
          <h2 className="font-display text-4xl md:text-6xl lg:text-[90px] font-black tracking-tighter leading-tight text-white drop-shadow-xl">
            Quantum &nbsp;AI  <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-400">
              SIMULATOR
            </span>
          </h2>

          <p className="text-lg md:text-2xl text-white/80 max-w-2xl leading-relaxed font-medium drop-shadow">
Discover the future of scientific learning with the power of AI and Quantum Mechanics.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/dashboard"
              className="group relative flex items-center justify-center gap-3 bg-[#ffcc00] text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 hover:bg-[#601032] shadow-xl hover:shadow-[#7A1540]/40"
            >
              <span>Explore Labs</span>
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Platform Preview: Alternating Showcase */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 space-y-32">

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-[#7A1540] bg-[#7A1540]/8 px-4 py-1.5 rounded-full mb-4">Platform Preview</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Everything You Need
            </h2>
            <span className="text-[#7A1540] font-display text-3xl md:text-5xl font-bold tracking-tight mb-5">In One Place</span>
            <p className="text-slate-500 text-lg mt-3">A fully integrated virtual science platform — from theory to simulation to live coding.</p>
          </motion.div>

          {/* Row 1: Text Left | Image Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          >
            <div className="lg:w-1/2 flex flex-col gap-5">
              <span className="text-xs font-black uppercase tracking-widest text-[#7A1540]">🌐 Quantum World Dashboard</span>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Your Gateway to the <span className="text-[#7A1540]">Quantum World</span>
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                A clean, intuitive dashboard designed for students — navigate across AI Lab Assistants, Interactive Simulations, and the Theory Portal from a single unified interface.
              </p>
              <ul className="space-y-2 text-slate-600 text-[15px]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#7A1540] inline-block" />Sidebar navigation across all modules</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#7A1540] inline-block" />Interactive simulation card grid</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#7A1540] inline-block" />AI Lab Assistant integration</li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 ring-1 ring-black/5">
                <img src={dashboard} alt="Quantum World Dashboard" className="w-full h-auto object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Row 2: Image Left | Text Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20"
          >
            <div className="lg:w-1/2 flex flex-col gap-5">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600">📖 Theory Portal</span>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Deep-Dive <span className="text-indigo-600">Theory &amp; Chapter Notes</span>
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Access subject-wise theory modules, embedded PDF chapter notes, and application summaries — all organized by unit, seamlessly linked to your practicals.
              </p>
              <ul className="space-y-2 text-slate-600 text-[15px]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600 inline-block" />Organized by subjects & units</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600 inline-block" />Inline PDF viewer with page controls</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-600 inline-block" />Highlighted application sections</li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 ring-1 ring-black/5">
                <img src={theory} alt="Theory Portal" className="w-full h-auto object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Row 3: Text Left | Image Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          >
            <div className="lg:w-1/2 flex flex-col gap-5">
              <span className="text-xs font-black uppercase tracking-widest text-purple-600">📐 Advanced Math Labs</span>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Visualize <span className="text-purple-600">3D Mathematics</span> in Real-Time
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Explore partial derivatives, gradient descent, and multivariate calculus through live 3D surface plots. Adjust parameters and watch the math come alive.
              </p>
              <ul className="space-y-2 text-slate-600 text-[15px]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />Interactive 3D surface renderer</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />Real-time coordinate sliders</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-purple-600 inline-block" />Theory + Explore dual panel view</li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 ring-1 ring-black/5">
                <img src={mpractial} alt="3D Math Visualization" className="w-full h-auto object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Row 4: Image Left | Text Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20"
          >
            <div className="lg:w-1/2 flex flex-col gap-5">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-600">⚗️ Physics Simulations</span>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Run Real <span className="text-emerald-600">Physics Experiments</span> Virtually
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                Simulate classic experiments like the Simple Pendulum with a full apparatus panel, live stopwatch, and an auto-populating observation data table for analysis.
              </p>
              <ul className="space-y-2 text-slate-600 text-[15px]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />Physics engine with real dynamics</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />Precision stopwatch & data recorder</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />T² vs L graph auto-generation</li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 ring-1 ring-black/5">
                <img src={ppractical} alt="Simple Pendulum Simulation" className="w-full h-auto object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Row 5: Text Left | Image Right */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          >
            <div className="lg:w-1/2 flex flex-col gap-5">
              <span className="text-xs font-black uppercase tracking-widest text-amber-600">🐍 Python Workbench</span>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Code, Run &amp; Experiment with <span className="text-amber-600">Live Python</span>
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                A fully integrated Python IDE with an interactive terminal — write, run, and debug scientific programs right in the browser without any installation required.
              </p>
              <ul className="space-y-2 text-slate-600 text-[15px]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />Live Python runtime in the browser</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />Syntax-highlighted code editor</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />Interactive terminal with stdin support</li>
              </ul>
            </div>
            <div className="lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 ring-1 ring-black/5">
                <img src={pythoneditor} alt="Python Workbench" className="w-full h-auto object-cover" />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Layer 4: Popular Experiments Showcase - Restored to Grid */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block text-xs font-black uppercase tracking-widest text-[#7A1540] mb-4">Popular Experiments</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Explore Our <span className="text-[#7A1540]">Virtual Labs</span>
            </h2>
            <p className="text-slate-500 text-lg">Perform complex physics and engineering experiments right from your browser with highly accurate simulations.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Lab Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-100 transition-all hover:shadow-xl hover:bg-white group"
            >
              <div className="w-14 h-14 bg-rose-50 text-[#7A1540] rounded-2xl flex items-center justify-center mb-6">
                <Activity size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Simple Pendulum</h3>
              <p className="text-slate-600 mb-8">Investigate the relationship between pendulum length, mass, and time period with real-time graphing.</p>
              <Link to="/dashboard" className="inline-flex items-center gap-2 text-[#7A1540] font-bold hover:gap-4 transition-all">
                Try Simulator <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Lab Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-100 transition-all hover:shadow-xl hover:bg-white group"
            >
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Energy Conservation</h3>
              <p className="text-slate-600 mb-8">Visualize kinetic and potential energy transfers in a dynamic simulation environment.</p>
              <Link to="/dashboard" className="inline-flex items-center gap-2 text-amber-600 font-bold hover:gap-4 transition-all">
                Try Simulator <ArrowRight size={18} />
              </Link>
            </motion.div>

            {/* Lab Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-100 transition-all hover:shadow-xl hover:bg-white group"
            >
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Cpu size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Moment of Inertia</h3>
              <p className="text-slate-600 mb-8">Measure the rotational inertia of a flywheel using virtual masses and precision timers.</p>
              <Link to="/dashboard" className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-4 transition-all">
                Try Simulator <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Layer 5: How It Works - Redesigned for High-End Technical Aesthetic */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        {/* Technical Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMwIDB2NjBNMCAzMGg2MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBmaWxsPSJub25lIi8+PC9zdmc+')] opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7A1540] rounded-full blur-[160px] opacity-10 animate-pulse-slow" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-400 mb-4 block">Workflow</span>
            <h2 className="font-display text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
              How the <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-[#7A1540]">Virtual Lab</span> Works
            </h2>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-medium">
              A scientifically rigorous workflow designed to bridge the gap between theoretical concept and practical mastery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line - Animated Path */}
            <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400 to-transparent w-1/3 animate-[shimmer_3s_infinite]" />
            </div>

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-36 h-36 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-8 relative group-hover:border-pink-500/50 transition-all duration-500 shadow-2xl">
                <div className="absolute inset-2 rounded-full border border-pink-500/10 animate-spin-slow" />
                <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-black text-lg absolute -top-2 -right-2 shadow-lg shadow-pink-500/20">1</div>
                <BookOpen size={48} className="text-white group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Theory Portal</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Master the underlying physics and mathematical models before entering the simulation workbench.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-36 h-36 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-8 relative group-hover:border-sky-500/50 transition-all duration-500 shadow-2xl">
                <div className="absolute inset-2 rounded-full border border-sky-500/10 animate-spin-slow reverse" />
                <div className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-black text-lg absolute -top-2 -right-2 shadow-lg shadow-sky-500/20">2</div>
                <Microscope size={48} className="text-white group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Interactive Setup</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Configure your apparatus in a 3D environment that obeys real-world physical constraints and dynamics.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-36 h-36 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-8 relative group-hover:border-emerald-500/50 transition-all duration-500 shadow-2xl">
                <div className="absolute inset-2 rounded-full border border-emerald-500/10 animate-spin-slow" />
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black text-lg absolute -top-2 -right-2 shadow-lg shadow-emerald-500/20">3</div>
                <Lightbulb size={48} className="text-white group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">Data Synthesis</h3>
              <p className="text-slate-400 leading-relaxed font-medium">
                Execute experiments, capture high-precision data, and generate real-time analytical visualizations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Layer 7: BSc Quantum Technology - Restored to original layout */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          >
            <div className="lg:w-1/2">
              <span className="text-xs font-black uppercase tracking-widest text-[#7A1540] mb-4 block">New Program</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                B.Sc.(H) <span className="text-[#7A1540]">Quantum Tech</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Be a part of India's first dedicated undergraduate program in Quantum Technology.
                Gain hands-on experience with quantum algorithms, hardware architectures, and AI integration.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7A1540]/5 flex items-center justify-center text-[#7A1540]">
                    <Award size={20} />
                  </div>
                  <span className="font-bold text-slate-800">UGC Recognized Honors Degree</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7A1540]/5 flex items-center justify-center text-[#7A1540]">
                    <Users size={20} />
                  </div>
                  <span className="font-bold text-slate-800">Industry Integrated Curriculum</span>
                </div>
              </div>
              <button className="bg-[#7A1540] text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg shadow-[#7A1540]/20">
                Explore Curriculum
              </button>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="w-full aspect-video rounded-3xl bg-slate-900 overflow-hidden shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#7A1540]/20 to-transparent opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center animate-ping" />
                  <Cpu size={64} className="text-white absolute" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Layer 8: Reviews / Testimonials - Redesigned to be 'Damn Attractive' */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(122,21,64,0.03),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#7A1540]/5 text-[#7A1540] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Testimonials</span>
            <h2 className="font-display text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
              What Students <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A1540] to-pink-600">Say</span>
            </h2>
            <div className="h-1.5 w-24 bg-[#7A1540] mx-auto rounded-full opacity-20" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Review 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[3rem] p-10 shadow-[0_10px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative transition-all duration-500 hover:shadow-[0_20px_70px_rgba(122,21,64,0.1)] hover:border-[#7A1540]/20"
            >
              <div className="absolute top-8 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-8xl font-serif text-[#7A1540]">“</span>
              </div>

              <div className="flex gap-1 text-amber-400 mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" stroke="none" />)}
              </div>

              <p className="text-slate-700 text-lg leading-relaxed font-medium mb-10 relative z-10">
                "The drag-and-drop circuit building feels <span className="text-slate-900 font-bold">incredibly realistic</span>. It helped me understand energy conservation much better than standard textbook diagrams."
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7A1540] to-pink-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-[#7A1540]/20">AS</div>
                <div>
                  <div className="font-black text-slate-900 tracking-tight">Aryan Sharma</div>
                  <div className="text-xs font-bold text-[#7A1540] uppercase tracking-widest">BSc Physics, 2nd Year</div>
                </div>
              </div>
            </motion.div>

            {/* Review 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[3rem] p-10 shadow-[0_10px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative transition-all duration-500 hover:shadow-[0_20px_70px_rgba(79,70,229,0.1)] hover:border-indigo-500/20"
            >
              <div className="absolute top-8 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-8xl font-serif text-indigo-600">“</span>
              </div>

              <div className="flex gap-1 text-amber-400 mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" stroke="none" />)}
              </div>

              <p className="text-slate-700 text-lg leading-relaxed font-medium mb-10 relative z-10">
                "Having the automated physics engine plot graphs <span className="text-slate-900 font-bold">instantly</span> as I tweak the simple pendulum length is mind-blowing. Amazing platform!"
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-600/20">RP</div>
                <div>
                  <div className="font-black text-slate-900 tracking-tight">Riya Patel</div>
                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-widest">BSc Computer Science</div>
                </div>
              </div>
            </motion.div>

            {/* Review 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[3rem] p-10 shadow-[0_10px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative transition-all duration-500 hover:shadow-[0_20px_70px_rgba(16,185,129,0.1)] hover:border-emerald-500/20"
            >
              <div className="absolute top-8 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-8xl font-serif text-emerald-600">“</span>
              </div>

              <div className="flex gap-1 text-amber-400 mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" stroke="none" />)}
              </div>

              <p className="text-slate-700 text-lg leading-relaxed font-medium mb-10 relative z-10">
                "No more fighting for lab equipment time. I can practice my flywheel experiments at <span className="text-slate-900 font-bold">2 AM from my dorm</span>. The validation system is perfect."
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-emerald-600/20">KD</div>
                <div>
                  <div className="font-black text-slate-900 tracking-tight">Karan Desai</div>
                  <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Engineering Student</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Layer 9: Call to Action Banner - Redesigned for WOW factor */}
      <section className="relative py-32 overflow-hidden bg-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#7A1540] rounded-full blur-[120px] opacity-20 animate-pulse-slow"></div>
          <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[140px] opacity-20 animate-blob"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[4rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden group"
          >
            {/* Subtle internal glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#7A1540]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#7A1540] to-pink-500 rounded-3xl flex items-center justify-center mb-10 shadow-lg shadow-[#7A1540]/30 rotate-3 group-hover:rotate-6 transition-transform">
                <Award size={40} className="text-white" />
              </div>

              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-white mb-8 tracking-tighter leading-tight">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-[#7A1540]">Innovate?</span>
              </h2>

              <p className="text-slate-400 text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                Join thousands of students performing state-of-the-art virtual experiments.
                Step into the future of scientific exploration today.
              </p>

              <Link
                to="/dashboard"
                className="group relative inline-flex items-center justify-center gap-4 bg-white text-slate-900 px-12 py-6 rounded-2xl font-black text-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[#7A1540]/40 overflow-hidden"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <span className="relative z-10">Enter Virtual Lab</span>
                <ArrowRight size={28} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              </Link>

              <div className="mt-12 flex items-center gap-8 text-slate-500 font-bold text-xs uppercase tracking-[0.3em]">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#7A1540]" /> 100+ Experiments</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#7A1540]" /> AI Assisted</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#7A1540]" /> Cloud Sync</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Layer 10: Our Vision - Redesigned for High Impact */}
      <section className="relative py-32 bg-white overflow-hidden">
        {/* Abstract Background Patterns (Particles/Waves) */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 50 Q 25 0, 50 50 T 100 50" fill="none" stroke="#7A1540" strokeWidth="0.5" className="animate-pulse" />
            <path d="M0 60 Q 25 10, 50 60 T 100 60" fill="none" stroke="#7A1540" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '1s' }} />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center">
            {/* Animated Icon Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-gradient-to-br from-[#7A1540]/5 to-[#7A1540]/10 rounded-full flex items-center justify-center mb-12 relative"
            >
              <div className="absolute inset-0 rounded-full border border-[#7A1540]/20 animate-ping opacity-20" />
              <Lightbulb size={40} className="text-[#7A1540] relative z-10" />
            </motion.div>

            <div className="text-center">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[10px] font-black uppercase tracking-[0.5em] text-[#7A1540] mb-4 block"
              >
                Manifesto
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-7xl font-black text-slate-900 mb-12 tracking-tight"
              >
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A1540] to-pink-600">Vision</span>
              </motion.h2>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Large Stylized Quotes */}
              <span className="absolute -top-12 -left-8 text-9xl font-serif text-[#7A1540]/10 select-none">“</span>
              <span className="absolute -bottom-24 -right-8 text-9xl font-serif text-[#7A1540]/10 select-none">”</span>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <p className="text-2xl md:text-4xl lg:text-5xl text-slate-800 leading-[1.3] font-medium text-center italic tracking-tight">
                  To democratize access to <span className="text-[#7A1540] font-black">high-fidelity scientific equipment</span> by bringing the physical laboratory directly into the digital realm.
                </p>

                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#7A1540] to-transparent mx-auto my-12" />

                <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto text-center leading-relaxed font-medium">
                  We believe that immersive, AI-guided simulations are the key to unlocking the next generation of
                  <span className="text-slate-900 font-bold"> quantum researchers, engineers, and physicists</span> across the globe.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 7: Meet the Builders */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Meet the <span className="text-[#7A1540]">Builders</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-16">
              The Quantum AI Virtual Lab was conceptualized and developed by dedicated innovators at IAR.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-4xl mx-auto">
            {/* Dean / Founder - Dr. Anand K. Tiwari */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center group"
            >
              <div className="w-40 h-40 rounded-[2rem] bg-slate-100 overflow-hidden mb-6 relative border-4 border-amber-200 shadow-xl group-hover:-translate-y-2 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-yellow-300 opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-full h-full flex items-center justify-center bg-amber-50 text-amber-400">
                  <GraduationCap size={64} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Dr. Anand K. Tiwari</h3>
              <p className="text-amber-600 font-bold text-sm uppercase tracking-wide mb-1">Founder</p>
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">Dean, Institute of Advanced Research</p>
              <p className="text-slate-600 text-sm text-center">Visionary academic leader pioneering the integration of quantum technology and AI-driven education at IAR.</p>
            </motion.div>

            {/* Founder 1 - Keval Gandhi */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center group"
            >
              <div className="w-40 h-40 rounded-[2rem] bg-slate-100 overflow-hidden mb-6 relative border-4 border-white shadow-xl group-hover:-translate-y-2 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#7A1540] to-pink-400 opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                  <Users size={64} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Keval Gandhi</h3>
              <p className="text-[#7A1540] font-bold text-sm uppercase tracking-wide mb-3">Founder</p>
              <p className="text-slate-600 text-sm text-center">Visionary leader driving the future of quantum education and interactive learning.</p>
            </motion.div>

            {/* Engineer 1 - Sujal Shah */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center group"
            >
              <div className="w-40 h-40 rounded-[2rem] bg-slate-100 overflow-hidden mb-6 relative border-4 border-white shadow-xl group-hover:-translate-y-2 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-sky-400 opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                  <Cpu size={64} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Nidhi Chaudhary</h3>
              <p className="text-indigo-600 font-bold text-sm uppercase tracking-wide mb-3">Lead Engineer</p>
              <p className="text-slate-600 text-sm text-center">Spearheading the integration of computational models and modern web architectures.</p>
            </motion.div>

            {/* Engineer 2 - Nidhi Chaudhary */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center group"
            >
              <div className="w-40 h-40 rounded-[2rem] bg-slate-100 overflow-hidden mb-6 relative border-4 border-white shadow-xl group-hover:-translate-y-2 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-teal-400 opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                  <Cpu size={64} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Sujal Shah</h3>
              <p className="text-emerald-600 font-bold text-sm uppercase tracking-wide mb-3">Lead Engineer</p>
              <p className="text-slate-600 text-sm text-center">Architecting robust backend systems and real-time physics engine simulations.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Layer 11: Expanded Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src={IAR} alt="IAR Logo" className="h-10 w-auto object-contain brightness-0 invert opacity-90" />
                <span className="font-display font-bold text-white text-2xl tracking-wide">Quantum AI Lab</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
                Pioneering the intersection of artificial intelligence, quantum computing, and interactive physics simulations for higher education.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#7A1540] hover:text-white transition-colors">
                  <Users size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#7A1540] hover:text-white transition-colors">
                  <BookOpen size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><Link to="/dashboard" className="hover:text-pink-300 transition-colors">Simulations Dashboard</Link></li>
                <li><Link to="/theory" className="hover:text-pink-300 transition-colors">Theory & Manuals</Link></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">BSc Quantum Tech</a></li>
                <li><a href="#" className="hover:text-pink-300 transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li>Institute of Advanced Research</li>
                <li>Gandhinagar, Gujarat, India</li>
                <li>Email: research@iar.ac.in</li>
                <li>Support: labs@iar.ac.in</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 uppercase tracking-widest font-bold">
            <p>&copy; 2026 Institute of Advanced Research. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



