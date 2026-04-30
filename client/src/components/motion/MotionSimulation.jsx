import React, { useRef, useEffect, useState } from 'react';

export default function MotionSimulation({ 
  initialVelocity, 
  acceleration, 
  isPlaying, 
  setIsPlaying,
  onDataPoint,
  isNoiseEnabled
}) {
  const canvasRef = useRef(null);
  const requestRef = useRef();
  
  // Real-time tracking
  const timeRef = useRef(0);
  const positionRef = useRef(0);
  const velocityRef = useRef(initialVelocity);
  const lastLogTimeRef = useRef(0);
  
  // Visual scaling
  const pixelPerMeter = 5; 
  const trackLengthPixels = 800; // Total canvas width
  
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw track
    ctx.fillStyle = '#475569';
    ctx.fillRect(0, canvas.height - 30, canvas.width, 10);
    
    // Draw markings (every 10 meters)
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    for (let m = 0; m <= canvas.width / pixelPerMeter; m += 10) {
      const x = m * pixelPerMeter;
      ctx.fillRect(x, canvas.height - 35, 2, 15);
      if (m % 20 === 0) {
        ctx.fillText(`${m}m`, x - 10, canvas.height - 40);
      }
    }

    // Draw car
    const carX = positionRef.current * pixelPerMeter;
    
    // Car body
    ctx.fillStyle = '#38bdf8'; // sky-400
    ctx.fillRect(carX, canvas.height - 60, 40, 20);
    
    // Car cabin
    ctx.fillStyle = '#0284c7'; // sky-600
    ctx.fillRect(carX + 10, canvas.height - 75, 20, 15);
    
    // Wheels
    ctx.fillStyle = '#1e293b'; // slate-800
    ctx.beginPath();
    ctx.arc(carX + 10, canvas.height - 40, 6, 0, 2 * Math.PI);
    ctx.arc(carX + 30, canvas.height - 40, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Data overlay
    ctx.fillStyle = 'white';
    ctx.font = '12px monospace';
    ctx.fillText(`t: ${timeRef.current.toFixed(1)}s | v: ${velocityRef.current.toFixed(1)}m/s | s: ${positionRef.current.toFixed(1)}m`, 10, 20);
  };

  const animate = (time) => {
    // 60fps = ~0.016s per frame. Real time scale.
    const dt = 0.016; 
    timeRef.current += dt;
    
    // Update physics: v = u + at, s = ut + 0.5at^2
    velocityRef.current = initialVelocity + (acceleration * timeRef.current);
    positionRef.current = (initialVelocity * timeRef.current) + (0.5 * acceleration * timeRef.current * timeRef.current);
    
    draw();

    // Log data point every 1.0 second (approx)
    if (timeRef.current - lastLogTimeRef.current >= 1.0) {
      lastLogTimeRef.current = timeRef.current;
      
      let logV = velocityRef.current;
      let logS = positionRef.current;
      
      // Simulate measurement noise
      if (isNoiseEnabled) {
        logV += (Math.random() * 2 - 1) * 0.5; // +/- 0.5 m/s noise
        logS += (Math.random() * 2 - 1) * 1.0; // +/- 1.0 m noise
      }
      
      onDataPoint({
        time: Math.round(timeRef.current),
        velocity: logV,
        displacement: logS
      });
    }

    // Stop if we hit the end of the track
    if (positionRef.current * pixelPerMeter >= canvasRef.current.width - 40) {
      setIsPlaying(false);
      return;
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
  }, [isPlaying, initialVelocity, acceleration, isNoiseEnabled]);

  // Handle manual resets or parameter changes when NOT playing
  useEffect(() => {
    if (!isPlaying && timeRef.current === 0) {
      velocityRef.current = initialVelocity;
      positionRef.current = 0;
      draw();
    }
  }, [initialVelocity, isPlaying]);

  // Hard Reset function
  useEffect(() => {
    // Expose reset via a trick: if isPlaying transitions to false and we manually set time to 0 outside
    // Actually, we'll let the parent manage play/stop, but we need a way to reset.
    // We can reset if initialVelocity or acceleration changes and we are NOT playing.
    if (!isPlaying) {
      timeRef.current = 0;
      lastLogTimeRef.current = 0;
      velocityRef.current = initialVelocity;
      positionRef.current = 0;
      draw();
    }
  }, [initialVelocity, acceleration]);

  return (
    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center">
      <h3 className="text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider w-full text-left">Linear Motion Track</h3>
      <div className="w-full overflow-x-auto custom-scrollbar">
        <div className="relative bg-[#0f172a] rounded-lg border border-slate-600 shadow-inner min-w-[800px]">
          <canvas 
            ref={canvasRef} 
            width={trackLengthPixels} 
            height={150} 
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
