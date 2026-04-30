import React, { useEffect, useRef, useState } from 'react';

export default function FlywheelSimulation({
  mass, // kg
  radius, // m (axle radius)
  numTurns, // Target turns
  woundTurns, // Current turns wound
  isMassAttached,
  isFrictionEnabled,
  isPlaying,
  setIsPlaying,
  onMassDetach,
  onFlywheelStop,
  setSimulationState
}) {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const startTimeRef = useRef(null);
  
  // Physics state
  const stateRef = useRef({
    theta: 0,
    omega: 0,
    alpha: 0,
    time: 0,
    turnsCount: 0,
    isMassActuallyAttached: true, // Internal state for when it's falling
    height: 0,
    maxHeight: 0,
    isStopped: false
  });

  // Constants
  const g = 9.81;
  const I = 0.5; // Theoretical moment of inertia of the flywheel (kg.m^2)
  const flywheelRadius = 0.15; // Visual radius of the big wheel (m)
  const frictionTorque = isFrictionEnabled ? 0.05 : 0;

  const updatePhysics = (deltaTime) => {
    const s = stateRef.current;
    if (s.isStopped) return;

    if (s.isMassActuallyAttached) {
      // Acceleration phase
      s.alpha = (mass * g * radius - frictionTorque) / (I + mass * radius * radius);
      
      s.omega += s.alpha * deltaTime;
      s.theta += s.omega * deltaTime;
      s.time += deltaTime;
      
      // Calculate height fallen
      s.height = radius * s.theta;
      
      if (s.height >= s.maxHeight) {
        s.isMassActuallyAttached = false;
        onMassDetach({
          time: s.time,
          omega: s.omega,
          theta: s.theta
        });
      }
    } else {
      // Retardation phase
      // alpha = -tau_f / I
      s.alpha = -frictionTorque / I;
      s.omega += s.alpha * deltaTime;
      
      if (s.omega <= 0) {
        s.omega = 0;
        s.alpha = 0;
        s.isStopped = true;
        setIsPlaying(false);
        onFlywheelStop({
          time: s.time,
          theta: s.theta
        });
      } else {
        s.theta += s.omega * deltaTime;
        s.time += deltaTime;
      }
    }

    s.turnsCount = s.theta / (2 * Math.PI);
    
    // Update parent state for display
    setSimulationState({
      time: s.time,
      omega: s.omega,
      theta: s.theta,
      turns: s.turnsCount,
      isMassAttached: s.isMassAttached
    });
  };

  const draw = (ctx) => {
    const s = stateRef.current;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const centerX = width / 2;
    const centerY = height / 3;
    const scale = 800; // pixels per meter

    ctx.clearRect(0, 0, width, height);

    // Draw Support Stand
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(centerX - 100, centerY + 200);
    ctx.lineTo(centerX + 100, centerY + 200);
    ctx.stroke();
    
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY + 200);
    ctx.stroke();

    // Draw Flywheel (Big wheel)
    ctx.save();
    ctx.translate(centerX, centerY);
    // During winding, we might want to rotate it slightly? 
    // Or just use theta which is 0 until play.
    const displayTheta = isPlaying ? s.theta : -(woundTurns * 2 * Math.PI / 10); // Subtle rotation when winding
    ctx.rotate(displayTheta);
    
    // Outer rim
    ctx.beginPath();
    ctx.arc(0, 0, flywheelRadius * scale, 0, 2 * Math.PI);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 15;
    ctx.stroke();
    
    // Spokes
    ctx.lineWidth = 4;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(i * Math.PI / 3) * flywheelRadius * scale, Math.sin(i * Math.PI / 3) * flywheelRadius * scale);
      ctx.stroke();
    }
    
    // Axle (Inner wheel)
    ctx.beginPath();
    ctx.arc(0, 0, radius * scale, 0, 2 * Math.PI);
    ctx.fillStyle = '#64748b';
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw Wound String (Visual only)
    if (woundTurns > 0 && !isPlaying) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#cbd5e1';
      for(let i=0; i<woundTurns; i++) {
        ctx.beginPath();
        ctx.arc(0, 0, radius * scale + (i*0.5), 0, 2 * Math.PI);
        ctx.stroke();
      }
    }

    ctx.restore();

    // Draw String and Mass
    if (isPlaying) {
      if (s.isMassActuallyAttached) {
        const massX = centerX + radius * scale;
        const massY = centerY + s.height * scale;
        
        ctx.beginPath();
        ctx.moveTo(massX, centerY);
        ctx.lineTo(massX, massY);
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = '#4b5563';
        ctx.fillRect(massX - 15, massY, 30, 40);
        ctx.strokeStyle = '#1f2937';
        ctx.strokeRect(massX - 15, massY, 30, 40);
      }
    } else {
      // Idle state: draw hanging mass if attached and wound
      if (isMassAttached && woundTurns > 0) {
        const massX = centerX + radius * scale;
        const massY = centerY; // Attached at the top when fully wound
        
        ctx.fillStyle = '#4b5563';
        ctx.fillRect(massX - 15, massY, 30, 40);
        ctx.strokeStyle = '#1f2937';
        ctx.strokeRect(massX - 15, massY, 30, 40);
      }
    }
  };

  const animate = (time) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const deltaTime = (time - startTimeRef.current) / 1000;
    startTimeRef.current = time;

    // Limit deltaTime to prevent jumps
    const dt = Math.min(deltaTime, 0.1);
    
    updatePhysics(dt);
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      draw(ctx);
    }
    
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = null;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying]);

  useEffect(() => {
    stateRef.current = {
      theta: 0,
      omega: 0,
      alpha: 0,
      time: 0,
      turnsCount: 0,
      isMassActuallyAttached: true,
      height: 0,
      maxHeight: 2 * Math.PI * radius * woundTurns,
      isStopped: false
    };
    
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      draw(ctx);
    }
  }, [mass, radius, woundTurns, isMassAttached, isPlaying]);

  return (
    <div className="relative w-full aspect-square max-h-[500px] bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-inner">
      <canvas 
        ref={canvasRef} 
        width={500} 
        height={500} 
        className="w-full h-full"
      />
      
      {/* HUD overlays */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Status</span>
          <div className={`text-sm font-bold ${stateRef.current.isMassAttached ? 'text-amber-400' : 'text-emerald-400'}`}>
            {stateRef.current.isMassAttached ? 'Accelerating' : stateRef.current.isStopped ? 'Stopped' : 'Retarding'}
          </div>
        </div>
      </div>
    </div>
  );
}
