import React, { useEffect, useRef } from 'react';

export default function SpringSimulation({ mass, springConstant, isNoiseEnabled }) {
  const canvasRef = useRef(null);
  
  // Constants
  const g = 9.81;
  const pixelsPerMeter = 200;
  const naturalLength = 0.5; // meters
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const force = mass * g;
      let extension = force / springConstant;
      
      // Add slight noise if enabled
      if (isNoiseEnabled) {
        extension += (Math.random() - 0.5) * 0.005;
      }
      
      const currentLength = naturalLength + extension;
      const currentLengthPixels = currentLength * pixelsPerMeter;
      const naturalLengthPixels = naturalLength * pixelsPerMeter;
      
      const startX = canvas.width / 2 - 50;
      const startY = 50;
      
      // Draw Support
      ctx.fillStyle = '#475569';
      ctx.fillRect(startX - 20, startY - 10, 140, 10);
      
      // Draw Ruler
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX + 100, startY);
      ctx.lineTo(startX + 100, startY + 400);
      ctx.stroke();
      
      for (let i = 0; i <= 40; i++) {
        const y = startY + i * 10;
        ctx.beginPath();
        ctx.moveTo(startX + 100, y);
        ctx.lineTo(startX + (i % 5 === 0 ? 90 : 95), y);
        ctx.stroke();
        if (i % 10 === 0) {
          ctx.fillStyle = '#64748b';
          ctx.font = '10px Arial';
          ctx.fillText(`${(i/100).toFixed(2)}m`, startX + 110, y + 4);
        }
      }

      // Draw Spring
      const coils = 15;
      const springWidth = 20;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(startX + 25, startY);
      
      const coilHeight = currentLengthPixels / coils;
      for (let i = 0; i < coils; i++) {
        const y = startY + i * coilHeight;
        ctx.bezierCurveTo(
          startX + 25 + springWidth, y + coilHeight * 0.25,
          startX + 25 - springWidth, y + coilHeight * 0.75,
          startX + 25, y + coilHeight
        );
      }
      ctx.stroke();

      // Draw Mass Hook
      const hookY = startY + currentLengthPixels;
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(startX + 25, hookY + 5, 5, -Math.PI/2, Math.PI);
      ctx.stroke();

      // Draw Mass
      if (mass > 0) {
        const massHeight = Math.min(60, 20 + mass * 10);
        const massWidth = 30;
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(startX + 25 - massWidth/2, hookY + 10, massWidth, massHeight);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${mass.toFixed(2)}kg`, startX + 25, hookY + 10 + massHeight/2 + 4);
      }

      // Pointer for ruler
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startX + 25, hookY);
      ctx.lineTo(startX + 90, hookY);
      ctx.stroke();
      
      // Display Info
      ctx.fillStyle = 'white';
      ctx.font = '12px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`F = mg = ${force.toFixed(2)} N`, 20, 20);
      ctx.fillText(`Length = ${currentLength.toFixed(3)} m`, 20, 40);
      ctx.fillText(`Extension (x) = ${extension.toFixed(3)} m`, 20, 60);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mass, springConstant, isNoiseEnabled]);

  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <h3 className="text-sm font-bold text-slate-300 mb-4 uppercase tracking-wider w-full text-left">Spring Setup</h3>
      <div className="bg-[#0f172a] rounded-lg border border-slate-600 shadow-inner p-2">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={450} 
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
