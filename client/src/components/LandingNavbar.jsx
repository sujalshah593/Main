import React from 'react';
import logo from '../public/logo.png';

export default function LandingNavbar() {
  return (
    <nav className="w-full bg-white flex items-center justify-center border-b border-slate-200 shadow-sm py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-6 flex justify-center w-full">
        <img
          src={logo}
          alt="IAR Logo"
          className="h-16 md:h-24 w-auto object-contain transition-all"
        />
      </div>
    </nav>
  );
}
