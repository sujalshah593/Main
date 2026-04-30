import React, { useEffect, useRef, useState } from 'react';

export default function EnergySimulation({ 
  initialHeight, 
  isFrictionEnabled, 
  isReleased, 
  onUpdateMetrics 
}) {
  const canvasRef = useRef(null);
  
  // Constants
  const g = 9.81;
  const mass = 1.0;
  const pixelsPerMeter = 40;
  const trackScale = 0.05; // y = scale * x^2
  
  // State for motion
  const [pos, setPos] = useState({ x: -Math.sqrt(initialHeight / trackScale), v: 0 });
  const requestRef = useRef();
  const lastTimeRef = useRef();

  useEffect(() => {
    if (!isReleased) {
      setPos({ x: -Math.sqrt(initialHeight / trackScale), v: 0 });
    }
  }, [initialHeight, isReleased]);

  const animate = (time) => {
    if (lastTimeRef.current !== undefined && isReleased) {
      const dt = (time - lastTimeRef.current) / 1000;
      
      setPos(prev => {
        // Current height
        const h = trackScale * prev.x * prev.x;
        
        // Acceleration along the track
        // Angle theta: tan(theta) = dy/dx = 2 * scale * x
        const slope = 2 * trackScale * prev.x;
        const theta = Math.atan(slope);
        
        // a = -g * sin(theta) - friction
        let acc = -g * Math.sin(theta);
        
        if (isFrictionEnabled) {
          const mu = 0.05;
          const normalAcc = g * Math.cos(theta);
          const frictionAcc = mu * normalAcc * Math.sign(prev.v);
          acc -= frictionAcc;
        }

        const newV = prev.v + acc * dt;
        const newX = prev.x + newV * Math.cos(theta) * dt;
        
        // Metrics
        const currentH = trackScale * newX * newX;
        const pe = mass * g * currentH;
        const ke = 0.5 * mass * newV * newV;
        onUpdateMetrics({ x: newX, h: currentH, v: Math.abs(newV), pe, ke });

        return { x: newX, v: newV };
      });
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isReleased, isFrictionEnabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = 350;

      // Draw Track
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let x = -centerX/pixelsPerMeter; x <= centerX/pixelsPerMeter; x += 0.1) {
        const y = trackScale * x * x;
        const canvasX = centerX + x * pixelsPerMeter;
        const canvasY = centerY - y * pixelsPerMeter;
        if (x === -centerX/pixelsPerMeter) ctx.moveTo(canvasX, canvasY);
        else ctx.lineTo(canvasX, canvasY);
      }
      ctx.stroke();

      // Draw Height Scale
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX - 200, centerY);
      ctx.lineTo(centerX - 200, centerY - 250);
      ctx.stroke();
      for(let h=0; h<=6; h++) {
        const y = centerY - h * pixelsPerMeter;
        ctx.moveTo(centerX - 200, y);
        ctx.lineTo(centerX - 210, y);
        ctx.stroke();
        ctx.fillStyle = '#64748b';
        ctx.font = '10px Arial';
        ctx.fillText(`${h}m`, centerX - 230, y + 4);
      }

      // Draw Ball
      const ballX = centerX + pos.x * pixelsPerMeter;
      const ballY = centerY - (trackScale * pos.x * pos.x) * pixelsPerMeter - 10;
      
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Indicator line to scale
      if (!isReleased) {
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(ballX, ballY);
        ctx.lineTo(centerX - 200, ballY);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    };

    draw();
  }, [pos]);

  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
      <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider">Motion Simulator</h3>
      <div className="bg-[#0f172a] rounded-lg border border-slate-600 shadow-inner overflow-hidden">
        <canvas 
          ref={canvasRef} 
          width={500} 
          height={400} 
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
