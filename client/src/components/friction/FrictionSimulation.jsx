import React, { useEffect, useRef } from 'react';

export default function FrictionSimulation({
  mass,
  surfaceType,
  appliedForce,
  setSimulationState
}) {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const lastTimeRef = useRef(null);

  // Surface properties
  const SURFACES = {
    'Wood on Wood':      { us: 0.4, uk: 0.3, color: '#b45309' },
    'Metal on Metal':   { us: 0.6, uk: 0.4, color: '#64748b' },
    'Rubber on Concrete': { us: 0.8, uk: 0.6, color: '#374151' },
    'Ice on Ice':        { us: 0.1, uk: 0.05, color: '#bae6fd' }
  };

  const g = 9.81;

  // Physics state stored in a ref so it persists between renders
  const physicsRef = useRef({
    x: 80,
    v: 0,
    frictionForce: 0,
    isMoving: false,
  });

  // Capture latest prop values in refs so the animation loop sees them without restarts
  const massRef = useRef(mass);
  const appliedForceRef = useRef(appliedForce);
  const surfaceTypeRef = useRef(surfaceType);

  useEffect(() => { massRef.current = mass; }, [mass]);
  useEffect(() => { appliedForceRef.current = appliedForce; }, [appliedForce]);

  // When surface changes, reset motion
  useEffect(() => {
    surfaceTypeRef.current = surfaceType;
    const p = physicsRef.current;
    p.isMoving = false;
    p.v = 0;
    p.frictionForce = 0;
  }, [surfaceType]);

  // Draw frame
  const draw = (ctx) => {
    const p = physicsRef.current;
    const surface = SURFACES[surfaceTypeRef.current] || SURFACES['Wood on Wood'];
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Ground surface texture
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, h - 90, w, 90);
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, h - 92, w, 4);

    // Surface label
    ctx.font = 'bold 11px monospace';
    ctx.fillStyle = '#64748b';
    ctx.fillText(surfaceTypeRef.current.toUpperCase(), 12, h - 10);

    // Block
    const blockW = 90;
    const blockH = 55;
    const blockX = Math.max(10, Math.min(p.x, w - blockW - 10));
    const blockY = h - 92 - blockH;

    // Block shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(blockX + 4, blockY + blockH + 2, blockW, 6);

    // Block body
    ctx.fillStyle = surface.color;
    ctx.fillRect(blockX, blockY, blockW, blockH);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 2;
    ctx.strokeRect(blockX, blockY, blockW, blockH);

    // Block label
    ctx.font = 'bold 10px monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.textAlign = 'center';
    ctx.fillText(`${massRef.current.toFixed(1)} kg`, blockX + blockW / 2, blockY + blockH / 2 + 4);
    ctx.textAlign = 'left';

    const cx = blockX + blockW / 2;
    const cy = blockY + blockH / 2;

    // Applied force arrow (green, right)
    const F = appliedForceRef.current;
    if (F > 0) {
      const len = Math.min(F * 3, 110);
      drawArrow(ctx, cx + blockW / 2, cy, cx + blockW / 2 + len, cy, '#10b981', 3);
      ctx.font = 'bold 10px monospace';
      ctx.fillStyle = '#10b981';
      ctx.fillText(`F=${F.toFixed(1)}N`, cx + blockW / 2 + 6, cy - 8);
    }

    // Friction arrow (red, left)
    const ff = p.frictionForce;
    if (ff > 0.01) {
      const len = Math.min(ff * 3, 110);
      drawArrow(ctx, cx - blockW / 2, cy, cx - blockW / 2 - len, cy, '#ef4444', 3);
      ctx.font = 'bold 10px monospace';
      ctx.fillStyle = '#ef4444';
      ctx.textAlign = 'right';
      ctx.fillText(`f=${ff.toFixed(1)}N`, cx - blockW / 2 - 8, cy - 8);
      ctx.textAlign = 'left';
    }

    // Normal (purple, up) and Gravity (purple, down)
    drawArrow(ctx, cx, cy, cx, cy - 50, '#818cf8', 2);
    drawArrow(ctx, cx, cy, cx, cy + 50, '#818cf8', 2);

    // Status badge
    ctx.fillStyle = p.isMoving ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)';
    ctx.strokeStyle = p.isMoving ? '#10b981' : '#f59e0b';
    ctx.lineWidth = 1;
    roundRect(ctx, 10, 10, 160, 34, 6);
    ctx.fill(); ctx.stroke();
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = p.isMoving ? '#10b981' : '#f59e0b';
    ctx.fillText(p.isMoving ? '▶ KINETIC (Moving)' : '■ STATIC (Still)', 20, 33);
  };

  const drawArrow = (ctx, x1, y1, x2, y2, color, lw) => {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 5) return;
    const ux = dx / len, uy = dy / len;
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    // Arrowhead
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - ux * 10 - uy * 5, y2 - uy * 10 + ux * 5);
    ctx.lineTo(x2 - ux * 10 + uy * 5, y2 - uy * 10 - ux * 5);
    ctx.closePath();
    ctx.fill();
  };

  const roundRect = (ctx, x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  };

  const animate = (time) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05); // cap at 50ms
    lastTimeRef.current = time;

    const p = physicsRef.current;
    const surface = SURFACES[surfaceTypeRef.current] || SURFACES['Wood on Wood'];
    const m = massRef.current;
    const F = appliedForceRef.current;
    const N = m * g;
    const fsMax = surface.us * N;
    const fk = surface.uk * N;

    if (!p.isMoving) {
      if (F > fsMax) {
        p.isMoving = true;
      }
      p.frictionForce = Math.min(F, fsMax); // static friction equals applied, up to max
      p.v = 0;
    }

    if (p.isMoving) {
      p.frictionForce = fk;
      const netF = F - fk;
      const a = netF / m;
      p.v = Math.max(0, p.v + a * dt); // velocity can't go negative (no reverse)
      p.x += p.v * dt * 60; // scale pixels

      // Stop if force removed and block decelerates to 0
      if (F <= fk && p.v <= 0) {
        p.isMoving = false;
        p.v = 0;
      }

      // Wrap around if off-screen
      if (p.x > canvasRef.current.width - 10) {
        p.x = 10;
      }
    }

    setSimulationState({
      frictionForce: p.frictionForce,
      isMoving: p.isMoving,
      normalForce: N,
      v: p.v,
    });

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) draw(ctx);

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    lastTimeRef.current = null; // reset timer so first frame dt = 0
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // run ONCE — prop changes flow through refs

  return (
    <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-inner">
      <canvas ref={canvasRef} width={800} height={450} className="w-full h-full" />
    </div>
  );
}
