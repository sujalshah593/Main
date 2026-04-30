import React, { useEffect, useRef, useState } from 'react';

export default function FrictionSimulation({
  mass, // kg
  surfaceType,
  appliedForce, // N
  isFrictionEnabled,
  setSimulationState
}) {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const startTimeRef = useRef(null);

  // Physics state
  const stateRef = useRef({
    x: 100,
    v: 0,
    a: 0,
    frictionForce: 0,
    isMoving: false,
    maxStaticFriction: 0,
    kineticFriction: 0
  });

  // Surface properties
  const SURFACES = {
    'Wood on Wood': { us: 0.4, uk: 0.3, color: '#92400e' },
    'Metal on Metal': { us: 0.6, uk: 0.4, color: '#475569' },
    'Rubber on Concrete': { us: 0.8, uk: 0.6, color: '#1e293b' },
    'Ice on Ice': { us: 0.1, uk: 0.05, color: '#e0f2fe' }
  };

  const g = 9.81;

  const updatePhysics = (deltaTime) => {
    const s = stateRef.current;
    const surface = SURFACES[surfaceType] || SURFACES['Wood on Wood'];
    
    const normalForce = mass * g;
    s.maxStaticFriction = surface.us * normalForce;
    s.kineticFriction = surface.uk * normalForce;

    if (!s.isMoving) {
      if (appliedForce > s.maxStaticFriction) {
        s.isMoving = true;
        s.frictionForce = s.kineticFriction;
      } else {
        s.frictionForce = appliedForce;
        s.v = 0;
        s.a = 0;
      }
    } else {
      s.frictionForce = s.kineticFriction;
      if (appliedForce < s.frictionForce && s.v <= 0) {
        s.isMoving = false;
        s.v = 0;
        s.a = 0;
      }
    }

    if (s.isMoving) {
      s.a = (appliedForce - s.frictionForce) / mass;
      s.v += s.a * deltaTime;
      s.x += s.v * deltaTime * 100; // scale for visualization
      
      // Reset if off screen
      if (s.x > 500) {
        s.x = 0;
      }
    }

    setSimulationState({
      x: s.x,
      v: s.v,
      a: s.a,
      frictionForce: s.frictionForce,
      isMoving: s.isMoving,
      normalForce: normalForce
    });
  };

  const draw = (ctx) => {
    const s = stateRef.current;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const surfaceColor = (SURFACES[surfaceType] || SURFACES['Wood on Wood']).color;

    ctx.clearRect(0, 0, width, height);

    // Draw Surface
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, height - 100, width, 100);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, height - 100);
    ctx.lineTo(width, height - 100);
    ctx.stroke();

    // Draw Block
    const blockWidth = 80;
    const blockHeight = 50;
    const blockX = s.x;
    const blockY = height - 100 - blockHeight;

    ctx.fillStyle = surfaceColor;
    ctx.fillRect(blockX, blockY, blockWidth, blockHeight);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(blockX, blockY, blockWidth, blockHeight);

    // Draw Force Arrows
    if (appliedForce > 0) {
      // Applied Force Arrow (Right)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      const arrowLen = Math.min(appliedForce * 5, 100);
      ctx.beginPath();
      ctx.moveTo(blockX + blockWidth, blockY + blockHeight / 2);
      ctx.lineTo(blockX + blockWidth + arrowLen, blockY + blockHeight / 2);
      ctx.stroke();
      // Arrowhead
      ctx.beginPath();
      ctx.moveTo(blockX + blockWidth + arrowLen, blockY + blockHeight / 2);
      ctx.lineTo(blockX + blockWidth + arrowLen - 10, blockY + blockHeight / 2 - 5);
      ctx.lineTo(blockX + blockWidth + arrowLen - 10, blockY + blockHeight / 2 + 5);
      ctx.fillStyle = '#10b981';
      ctx.fill();
    }

    if (s.frictionForce > 0) {
      // Friction Force Arrow (Left)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 3;
      const arrowLen = Math.min(s.frictionForce * 5, 100);
      ctx.beginPath();
      ctx.moveTo(blockX, blockY + blockHeight / 2);
      ctx.lineTo(blockX - arrowLen, blockY + blockHeight / 2);
      ctx.stroke();
      // Arrowhead
      ctx.beginPath();
      ctx.moveTo(blockX - arrowLen, blockY + blockHeight / 2);
      ctx.lineTo(blockX - arrowLen + 10, blockY + blockHeight / 2 - 5);
      ctx.lineTo(blockX - arrowLen + 10, blockY + blockHeight / 2 + 5);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
    }

    // Normal Force & Gravity Arrows
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    // Gravity (Down)
    ctx.beginPath();
    ctx.moveTo(blockX + blockWidth / 2, blockY + blockHeight / 2);
    ctx.lineTo(blockX + blockWidth / 2, blockY + blockHeight / 2 + 60);
    ctx.stroke();
    // Normal (Up)
    ctx.beginPath();
    ctx.moveTo(blockX + blockWidth / 2, blockY + blockHeight / 2);
    ctx.lineTo(blockX + blockWidth / 2, blockY + blockHeight / 2 - 60);
    ctx.stroke();
  };

  const animate = (time) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const deltaTime = (time - startTimeRef.current) / 1000;
    startTimeRef.current = time;

    updatePhysics(Math.min(deltaTime, 0.1));
    
    const ctx = canvasRef.current.getContext('2d');
    draw(ctx);
    
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [surfaceType, appliedForce, mass]);

  return (
    <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-inner">
      <canvas ref={canvasRef} width={800} height={450} className="w-full h-full" />
      
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Status</span>
          <div className={`text-sm font-bold ${stateRef.current.isMoving ? 'text-emerald-400' : 'text-amber-400'}`}>
            {stateRef.current.isMoving ? 'Moving (Kinetic)' : 'Stationary (Static)'}
          </div>
        </div>
      </div>
    </div>
  );
}
