import { useEffect, useRef } from 'react';

export default function ComplexSimulator({ z1, z2, operation }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;
    const scale = Math.min(width, height) / 20; // 10 units in each direction

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    
    for (let i = -10; i <= 10; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(centerX + i * scale, 0);
      ctx.lineTo(centerX + i * scale, height);
      ctx.stroke();

      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, centerY + i * scale);
      ctx.lineTo(width, centerY + i * scale);
      ctx.stroke();
    }

    // Draw Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    
    // X-Axis (Real)
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();

    // Y-Axis (Imaginary)
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('Real (Re)', width - 30, centerY + 15);
    ctx.fillText('Imag (Im)', centerX + 30, 20);

    // Draw Tick Marks
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = -10; i <= 10; i++) {
      if (i === 0) continue;
      ctx.fillText(i.toString(), centerX + i * scale, centerY + 15);
      ctx.fillText(i.toString(), centerX - 15, centerY - i * scale + 5);
    }

    const drawVector = (z, color, label, isResult = false) => {
      const x = centerX + z.real * scale;
      const y = centerY - z.imag * scale;

      // Draw dashed lines to axes
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = color + '44';
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, centerY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(centerX, y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw vector
      ctx.strokeStyle = color;
      ctx.lineWidth = isResult ? 3 : 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();

      // Draw Arrow Head
      const angle = Math.atan2(centerY - y, x - centerX);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 10 * Math.cos(angle - Math.PI / 6), y + 10 * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(x - 10 * Math.cos(angle + Math.PI / 6), y + 10 * Math.sin(angle + Math.PI / 6));
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Draw point
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Draw Label
      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(label, x + 10, y - 10);
    };

    // Calculate result
    let result = null;
    if (operation === 'add') {
      result = { real: z1.real + z2.real, imag: z1.imag + z2.imag };
    } else if (operation === 'subtract') {
      result = { real: z1.real - z2.real, imag: z1.imag - z2.imag };
    } else if (operation === 'multiply') {
      result = { 
        real: z1.real * z2.real - z1.imag * z2.imag, 
        imag: z1.real * z2.imag + z1.imag * z2.real 
      };
    }

    // Draw vectors
    drawVector(z1, '#6366f1', 'z₁'); // Indigo
    
    if (operation !== 'none') {
      drawVector(z2, '#ec4899', 'z₂'); // Pink
      if (result) {
        drawVector(result, '#10b981', 'Result (z)', true); // Emerald
        
        // If addition, draw the parallelogram
        if (operation === 'add') {
          ctx.setLineDash([3, 3]);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
          ctx.beginPath();
          ctx.moveTo(centerX + z1.real * scale, centerY - z1.imag * scale);
          ctx.lineTo(centerX + result.real * scale, centerY - result.imag * scale);
          ctx.lineTo(centerX + z2.real * scale, centerY - z2.imag * scale);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    }

  }, [z1, z2, operation]);

  return (
    <div className="flex-1 w-full h-full min-h-[400px] relative">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full rounded-xl cursor-crosshair"
      />
      
      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-[#000080]/80 dark:bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10 flex flex-col gap-2 text-white">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
          <span className="text-[10px] text-white font-bold">z₁ = {z1.real} + {z1.imag}i</span>
        </div>
        {operation !== 'none' && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-500"></div>
              <span className="text-[10px] text-white font-bold">z₂ = {z2.real} + {z2.imag}i</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
              <span className="text-[10px] text-white font-bold">Result Vector</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
