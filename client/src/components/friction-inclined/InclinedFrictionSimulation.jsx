import React, { useEffect, useRef } from 'react';

export default function InclinedFrictionSimulation({
  angle,
  surfaceType,
  setSimulationState
}) {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const lastTimeRef = useRef(null);

  const SURFACES = {
    'Wood on Wood':       { us: 0.4, uk: 0.3, color: '#b45309' },
    'Metal on Metal':    { us: 0.6, uk: 0.4, color: '#64748b' },
    'Rubber on Concrete': { us: 0.8, uk: 0.6, color: '#374151' },
    'Ice on Ice':         { us: 0.1, uk: 0.05, color: '#bae6fd' }
  };

  const g = 9.81;

  const physicsRef = useRef({
    distance: 0,
    v: 0,
    isSliding: false,
    criticalAngle: 0,
  });

  // Capture latest props via refs so the loop doesn't restart
  const angleRef = useRef(angle);
  const surfaceTypeRef = useRef(surfaceType);

  useEffect(() => {
    const prev = angleRef.current;
    angleRef.current = angle;

    const p = physicsRef.current;
    const surface = SURFACES[surfaceTypeRef.current] || SURFACES['Wood on Wood'];
    const rad = (angle * Math.PI) / 180;
    const isNowAboveLimit = Math.tan(rad) > surface.us;

    // If angle is decreased below critical, reset block
    if (p.isSliding && !isNowAboveLimit) {
      p.isSliding = false;
      p.distance = 0;
      p.v = 0;
      p.criticalAngle = 0;
    }

    // If block hit bottom and we're still above critical, just cap it
    // (don't reset on increase)
  }, [angle]);

  useEffect(() => {
    surfaceTypeRef.current = surfaceType;
    // Reset on surface change
    const p = physicsRef.current;
    p.isSliding = false;
    p.distance = 0;
    p.v = 0;
    p.criticalAngle = 0;
  }, [surfaceType]);

  const drawArrow = (ctx, x1, y1, x2, y2, color, lw = 2) => {
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 6) return;
    const ux = dx / len, uy = dy / len;
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - ux * 10 - uy * 5, y2 - uy * 10 + ux * 5);
    ctx.lineTo(x2 - ux * 10 + uy * 5, y2 - uy * 10 - ux * 5);
    ctx.closePath(); ctx.fill();
  };

  const draw = (ctx) => {
    const p = physicsRef.current;
    const surface = SURFACES[surfaceTypeRef.current] || SURFACES['Wood on Wood'];
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const ang = angleRef.current;
    const rad = (ang * Math.PI) / 180;

    ctx.clearRect(0, 0, w, h);

    const pivotX = 80;
    const pivotY = h - 70;
    const planeLen = 560;

    // Ground
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, pivotY, w, h - pivotY);
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, pivotY, w, 3);

    // Protractor arc
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 70, 0, -rad, true);
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Angle label
    const midAng = -rad / 2;
    ctx.font = 'bold 13px monospace';
    ctx.fillStyle = '#818cf8';
    ctx.fillText(`${ang.toFixed(1)}°`, pivotX + 75 * Math.cos(midAng) - 16, pivotY + 75 * Math.sin(midAng) + 4);

    // === Draw inclined plane in rotated space ===
    ctx.save();
    ctx.translate(pivotX, pivotY);
    ctx.rotate(-rad);

    // Plane surface (thick slab)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, planeLen, 14);
    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 0, planeLen, 3);
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    ctx.strokeRect(0, 0, planeLen, 14);

    // Surface type label on plane
    ctx.font = 'bold 10px monospace';
    ctx.fillStyle = '#64748b';
    ctx.fillText(surfaceTypeRef.current.toUpperCase(), 10, 10);

    // Block position along the plane
    const blockW = 70;
    const blockH = 48;
    const blockX = Math.min(p.distance + 10, planeLen - blockW - 5);
    const blockY = -blockH; // sits on top of plane surface

    // Block shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(blockX + 3, blockY + blockH + 2, blockW, 5);

    // Block body
    ctx.fillStyle = surface.color;
    ctx.fillRect(blockX, blockY, blockW, blockH);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(blockX, blockY, blockW, blockH);

    const cx = blockX + blockW / 2;
    const cy = blockY + blockH / 2;

    // Force vectors along the plane
    if (ang > 3) {
      // mg sinθ  — sliding component (down the plane = positive x in rotated space)
      const gravComp = Math.sin(rad) * 60;
      drawArrow(ctx, cx, cy, cx + gravComp, cy, '#10b981', 2.5);

      // Friction — opposing motion (up the plane)
      const frComp = surface.uk * Math.cos(rad) * 60;
      if (p.isSliding) {
        drawArrow(ctx, cx, cy, cx - frComp, cy, '#ef4444', 2.5);
      } else {
        drawArrow(ctx, cx, cy, cx - Math.min(gravComp, frComp), cy, '#ef4444', 2.5);
      }

      // Normal force (perpendicular = negative y in rotated space)
      const normComp = Math.cos(rad) * 50;
      drawArrow(ctx, cx, cy, cx, cy - normComp, '#818cf8', 2);
    }

    ctx.restore();

    // Status badge (drawn in screen space)
    const sliding = p.isSliding;
    ctx.fillStyle = sliding ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)';
    ctx.strokeStyle = sliding ? '#10b981' : '#f59e0b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(10, 10, 190, 36, 6);
    ctx.fill(); ctx.stroke();
    ctx.font = 'bold 12px monospace';
    ctx.fillStyle = sliding ? '#10b981' : '#f59e0b';
    ctx.fillText(sliding ? '▶ SLIDING (Kinetic)' : '■ STATIC (Stationary)', 20, 34);
  };

  const animate = (time) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05);
    lastTimeRef.current = time;

    const p = physicsRef.current;
    const surface = SURFACES[surfaceTypeRef.current] || SURFACES['Wood on Wood'];
    const ang = angleRef.current;
    const rad = (ang * Math.PI) / 180;

    if (!p.isSliding) {
      // Check if sliding starts
      if (Math.tan(rad) > surface.us) {
        p.isSliding = true;
        p.criticalAngle = ang;
        p.v = 0;
        p.distance = 0;
      }
    }

    if (p.isSliding) {
      const a = g * Math.sin(rad) - surface.uk * g * Math.cos(rad);
      if (a > 0) {
        p.v += a * dt;
        p.distance += p.v * dt * 55;
      }
      if (p.distance > 460) {
        // Block reached bottom — freeze
        p.distance = 460;
        p.v = 0;
      }
    }

    setSimulationState({
      isSliding: p.isSliding,
      angleReached: p.criticalAngle,
      distance: p.distance,
      v: p.v,
    });

    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) draw(ctx);

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    lastTimeRef.current = null;
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // single loop

  return (
    <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-inner">
      <canvas ref={canvasRef} width={800} height={450} className="w-full h-full" />
    </div>
  );
}
