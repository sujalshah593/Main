import React from 'react';
import logo from '../../public/snapshots/logo.png';

export default function LandingNavbar() {
  return (
    <nav className="w-full bg-white flex items-center justify-center border-b border-slate-200 shadow-sm py-2 md:py-3">
      <div className="max-w-screen-2xl mx-auto px-8 flex justify-center w-full">
        <img
          src={logo}
          alt="IAR Logo"
          className="h-12 md:h-20 w-auto object-contain transition-all"
        />
      </div>
    </nav>
  );
}
