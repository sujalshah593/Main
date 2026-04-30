import React, { useRef, useEffect, useState } from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';

export default function PendulumSimulation({ length, isDampingEnabled, initialAngle, setOscillationCount, isPlaying, setIsPlaying }) {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  const timeRef = useRef(0);
  
  // Physics constants
  const g = 9.81; // m/s^2
  // We map the length from [0.1, 1.0] meters to pixels for drawing.
  const pixelPerMeter = 250; 
  const pivotX = 200;
  const pivotY = 50;
  
  const [angle, setAngle] = useState(initialAngle);
  const [oscillations, setOscillations] = useState(0);
  const lastExtremumRef = useRef(0);
  const directionRef = useRef(1);

  // Reset physics when stopped
  useEffect(() => {
    if (!isPlaying) {
      setAngle(initialAngle);
      timeRef.current = 0;
      setOscillations(0);
      setOscillationCount(0);
      lastExtremumRef.current = initialAngle;
      directionRef.current = initialAngle < 0 ? 1 : -1;
      draw(initialAngle);
    }
  }, [isPlaying, initialAngle, length]);

  const draw = (currentAngle) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw rigid support
    ctx.fillStyle = '#475569'; // slate-600
    ctx.fillRect(pivotX - 50, pivotY - 10, 100, 10);
    
    // Draw pivot point
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = '#94a3b8'; // slate-400
    ctx.fill();

    // Calculate bob position
    const bobX = pivotX + (length * pixelPerMeter) * Math.sin(currentAngle);
    const bobY = pivotY + (length * pixelPerMeter) * Math.cos(currentAngle);

    // Draw string
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(bobX, bobY);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw bob
    ctx.beginPath();
    ctx.arc(bobX, bobY, 15, 0, 2 * Math.PI);
    const gradient = ctx.createRadialGradient(bobX - 5, bobY - 5, 2, bobX, bobY, 15);
    gradient.addColorStop(0, '#f87171'); // red-400
    gradient.addColorStop(1, '#991b1b'); // red-800
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = '#7f1d1d';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  const animate = (time) => {
    // We use a fixed time step for physics simulation relative to real time.
    // 60fps = ~0.016s per frame. We'll simulate real-time.
    const dt = 0.016; 
    timeRef.current += dt;

    const t = timeRef.current;
    
    // Angular frequency w = sqrt(g/L)
    const w = Math.sqrt(g / length);
    
    // Damping factor (gamma)
    const gamma = isDampingEnabled ? 0.05 : 0; 
    
    // theta(t) = theta0 * e^(-gamma * t) * cos(w * t)
    const currentAngle = initialAngle * Math.exp(-gamma * t) * Math.cos(w * t);
    setAngle(currentAngle);
    draw(currentAngle);

    // Count oscillations (one full cycle = returning to near initial angle and same direction)
    // Actually, counting zero crossings is easier.
    // Let's check when it hits extremum (velocity crosses zero)
    // Velocity is derivative: v(t) ~ -w * theta0 * e... * sin(w*t)
    // It crosses zero when w*t is multiple of pi.
    // Better simple way: check sign of velocity or just track peaks.
    const phase = w * t;
    const currentOscillations = Math.floor(phase / (2 * Math.PI));
    if (currentOscillations > oscillations) {
      setOscillations(currentOscillations);
      setOscillationCount(currentOscillations);
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, length, isDampingEnabled]);

  // Initial render
  useEffect(() => {
    if (!isPlaying) draw(angle);
  }, []);

  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <h3 className="text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider w-full text-left">Simulation Viewer</h3>
      <div className="relative bg-[#0f172a] rounded-lg border border-slate-600 shadow-inner overflow-hidden w-full max-w-[400px]">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={350} 
          className="w-full h-auto"
        />
        
        {/* Real-time angle display */}
        <div className="absolute top-4 right-4 bg-black/50 px-2 py-1 rounded text-xs font-mono text-sky-400">
          θ = {(angle * 180 / Math.PI).toFixed(1)}°
        </div>
      </div>
      
      {/* Simulation Controls embedded here or external. Let's keep play/stop external but offer visual feedback */}
    </div>
  );
}
