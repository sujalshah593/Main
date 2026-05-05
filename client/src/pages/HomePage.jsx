import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { SEMESTERS } from "../data/semesterContent.js";

const FEATURES = [
  {
    icon: <Zap className="text-lab-tertiary" size={20} />,
    title: "Interactive Simulators",
    description: "Hands-on experience with physics and math phenomena in a virtual environment."
  },
  {
    icon: <Activity className="text-lab-secondary" size={20} />,
    title: "Real-time Tracking",
    description: "Record and analyze experiment data with dynamic charts and tables."
  },
  {
    icon: <Shield className="text-lab-primary" size={20} />,
    title: "Concept Validation",
    description: "Built-in quizzes and self-evaluation modules to test your understanding."
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-12 w-full max-w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-8 lg:pt-16">
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-lab-accent3/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-lab-accent/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 space-y-8 text-center lg:text-left"
          >
            <div className="badge-primary gap-2">
              <Star size={12} className="fill-current" />
              Next-Gen Learning
            </div>
 
            <h1 className="font-display text-5xl lg:text-8xl font-extrabold text-lab-text leading-none tracking-tight">
              Explore the <span className="text-gradient-tri">Quantum</span> World
            </h1>
 
            <p className="text-lg text-lab-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Experience the convergence of Artificial Intelligence and Quantum Technology through high-fidelity virtual laboratories and interactive theory modules.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                to="/semester/sem-1"
                className="btn-primary flex items-center gap-3 px-8 py-4 text-base"
              >
                Explore Labs
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#semesters"
                className="btn-ghost px-8 py-4 text-base flex items-center gap-2"
              >
                View Curriculum
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative w-full"
          >
            <div className="highlight-panel p-8 rounded-[40px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
 
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-32 bg-lab-panel/60 rounded-3xl border border-lab-primary/10 flex items-center justify-center">
                    <Beaker size={40} className="text-lab-primary" />
                  </div>
                  <div className="h-48 bg-lab-panel/40 rounded-3xl border border-lab-primary/10 flex items-center justify-center p-6 text-center">
                    <p className="text-xs font-bold text-lab-primary uppercase tracking-wider">Interactive Simulations</p>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-48 bg-lab-panel/60 rounded-3xl border border-lab-secondary/10 flex items-center justify-center p-6 text-center">
                    <p className="text-xs font-bold text-lab-secondary uppercase tracking-wider">AI Lab Assistant</p>
                  </div>
                  <div className="h-32 bg-lab-panel/40 rounded-3xl border-lab-secondary/10 flex items-center justify-center">
                    <Cpu size={40} className="text-lab-secondary" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-10 group"
          >
            <div className="w-14 h-14 rounded-2xl bg-lab-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-lab-text mb-4">{feature.title}</h3>
            <p className="text-[15px] text-lab-muted leading-relaxed font-medium">{feature.description}</p>
          </motion.div>
        ))}
      </section>

      {/* Semesters Section */}
      <section id="semesters" className="space-y-10 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-4xl font-display font-bold text-lab-text">Your Learning Journey</h2>
            <p className="text-lab-muted font-medium">Select a semester to explore its curriculum and practicals.</p>
          </div>
          <div className="badge-secondary gap-2 px-4 py-2">
            <Layers size={14} />
            Academic Year 2026-27
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {SEMESTERS.map((semester, i) => (
            <motion.div
              key={semester.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/semester/${semester.id}`}
                className="group block glass-card p-1 overflow-hidden"
              >
                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="badge-primary">
                      {semester.id}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-lab-primary/10 flex items-center justify-center text-lab-primary group-hover:bg-lab-primary group-hover:text-white transition-all duration-300">
                      <ChevronRight size={20} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-bold text-lab-text group-hover:text-lab-primary transition-colors">
                      {semester.label}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-lab-muted font-medium">
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
        className="rounded-[40px] border border-sky-200 bg-gradient-to-br from-sky-500 to-indigo-600 p-12 text-center relative overflow-hidden group shadow-2xl"
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl font-display font-extrabold text-white">Ready to start your first experiment?</h2>
          <p className="text-sky-50 max-w-xl mx-auto text-lg font-medium">
            Dive into our collection of interactive labs designed to make complex concepts intuitive and engaging.
          </p>
          <div className="flex justify-center pt-4">
            <Link
              to="/semester/sem-1"
              className="rounded-2xl bg-white text-sky-600 hover:bg-sky-50 px-12 py-5 text-lg font-bold flex items-center gap-4 transition-all shadow-xl hover:-translate-y-1"
            >
              <Beaker size={24} />
              Launch Lab Portal
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}