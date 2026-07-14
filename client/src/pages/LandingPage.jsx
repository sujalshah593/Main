import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Activity, Lightbulb, Zap, Microscope, BookOpen, Star, Users, GraduationCap, Award } from 'lucide-react';

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


      {/* Layer 2: Hero Section (Split Screen - Light Theme) */}
      <section className="relative min-h-screen flex flex-col lg:flex-row overflow-hidden bg-slate-50 mt-[-80px]">
        
        {/* Left Side: Hero Content */}
        <div className="relative w-full lg:w-1/2 min-h-[70vh] lg:min-h-screen flex items-center px-6 md:px-12 lg:px-20 py-32 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-200 bg-white">
          {/* Subtle Light Theme Background Effects */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,rgba(37,99,235,0.05),transparent_50%)] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(6,182,212,0.05),transparent_50%)] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-start gap-8 mt-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 shadow-sm mb-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                System Online & Ready
              </span>
            </div>
            
            <h2 className="font-display text-5xl md:text-6xl lg:text-[75px] font-black tracking-tighter leading-[1.05] text-slate-900">
              Simulating <br />
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 mt-2">
                True Intelligence
              </span>
            </h2>

            <p className="text-lg md:text-xl text-slate-500 max-w-xl leading-relaxed font-medium mt-2">
              Step into a high-fidelity virtual universe. Accelerate your understanding of quantum mechanics and AI through our revolutionary simulation lab.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4 mt-2">
              <Link
                to="/dashboard"
                className="group relative flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:bg-blue-700 shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
              >
                <span>Explore SIMULATOR</span>
                <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
              
              <Link
                to="/theory"
                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all bg-white shadow-sm"
              >
                <span>View Docs</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Quantum HUD (Light Theme) */}
        <div className="relative w-full lg:w-1/2 min-h-[500px] lg:min-h-screen flex items-center justify-center bg-slate-50 px-6">
          {/* Subtle glow background for the HUD in light mode */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-br from-blue-100 to-cyan-100 blur-[100px] rounded-full opacity-60 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full max-w-2xl"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 to-cyan-300 blur-xl rounded-3xl opacity-30" />
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 overflow-hidden shadow-[0_20px_50px_rgba(37,99,235,0.1)]">
              <QuantumHUD height={600} />
            </div>

            {/* HUD Title Overlay for Light Theme */}
            <div className="absolute top-4 left-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] font-bold text-blue-600/70 uppercase tracking-[0.3em]">Quantum_Core_Active</span>
            </div>
          </motion.div>
        </div>

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
            <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-blue-600 bg-blue-600/10 px-4 py-1.5 rounded-full mb-4">Platform Preview</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Everything You Need
            </h2>
            <span className="text-blue-600 font-display text-3xl md:text-5xl font-bold tracking-tight mb-5">In One Place</span>
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
              <span className="text-xs font-black uppercase tracking-widest text-blue-600">🌐 Quantum World Dashboard</span>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Your Gateway to the <span className="text-blue-600">Quantum World</span>
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                A clean, intuitive dashboard designed for students — navigate across AI Lab Assistants, Interactive Simulations, and the Theory Portal from a single unified interface.
              </p>
              <ul className="space-y-2 text-slate-600 text-[15px]">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />Sidebar navigation across all modules</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />Interactive simulation card grid</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />AI Lab Assistant integration</li>
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
            <span className="inline-block text-xs font-black uppercase tracking-widest text-blue-600 mb-4">Popular Experiments</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Explore Our <span className="text-blue-600">Virtual Labs</span>
            </h2>
            <p className="text-slate-500 text-lg">Perform complex physics and engineering experiments right from your browser with highly accurate simulations.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Lab Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 border border-slate-200 transition-all hover:shadow-xl hover:border-blue-100 group"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Activity size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Simple Pendulum</h3>
              <p className="text-slate-600 mb-8">Investigate the relationship between pendulum length, mass, and time period with real-time graphing.</p>
              <Link to="/dashboard" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all">
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
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Technical Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMwIDB2NjBNMCAzMGg2MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBmaWxsPSJub25lIi8+PC9zdmc+')] opacity-50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[160px] opacity-[0.03] animate-pulse-slow" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-4 block">Workflow</span>
            <h2 className="font-display text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
              How the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Virtual Lab</span> Works
            </h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
              A scientifically rigorous workflow designed to bridge the gap between theoretical concept and practical mastery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line - Animated Path */}
            <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent w-1/3 animate-[shimmer_3s_infinite]" />
            </div>

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-36 h-36 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-8 relative group-hover:border-blue-500/50 transition-all duration-500 shadow-xl">
                <div className="absolute inset-2 rounded-full border border-blue-500/10 animate-spin-slow" />
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-lg absolute -top-2 -right-2 shadow-lg shadow-blue-500/20">1</div>
                <BookOpen size={48} className="text-blue-600 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Theory Portal</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
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
              <div className="w-36 h-36 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-8 relative group-hover:border-cyan-500/50 transition-all duration-500 shadow-xl">
                <div className="absolute inset-2 rounded-full border border-cyan-500/10 animate-spin-slow reverse" />
                <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-black text-lg absolute -top-2 -right-2 shadow-lg shadow-cyan-500/20">2</div>
                <Microscope size={48} className="text-cyan-500 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Interactive Setup</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
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
              <div className="w-36 h-36 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-8 relative group-hover:border-violet-500/50 transition-all duration-500 shadow-xl">
                <div className="absolute inset-2 rounded-full border border-violet-500/10 animate-spin-slow" />
                <div className="w-10 h-10 rounded-full bg-violet-500 text-white flex items-center justify-center font-black text-lg absolute -top-2 -right-2 shadow-lg shadow-violet-500/20">3</div>
                <Lightbulb size={48} className="text-violet-500 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Data Synthesis</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Execute experiments, capture high-precision data, and generate real-time analytical visualizations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Layer 7: Custom Section (Replacement for New Program) */}
      <section className="py-24 bg-white border-t border-slate-200 relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-blue-500/5 via-violet-500/5 to-cyan-500/5 blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          >
            <div className="lg:w-1/2">
              <span className="text-xs font-black uppercase tracking-widest text-blue-600 mb-4 block drop-shadow-sm">Next-Gen Education</span>
              <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Quantum Intelligence</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                Immerse yourself in a state-of-the-art virtual curriculum. Push the boundaries of scientific computing by designing, simulating, and validating complex quantum algorithms in our high-fidelity virtual labs.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 backdrop-blur-md">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white shadow-lg">
                    <Activity size={24} />
                  </div>
                  <span className="font-bold text-slate-900">Real-time Visualization Engine</span>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 backdrop-blur-md">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                    <Zap size={24} />
                  </div>
                  <span className="font-bold text-slate-900">AI-Powered Validation</span>
                </div>
              </div>
              <button className="group relative bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all hover:scale-105 hover:bg-blue-700 shadow-[0_4px_20px_rgba(37,99,235,0.3)] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2">Start Journey <ArrowRight size={20} /></span>
              </button>
            </div>
            
            <div className="lg:w-1/2 relative w-full h-[400px]">
              {/* Floating glassmorphism cards */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.05),transparent)] blur-xl pointer-events-none" />
                
                {/* Main Card */}
                <div className="relative z-20 w-80 h-96 bg-white/80 backdrop-blur-2xl border border-slate-200 rounded-[2rem] shadow-xl p-6 flex flex-col items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-500">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full" />
                  <div className="w-24 h-24 rounded-full border border-blue-100 flex items-center justify-center relative mb-6 bg-blue-50">
                    <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-[spin_4s_linear_infinite]" />
                    <Cpu size={40} className="text-blue-600" />
                  </div>
                  <h3 className="text-slate-900 font-bold text-xl text-center mb-2">Quantum Core Sync</h3>
                  <p className="text-slate-500 text-sm text-center">Neural pathways active and stabilizing.</p>
                </div>
                
                {/* Accent Cards */}
                <div className="absolute top-4 -right-8 z-10 w-48 h-32 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-blue-600 text-xs font-bold uppercase tracking-widest">Status</span>
                  </div>
                  <div className="text-slate-900 font-black text-lg">System Online</div>
                </div>
                
                <div className="absolute bottom-8 -left-12 z-30 w-56 h-32 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl p-4 shadow-lg">
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-3">
                    <div className="w-3/4 h-full bg-gradient-to-r from-cyan-500 to-blue-600 animate-pulse" />
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500">Processing</span>
                    <span className="text-blue-600">75%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Layer 8: Reviews / Testimonials - Redesigned to be 'Damn Attractive' */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.03),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Testimonials</span>
            <h2 className="font-display text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
              What Students <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Say</span>
            </h2>
            <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full opacity-20" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Review 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[3rem] p-10 shadow-[0_10px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative transition-all duration-500 hover:shadow-[0_20px_70px_rgba(37,99,235,0.1)] hover:border-blue-600/20"
            >
              <div className="absolute top-8 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-8xl font-serif text-blue-600">“</span>
              </div>

              <div className="flex gap-1 text-cyan-500 mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" stroke="none" />)}
              </div>

              <p className="text-slate-600 text-lg leading-relaxed font-medium mb-10 relative z-10">
                "The drag-and-drop circuit building feels <span className="text-slate-900 font-bold">incredibly realistic</span>. It helped me understand energy conservation much better than standard textbook diagrams."
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-600/20">AS</div>
                <div>
                  <div className="font-black text-slate-900 tracking-tight">Aryan Sharma</div>
                  <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">BSc Physics, 2nd Year</div>
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
              className="group bg-white rounded-[3rem] p-10 shadow-[0_10px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative transition-all duration-500 hover:shadow-[0_20px_70px_rgba(6,182,212,0.1)] hover:border-cyan-500/20"
            >
              <div className="absolute top-8 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-8xl font-serif text-cyan-500">“</span>
              </div>

              <div className="flex gap-1 text-cyan-500 mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" stroke="none" />)}
              </div>

              <p className="text-slate-600 text-lg leading-relaxed font-medium mb-10 relative z-10">
                "Having the automated physics engine plot graphs <span className="text-slate-900 font-bold">instantly</span> as I tweak the simple pendulum length is mind-blowing. Amazing platform!"
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-cyan-500/20">RP</div>
                <div>
                  <div className="font-black text-slate-900 tracking-tight">Riya Patel</div>
                  <div className="text-xs font-bold text-cyan-500 uppercase tracking-widest">BSc Computer Science</div>
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
              className="group bg-white rounded-[3rem] p-10 shadow-[0_10px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative transition-all duration-500 hover:shadow-[0_20px_70px_rgba(124,58,237,0.1)] hover:border-violet-500/20"
            >
              <div className="absolute top-8 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-8xl font-serif text-violet-600">“</span>
              </div>

              <div className="flex gap-1 text-cyan-500 mb-8">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" stroke="none" />)}
              </div>

              <p className="text-slate-600 text-lg leading-relaxed font-medium mb-10 relative z-10">
                "No more fighting for lab equipment time. I can practice my flywheel experiments at <span className="text-slate-900 font-bold">2 AM from my dorm</span>. The validation system is perfect."
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-violet-600/20">KD</div>
                <div>
                  <div className="font-black text-slate-900 tracking-tight">Karan Desai</div>
                  <div className="text-xs font-bold text-violet-600 uppercase tracking-widest">Engineering Student</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Layer 9: Call to Action Banner - Redesigned for WOW factor */}
      <section className="relative py-32 overflow-hidden bg-slate-50">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-10 animate-pulse-slow"></div>
          <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[140px] opacity-10 animate-blob"></div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-slate-200 rounded-[4rem] p-12 md:p-20 text-center shadow-xl relative overflow-hidden group hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)] transition-shadow duration-500"
          >
            {/* Subtle internal glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl flex items-center justify-center mb-10 shadow-lg shadow-blue-600/30 rotate-3 group-hover:rotate-6 transition-transform">
                <Award size={40} className="text-white" />
              </div>

              <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-slate-900 mb-8 tracking-tighter leading-tight">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Innovate?</span>
              </h2>

              <p className="text-slate-600 text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                Join thousands of students performing state-of-the-art virtual experiments.
                Step into the future of scientific exploration today.
              </p>

              <Link
                to="/dashboard"
                className="group relative inline-flex items-center justify-center gap-4 bg-blue-600 text-white px-12 py-6 rounded-2xl font-black text-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-blue-600/40 overflow-hidden"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <span className="relative z-10">Enter Virtual Lab</span>
                <ArrowRight size={28} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              </Link>

              <div className="mt-12 flex items-center gap-8 text-slate-500 font-bold text-xs uppercase tracking-[0.3em]">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> 100+ Experiments</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> AI Assisted</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Cloud Sync</span>
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
            <path d="M0 50 Q 25 0, 50 50 T 100 50" fill="none" stroke="#2563EB" strokeWidth="0.5" className="animate-pulse" />
            <path d="M0 60 Q 25 10, 50 60 T 100 60" fill="none" stroke="#2563EB" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '1s' }} />
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center">
            {/* Animated Icon Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="w-24 h-24 bg-gradient-to-br from-blue-600/5 to-blue-600/10 rounded-full flex items-center justify-center mb-12 relative"
            >
              <div className="absolute inset-0 rounded-full border border-blue-600/20 animate-ping opacity-20" />
              <Lightbulb size={40} className="text-blue-600 relative z-10" />
            </motion.div>

            <div className="text-center">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-4 block"
              >
                Manifesto
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-7xl font-black text-slate-900 mb-12 tracking-tight"
              >
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Vision</span>
              </motion.h2>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Large Stylized Quotes */}
              <span className="absolute -top-12 -left-8 text-9xl font-serif text-blue-600/10 select-none">“</span>
              <span className="absolute -bottom-24 -right-8 text-9xl font-serif text-blue-600/10 select-none">”</span>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
              >
                <p className="text-2xl md:text-4xl lg:text-5xl text-slate-800 leading-[1.3] font-medium text-center italic tracking-tight">
                  To democratize access to <span className="text-blue-600 font-black">high-fidelity scientific equipment</span> by bringing the physical laboratory directly into the digital realm.
                </p>

                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto my-12" />

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
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Meet the <span className="text-blue-600">Builders</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-16">
              The Quantum AI Virtual Lab was conceptualized and developed by dedicated innovators.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-4xl mx-auto">

            {/* Engineer 1 - Nidhi Chaudhary */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center group"
            >
              <div className="w-40 h-40 rounded-[2rem] bg-slate-50 overflow-hidden mb-6 relative border border-slate-200 shadow-lg group-hover:-translate-y-2 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-600 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="w-full h-full flex items-center justify-center text-cyan-600">
                  <Cpu size={64} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Nidhi Chaudhary</h3>
              <p className="text-cyan-600 font-bold text-sm uppercase tracking-wide mb-3">Founder</p>
              <p className="text-slate-600 text-sm text-center">Spearheading the integration of computational models and modern web architectures.</p>
            </motion.div>

            {/* Engineer 2 - Sujal Shah */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.9 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center group"
            >
              <div className="w-40 h-40 rounded-[2rem] bg-slate-50 overflow-hidden mb-6 relative border border-slate-200 shadow-lg group-hover:-translate-y-2 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-violet-600 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="w-full h-full flex items-center justify-center text-blue-600">
                  <Cpu size={64} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Sujal Shah</h3>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-wide mb-3">Founder</p>
              <p className="text-slate-600 text-sm text-center">Architecting robust backend systems and real-time physics engine simulations.</p>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Layer 11: Expanded Footer */}
      <footer className="bg-slate-50 text-slate-600 pt-20 pb-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="font-display font-bold text-slate-900 text-2xl tracking-wide">Quantum AI Labs</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-6">
                Pioneering the intersection of artificial intelligence, quantum computing, and interactive physics simulations for higher education.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-50 text-blue-600 transition-colors shadow-sm">
                  <Users size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-blue-50 text-blue-600 transition-colors shadow-sm">
                  <BookOpen size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link to="/dashboard" className="hover:text-blue-600 transition-colors">Simulations Dashboard</Link></li>
                <li><Link to="/theory" className="hover:text-blue-600 transition-colors">Theory & Manuals</Link></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">BSc Quantum Tech</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-900 font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li>Quantum AI Labs</li>
                <li>Gandhinagar, Gujarat, India</li>
                <li>Email: growify.in@gmail.com</li>
                <li>Support: growify.in@gmail.com</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 uppercase tracking-widest font-bold">
            <p>&copy; 2026 Quantum AI Labs. All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-blue-600">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function QuantumHUD({ height = 600 }) {
  return (
    <iframe
      src="/code.html"
      width="100%"
      height={height}
      frameBorder="0"
      scrolling="no"
      style={{ display: 'block', borderRadius: '12px', border: 'none' }}
      title="Quantum Computer HUD Animation"
    />
  );
}



