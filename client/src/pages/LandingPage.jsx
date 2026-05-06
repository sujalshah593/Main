import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Activity, Lightbulb, Zap, Microscope, BookOpen, Star, Users, GraduationCap, Award } from 'lucide-react';
import logo from '../../public/logo.png';
import LandingNavbar from '../components/LandingNavbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden font-sans">
      <LandingNavbar />

      {/* Layer 2: Hero Section (IAR AI Quantum Lab) */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden bg-[#FAFAFA]">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#7A1540]/5 to-purple-400/5 blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-sky-400/5 to-indigo-400/5 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center w-full max-w-4xl mx-auto flex flex-col items-center gap-8"
        >
          <h2 className="font-display text-4xl md:text-6xl lg:text-[90px] font-black tracking-tighter leading-tight text-slate-900">
            Simulated <br />
            <span className="inline-block pb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#7A1540] to-purple-600">
              Experiments Hub
            </span>
          </h2>

          <p className="text-lg md:text-2xl text-slate-600 max-w-2xl leading-relaxed font-medium">
            Step into the future of scientific exploration. Harnessing the power of Artificial Intelligence
            and Quantum Mechanics to redefine interactive learning.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/dashboard"
              className="group relative flex items-center justify-center gap-3 bg-[#7A1540] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 hover:bg-[#601032] shadow-xl hover:shadow-[#7A1540]/20"
            >
              <span>Explore Labs</span>
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>


          </div>
        </motion.div>
      </section>


      {/* Layer 4: Popular Experiments Grid */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Explore Our <span className="text-[#7A1540]">Virtual Labs</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Perform complex physics and engineering experiments right from your browser with highly accurate simulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Lab Card 1 */}
            <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Activity size={80} className="text-[#7A1540]" />
              </div>
              <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
                <Activity size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Simple Pendulum</h3>
              <p className="text-slate-600 mb-6">Investigate the relationship between pendulum length, mass, and time period with real-time graphing.</p>
              <Link to="/dashboard" className="text-[#7A1540] font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Try Simulator <ArrowRight size={18} />
              </Link>
            </div>

            {/* Lab Card 2 */}
            <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Zap size={80} className="text-amber-600" />
              </div>
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Energy Conservation</h3>
              <p className="text-slate-600 mb-6">Visualize kinetic and potential energy transfers in a dynamic simulation environment.</p>
              <Link to="/dashboard" className="text-amber-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Try Simulator <ArrowRight size={18} />
              </Link>
            </div>

            {/* Lab Card 3 */}
            <div className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu size={80} className="text-indigo-600" />
              </div>
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Cpu size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Moment of Inertia</h3>
              <p className="text-slate-600 mb-6">Measure the rotational inertia of a flywheel using virtual masses and precision timers.</p>
              <Link to="/dashboard" className="text-indigo-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                Try Simulator <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 5: How It Works (IAR Theme) */}
      <section className="py-24 bg-[#7A1540] text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwdjIwaDIwVjIwaC0yMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMSkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')]"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-white">
              How the <span className="text-pink-300">Virtual Lab</span> Works
            </h2>
            <p className="text-white/80 text-lg">
              A seamless workflow designed to enhance understanding through interactive validation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/20 -translate-y-1/2 z-0" />

            {/* Step 1 */}
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#601032] border-2 border-pink-300 rounded-full flex items-center justify-center text-pink-300 font-black text-xl mb-6 shadow-lg">
                1
              </div>
              <BookOpen size={32} className="text-white mb-4" />
              <h3 className="text-2xl font-bold mb-2">Learn Theory</h3>
              <p className="text-white/70">Study the core physics concepts, formulas, and procedures before beginning the practical.</p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#601032] border-2 border-sky-300 rounded-full flex items-center justify-center text-sky-300 font-black text-xl mb-6 shadow-lg">
                2
              </div>
              <Microscope size={32} className="text-white mb-4" />
              <h3 className="text-2xl font-bold mb-2">Virtual Setup</h3>
              <p className="text-white/70">Drag and drop equipment onto the canvas and wire them together perfectly.</p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#601032] border-2 border-emerald-300 rounded-full flex items-center justify-center text-emerald-300 font-black text-xl mb-6 shadow-lg">
                3
              </div>
              <Lightbulb size={32} className="text-white mb-4" />
              <h3 className="text-2xl font-bold mb-2">Analyze Data</h3>
              <p className="text-white/70">Run the simulation, collect real-time data points, and view auto-generated interactive charts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 6: BSc Quantum Technology Launch */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-white rounded-[40px] shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
            <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold text-sm w-max mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                NEW ADMISSIONS OPEN
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                B.Sc.(H) in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Quantum Technology</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Be at the forefront of the next technological revolution. Our new B.Sc.(H) program combines deep physics, advanced mathematics, and cutting-edge computing to prepare you for the Quantum Era.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-slate-700 font-medium"><GraduationCap className="text-[#7A1540]" /> 4-Year Undergraduate Program</div>
                <div className="flex items-center gap-3 text-slate-700 font-medium"><Cpu className="text-[#7A1540]" /> Hands-on Quantum Algorithms</div>
                <div className="flex items-center gap-3 text-slate-700 font-medium"><Microscope className="text-[#7A1540]" /> Industry-Aligned Curriculum</div>
              </div>
              <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-[#7A1540] transition-colors w-max shadow-lg shadow-slate-900/20">
                Download Brochure
              </button>
            </div>
            <div className="lg:w-1/2 bg-gradient-to-br from-indigo-900 to-[#7A1540] p-8 md:p-12 flex items-center justify-center relative overflow-hidden min-h-[300px]">
              {/* Abstract Quantum Graphic */}
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMSkiLz48L3N2Zz4=')]"></div>
              <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 border-4 border-white/20 rounded-full flex items-center justify-center animate-[spin_30s_linear_infinite]">
                <div className="w-48 h-48 border-4 border-white/40 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite_reverse]">
                  <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full border border-white/50 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.2)]">
                    <Cpu size={48} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Layer 8: Reviews / Testimonials */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              What Students <span className="text-[#7A1540]">Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex text-amber-400 mb-4">
                <Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" />
              </div>
              <p className="text-slate-700 font-medium mb-6">"The drag-and-drop circuit building feels incredibly realistic. It helped me understand energy conservation much better than standard textbook diagrams."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7A1540]/10 flex items-center justify-center font-bold text-[#7A1540]">AS</div>
                <div>
                  <div className="font-bold text-slate-900">Aryan Sharma</div>
                  <div className="text-xs text-slate-500">BSc Physics, 2nd Year</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex text-amber-400 mb-4">
                <Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" />
              </div>
              <p className="text-slate-700 font-medium mb-6">"Having the automated physics engine plot graphs instantly as I tweak the simple pendulum length is mind-blowing. Amazing platform!"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">RP</div>
                <div>
                  <div className="font-bold text-slate-900">Riya Patel</div>
                  <div className="text-xs text-slate-500">BSc Computer Science</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex text-amber-400 mb-4">
                <Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" />
              </div>
              <p className="text-slate-700 font-medium mb-6">"No more fighting for lab equipment time. I can practice my flywheel experiments at 2 AM from my dorm. The validation system is perfect."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600">KD</div>
                <div>
                  <div className="font-bold text-slate-900">Karan Desai</div>
                  <div className="text-xs text-slate-500">Engineering Student</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 9: Call to Action Banner */}
      <section className="py-20 bg-[#7A1540] text-center px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <Award size={48} className="text-pink-300 mb-6" />
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to Innovate?</h2>
          <p className="text-white/80 text-xl mb-10">Join thousands of students performing state-of-the-art virtual experiments today.</p>
          <Link to="/dashboard" className="bg-white text-[#7A1540] px-10 py-5 rounded-2xl font-black text-xl hover:bg-slate-100 transition-colors shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-3">
            Enter Virtual Lab <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      {/* Layer 10: Our Vision */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Lightbulb size={32} className="text-[#7A1540]" />
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-8">
            Our <span className="text-[#7A1540]">Vision</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
            "To democratize access to high-fidelity scientific equipment by bringing the physical laboratory directly into the digital realm. We believe that immersive, AI-guided simulations are the key to unlocking the next generation of quantum researchers, engineers, and physicists across the globe."
          </p>
        </div>
      </section>

      {/* Layer 7: Meet the Builders */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Meet the <span className="text-[#7A1540]">Builders</span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-16">
            The Quantum AI Virtual Lab was conceptualized and developed by dedicated innovators at IAR.
          </p>

          <div className="flex flex-wrap justify-center gap-12">
            {/* Founder 1 */}
            <div className="flex flex-col items-center max-w-xs group">
              <div className="w-40 h-40 rounded-[2rem] bg-slate-100 overflow-hidden mb-6 relative border-4 border-white shadow-xl group-hover:-translate-y-2 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#7A1540] to-pink-400 opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                  <Users size={64} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Keval Gandhi</h3>
              <p className="text-[#7A1540] font-bold text-sm uppercase tracking-wide mb-3">Founder</p>
              <p className="text-slate-600 text-sm">Visionary leader driving the future of quantum education and interactive learning.</p>
            </div>

            {/* Engineer 1 */}
            <div className="flex flex-col items-center max-w-xs group">
              <div className="w-40 h-40 rounded-[2rem] bg-slate-100 overflow-hidden mb-6 relative border-4 border-white shadow-xl group-hover:-translate-y-2 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-sky-400 opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                  <Cpu size={64} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Sujal Shah</h3>
              <p className="text-indigo-600 font-bold text-sm uppercase tracking-wide mb-3">Lead Engineer</p>
              <p className="text-slate-600 text-sm">Spearheading the integration of computational models and modern web architectures.</p>
            </div>

            {/* Engineer 2 */}
            <div className="flex flex-col items-center max-w-xs group">
              <div className="w-40 h-40 rounded-[2rem] bg-slate-100 overflow-hidden mb-6 relative border-4 border-white shadow-xl group-hover:-translate-y-2 transition-transform">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-teal-400 opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                  <Cpu size={64} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Nidhi Chaudhary</h3>
              <p className="text-emerald-600 font-bold text-sm uppercase tracking-wide mb-3">Lead Engineer</p>
              <p className="text-slate-600 text-sm">Architecting robust backend systems and real-time physics engine simulations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Layer 11: Expanded Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src={logo} alt="IAR Logo" className="h-10 w-auto object-contain brightness-0 invert opacity-90" />
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



