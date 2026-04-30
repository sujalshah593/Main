import React, { useEffect, useRef, useState } from 'react';

export default function InclinedFrictionSimulation({
  angle, // degrees
  surfaceType,
  setSimulationState
}) {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const startTimeRef = useRef(null);

  // Surface properties (matching previous friction experiment)
  const SURFACES = {
    'Wood on Wood': { us: 0.4, uk: 0.3, color: '#92400e' },
    'Metal on Metal': { us: 0.6, uk: 0.4, color: '#475569' },
    'Rubber on Concrete': { us: 0.8, uk: 0.6, color: '#1e293b' },
    'Ice on Ice': { us: 0.1, uk: 0.05, color: '#e0f2fe' }
  };

  // Physics state
  const stateRef = useRef({
    distance: 0,
    v: 0,
    a: 0,
    isSliding: false,
    angleReached: 0
  });

  const g = 9.81;

  const updatePhysics = (deltaTime) => {
    const s = stateRef.current;
    const surface = SURFACES[surfaceType] || SURFACES['Wood on Wood'];
    const rad = (angle * Math.PI) / 180;

    // Check if sliding should start
    // Sliding starts if tan(theta) > mu_s
    if (!s.isSliding) {
      if (Math.tan(rad) > surface.us) {
        s.isSliding = true;
        s.angleReached = angle;
      } else {
        s.distance = 0;
        s.v = 0;
        s.a = 0;
      }
    }

    if (s.isSliding) {
      // a = g * sin(theta) - mu_k * g * cos(theta)
      s.a = g * Math.sin(rad) - surface.uk * g * Math.cos(rad);
      if (s.a < 0) s.a = 0; // Should not happen if mu_s > mu_k
      
      s.v += s.a * deltaTime;
      s.distance += s.v * deltaTime * 50; // Scale for visualization
      
      // Stop at end of plane
      if (s.distance > 400) {
        s.distance = 400;
        s.v = 0;
        s.a = 0;
      }
    }

    setSimulationState({
      isSliding: s.isSliding,
      angleReached: s.angleReached,
      distance: s.distance,
      v: s.v,
      a: s.a
    });
  };

  const draw = (ctx) => {
    const s = stateRef.current;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const surface = SURFACES[surfaceType] || SURFACES['Wood on Wood'];
    const rad = (angle * Math.PI) / 180;

    ctx.clearRect(0, 0, width, height);

    const pivotX = 100;
    const pivotY = height - 100;
    const planeLength = 500;

    // Draw Base
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(pivotX + planeLength, pivotY);
    ctx.stroke();

    // Draw Plane
    ctx.save();
    ctx.translate(pivotX, pivotY);
    ctx.rotate(-rad);
    
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, planeLength, 10);
    ctx.strokeStyle = '#475569';
    ctx.strokeRect(0, 0, planeLength, 10);

    // Draw Block
    const blockWidth = 60;
    const blockHeight = 40;
    const blockX = s.distance;
    const blockY = -blockHeight;

    ctx.fillStyle = surface.color;
    ctx.fillRect(blockX, blockY, blockWidth, blockHeight);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.strokeRect(blockX, blockY, blockWidth, blockHeight);

    // Force Vectors (if sliding or high angle)
    if (angle > 5) {
      // mg sin theta (along plane)
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(blockX + blockWidth / 2, blockY + blockHeight / 2);
      ctx.lineTo(blockX + blockWidth / 2 + 50, blockY + blockHeight / 2);
      ctx.stroke();
      
      // friction (backwards)
      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(blockX + blockWidth / 2, blockY + blockHeight / 2);
      ctx.lineTo(blockX + blockWidth / 2 - 40, blockY + blockHeight / 2);
      ctx.stroke();
    }

    ctx.restore();

    // Protractor/Angle display (UI on canvas)
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 80, 0, -rad, true);
    ctx.strokeStyle = '#6366f1';
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
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
    // Reset block if angle is lowered or surface changed
    if (!stateRef.current.isSliding || angle < stateRef.current.angleReached - 2) {
       stateRef.current.isSliding = false;
       stateRef.current.distance = 0;
       stateRef.current.v = 0;
    }
    
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [angle, surfaceType]);

  return (
    <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-inner">
      <canvas ref={canvasRef} width={800} height={450} className="w-full h-full" />
      
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Angle Display</span>
          <div className="text-xl font-mono font-bold text-sky-400">
            {angle.toFixed(1)}°
          </div>
        </div>
      </div>
    </div>
  );
}
