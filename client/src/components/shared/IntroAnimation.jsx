import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Particle = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.4, 0],
      scale: [0, 1.2, 0],
      x: [0, (Math.random() - 0.5) * 500],
      y: [0, (Math.random() - 0.5) * 500]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      delay: delay,
      ease: "easeOut" 
    }}
    className="absolute w-1.5 h-1.5 bg-[#7A1540] rounded-full blur-[0.5px]"
  />
);

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState('entering');

  useEffect(() => {
    const holdTimer = setTimeout(() => {
      setPhase('zooming');
    }, 3500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
    >
      {/* Background Atmosphere - Light Version */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(122,21,64,0.05)_0%,transparent_70%)]" />
        
        {/* Animated Particles */}
        <div className="absolute top-1/2 left-1/2">
          {[...Array(40)].map((_, i) => (
            <Particle key={i} delay={Math.random() * 4} />
          ))}
        </div>

        {/* Ambient Glowing Orbs - Maroon/Pink Theme */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-rose-50 rounded-full blur-[160px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-1/4 -right-1/4 w-[900px] h-[900px] bg-slate-100 rounded-full blur-[180px]" 
        />
      </div>

      {/* Main Cinematic Text Container */}
      <AnimatePresence>
        {phase === 'entering' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, filter: "blur(15px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 text-center"
          >
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="block text-[#7A1540] text-sm md:text-xl font-black uppercase tracking-[0.8em] mb-4 opacity-40 font-body"
            >
              Welcome to
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ 
                opacity: 1, 
                letterSpacing: "0.5em",
                textShadow: [
                  "0 0 20px rgba(122,21,64,0.1)",
                  "0 0 40px rgba(122,21,64,0.2)",
                  "0 0 20px rgba(122,21,64,0.1)"
                ]
              }}
              transition={{ 
                opacity: { duration: 2 },
                letterSpacing: { duration: 4, ease: "easeOut" },
                textShadow: { duration: 4, repeat: Infinity }
              }}
              className="text-5xl md:text-8xl lg:text-9xl font-black text-slate-900 uppercase leading-none font-display"
            >
              Quantum <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7A1540] to-pink-600">Lab</span>
            </motion.h1>

            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 2, ease: "easeInOut" }}
              className="h-[2px] w-48 md:w-96 bg-gradient-to-r from-transparent via-[#7A1540]/30 to-transparent mx-auto mt-12"
            />
          </motion.div>
        )}

        {phase === 'zooming' && (
          <motion.div 
            initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            animate={{ 
              opacity: 0, 
              scale: 15, 
              filter: "blur(20px)",
              x: [0, -2, 2, -1, 1, 0],
              y: [0, 1, -1, 2, -2, 0]
            }}
            transition={{ 
              duration: 1.2, 
              ease: [0.7, 0, 0.84, 0]
            }}
            className="relative z-10 text-center"
          >
            <span className="block text-[#7A1540] text-xl font-bold uppercase tracking-[0.8em] mb-4 opacity-40">
              Welcome to
            </span>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-slate-900 uppercase leading-none tracking-[0.5em]">
              Quantum <br /> Lab
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />
    </motion.div>
  );
}
