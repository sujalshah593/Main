import React from 'react';
import IAR from '../../../public/IAR.png';

export default function QuantumNavbar() {
  return (
    <nav className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#7A1540] via-pink-500 to-[#7A1540] opacity-80" />

      <div className="max-w-[1920px] mx-auto px-6 md:px-12 h-20 md:h-32 flex items-center justify-between">

        {/* Left: Institution Logo with Breathing Animation */}
        <div className="flex-shrink-0 flex items-center h-full py-4 group">
          <img
            src={IAR}
            alt="IAR Logo"
            className="h-full w-auto object-contain animate-pulse-slow group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />
        </div>

        {/* Center: Main Branding with Metallic Gradient & Hover Effects */}
        <div className="flex-grow flex flex-col justify-center items-center overflow-hidden px-4">
          <h1 className="text-3xl md:text-6xl lg:text-8xl font-display font-black tracking-[-0.03em] md:tracking-[0.02em] uppercase leading-none text-center whitespace-nowrap
                         bg-clip-text text-transparent bg-gradient-to-b from-[#7A1540] to-[#b12a5d]
                         drop-shadow-[0_2px_15px_rgba(122,21,64,0.15)]
                         hover:scale-[1.02] transition-transform duration-500 cursor-default select-none">
            QUANTUM AI LAB
          </h1>
          {/* Subtext/Slogan under the main title */}
          <div className="mt-1 hidden md:flex items-center gap-4">
            <div className="h-[1px] w-12 bg-slate-200" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Advanced Research Portal</span>
            <div className="h-[1px] w-12 bg-slate-200" />
          </div>
        </div>


      </div>

      {/* Bottom subtle glow line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7A1540]/10 to-transparent" />
    </nav>
  );
}
