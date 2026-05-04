import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Beaker, 
  BookOpen, 
  Cpu, 
  Globe, 
  Layers, 
  Zap, 
  ChevronRight, 
  ArrowRight,
  Activity,
  Shield,
  Star
} from 'lucide-react';
import { SEMESTERS } from '../data/semesterContent.js';

const FEATURES = [
  {
    icon: <Zap className="text-amber-400" size={20} />,
    title: "Interactive Simulators",
    description: "Hands-on experience with physics and math phenomena in a virtual environment."
  },
  {
    icon: <Activity className="text-emerald-400" size={20} />,
    title: "Real-time Tracking",
    description: "Record and analyze experiment data with dynamic charts and tables."
  },
  {
    icon: <Shield className="text-indigo-400" size={20} />,
    title: "Concept Validation",
    description: "Built-in quizzes and self-evaluation modules to test your understanding."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-8 lg:pt-16">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-lab-accent3/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-lab-accent/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lab-accent3/10 border border-lab-accent3/20 text-lab-accent3 text-[11px] font-bold uppercase tracking-widest">
              <Star size={12} className="fill-current" />
              Next-Gen Learning
            </div>
            
            <h1 className="font-display text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
              Master the <span className="bg-clip-text text-transparent bg-gradient-to-r from-lab-accent3 via-white to-lab-accent">Quantum</span> Frontier
            </h1>
            
            <p className="text-lg text-lab-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the convergence of Artificial Intelligence and Quantum Technology through high-fidelity virtual laboratories and interactive theory modules.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link 
                to="/labs" 
                className="px-8 py-4 bg-lab-accent3 hover:bg-lab-accent3/90 text-black font-bold rounded-2xl transition-all shadow-xl shadow-lab-accent3/20 flex items-center gap-2 group"
              >
                Explore Labs
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#semesters" 
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/10 flex items-center gap-2"
              >
                View Curriculum
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative"
          >
            <div className="glass-panel p-8 rounded-[40px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-lab-accent3/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-32 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center">
                    <Beaker size={40} className="text-lab-accent3" />
                  </div>
                  <div className="h-48 bg-lab-accent3/5 rounded-3xl border border-lab-accent3/10 flex items-center justify-center p-6 text-center">
                    <p className="text-xs font-medium text-lab-accent3">Interactive 3D Simulations</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-48 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-6 text-center">
                    <p className="text-xs font-medium text-lab-muted">AI-Driven Lab Assistant</p>
                  </div>
                  <div className="h-32 bg-lab-accent/10 rounded-3xl border border-lab-accent/20 flex items-center justify-center">
                    <Cpu size={40} className="text-lab-accent" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-[14px] text-lab-muted leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Semesters Section */}
      <section id="semesters" className="space-y-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-display font-bold text-white">Your Learning Journey</h2>
            <p className="text-lab-muted">Select a semester to explore its curriculum and practicals.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-lab-muted">
            <Layers size={14} />
            Academic Year 2024-25
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {SEMESTERS.map((semester, i) => (
            <motion.div
              key={semester.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/semester/${semester.id}`}
                className="group relative block overflow-hidden rounded-[32px] glass-panel p-1 border border-white/10 hover:border-lab-accent3/40 transition-all duration-500"
              >
                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="px-3 py-1 rounded-full bg-lab-accent3/10 border border-lab-accent3/20 text-lab-accent3 text-[10px] font-bold uppercase tracking-widest">
                      {semester.id}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-lab-accent3 group-hover:text-black transition-all">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-white group-hover:text-lab-accent3 transition-colors">
                      {semester.label}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-lab-muted">
                      {semester.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white">PH</div>
                      <div className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white">MA</div>
                      <div className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-amber-500 flex items-center justify-center text-[10px] font-bold text-white">CS</div>
                    </div>
                    <span className="text-xs font-medium text-lab-muted">Core Disciplines Included</span>
                  </div>
                </div>
                
                {/* Decoration */}
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                  <Globe size={120} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-[40px] bg-gradient-to-br from-lab-accent3/20 via-indigo-500/10 to-transparent p-12 text-center border border-lab-accent3/20 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-grid-white/5 pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-display font-extrabold text-white">Ready to start your first experiment?</h2>
          <p className="text-lab-muted max-w-xl mx-auto">
            Dive into our collection of interactive labs designed to make complex concepts intuitive and engaging.
          </p>
          <div className="flex justify-center pt-4">
            <Link 
              to="/labs" 
              className="px-10 py-4 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-white/10 flex items-center gap-3"
            >
              <Beaker size={20} />
              Launch Lab Portal
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}