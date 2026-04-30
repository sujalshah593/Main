import { useRef, useEffect, useState } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';

// Scale rendering helpers
const generatePitchScale = () => {
  const marks = [];
  // 0 to 25 mm
  for (let i = 0; i <= 25; i++) {
    const isFive = i % 5 === 0;
    marks.push(
      <div key={`p-${i}`} className="absolute top-1/2 flex flex-col items-center" style={{ left: `${i * 10}px`, transform: 'translateY(-100%)' }}>
        <div className={`bg-slate-400 w-[1px] ${isFive ? 'h-4' : 'h-2'}`}></div>
        {isFive && <span className="text-[9px] font-mono mb-1 text-slate-300 absolute bottom-full">{i}</span>}
      </div>
    );
    // Half mm markings on the bottom
    if (i < 25) {
      marks.push(
        <div key={`p-half-${i}`} className="absolute top-1/2 flex flex-col items-center" style={{ left: `${i * 10 + 5}px` }}>
          <div className="bg-slate-500 w-[1px] h-2"></div>
        </div>
      );
    }
  }
  return marks;
};

export default function ScrewGauge({ thimblePosition, setThimblePosition, selectedObject, zeroError, showHint }) {
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);
  
  const [minJaw, setMinJaw] = useState(0);
  const PIXELS_PER_MM = 10; // 1mm = 10px on screen

  useEffect(() => {
    let newMinJaw = zeroError || 0;
    if (selectedObject) {
      newMinJaw = selectedObject.value + (zeroError || 0);
    }
    setMinJaw(newMinJaw);
    if (thimblePosition < newMinJaw) {
       setThimblePosition(newMinJaw);
    }
  }, [selectedObject, zeroError]);

  // Calculate rotation of circular scale
  // 1 full rotation = 1mm = 360deg
  // 1 division = 3.6deg
  const rotation = (thimblePosition % 1) * 360;
  
  const isTight = thimblePosition <= minJaw + 0.01;

  const dragStartPos = useRef(0);

  return (
    <div className="relative w-full overflow-x-auto pb-10 select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" ref={constraintsRef}>
      <div className="min-w-[800px] w-[800px] h-[300px] relative mt-10 ml-10 overflow-hidden flex items-center">
        
        {/* Render Selected Object between Stud and Spindle */}
        <div className="absolute top-[80px] left-[150px] h-[40px] z-10 flex items-center justify-center opacity-90" 
             style={{ width: `${(selectedObject?.value || 0) * PIXELS_PER_MM}px` }}>
          {selectedObject?.id === 'copper_wire' && <div className="rounded-full bg-orange-700 border border-orange-500 w-full h-[10px] shadow-sm"></div>}
          {selectedObject?.id === 'steel_wire' && <div className="rounded-full bg-slate-400 border border-slate-300 w-full h-[15px] shadow-sm"></div>}
          {selectedObject?.id === 'glass_plate' && <div className="rounded-sm bg-cyan-500/40 border border-cyan-300 w-full h-[40px] shadow-sm backdrop-blur-sm"></div>}
          {selectedObject?.id === 'cardboard' && <div className="rounded-sm bg-yellow-800/80 border border-yellow-700 w-full h-[20px] shadow-sm"></div>}
          {selectedObject?.id === 'lead_shot' && <div className="rounded-full bg-slate-600 border border-slate-500 w-full aspect-square shadow-[inset_0_-5px_10px_rgba(0,0,0,0.5)] mx-auto"></div>}
        </div>

        {/* --- U-Frame & Fixed Parts --- */}
        <div className="absolute top-[80px] left-[20px] w-[500px] h-[140px] pointer-events-none z-20">
          {/* U Frame Bottom Curve */}
          <div className="absolute top-[40px] left-[0px] w-[220px] h-[120px] border-[20px] border-slate-700 rounded-b-full rounded-t-none border-t-0 shadow-[inset_0_-10px_10px_rgba(0,0,0,0.4)]"></div>
          
          {/* U Frame Left Vertical */}
          <div className="absolute top-[0px] left-[0px] w-[20px] h-[40px] bg-slate-700 shadow-md"></div>
          
          {/* U Frame Right Vertical */}
          <div className="absolute top-[0px] left-[200px] w-[20px] h-[60px] bg-slate-700 shadow-md z-40"></div>

          {/* Fixed Stud */}
          <div className="absolute top-[10px] left-[20px] w-[110px] h-[20px] bg-gradient-to-r from-slate-500 to-slate-400 border border-slate-500 shadow-sm rounded-r-sm"></div>

          {/* Barrel (Pitch Scale) */}
          <div className="absolute top-[10px] left-[220px] w-[250px] h-[20px] bg-gradient-to-b from-slate-600 to-slate-700 border-y border-slate-500 shadow-inner z-10">
             {/* Central Reference Line */}
             <div className="absolute top-1/2 left-[0px] w-[250px] h-[1px] bg-slate-400 transform -translate-y-1/2"></div>
             
             {/* Graduations container on barrel */}
             <div className="absolute top-0 left-[0px] w-full h-full">
               {generatePitchScale()}
             </div>
          </div>
        </div>

        {/* --- Movable Parts (Spindle + Thimble + Ratchet) --- */}
        <motion.div 
          className="absolute top-[80px] h-[40px] z-30 flex items-center cursor-grab active:cursor-grabbing"
          style={{ x: thimblePosition * PIXELS_PER_MM }}
          onPanStart={() => {
             dragStartPos.current = thimblePosition;
          }}
          onPan={(e, info) => {
             let newPos = dragStartPos.current + (info.offset.x / PIXELS_PER_MM);
             if (newPos < minJaw) newPos = minJaw;
             if (newPos > 25) newPos = 25;
             setThimblePosition(newPos);
          }}
        >
          {/* Spindle (Moves with thimble) */}
          <div className="w-[340px] h-[16px] bg-gradient-to-b from-slate-300 via-slate-100 to-slate-400 border border-slate-400 absolute rounded-l-sm shadow-sm"
               style={{ left: `${150 - (zeroError || 0) * PIXELS_PER_MM}px` }}></div>

          {/* Thimble (Circular Scale) */}
          <div className="absolute left-[240px] w-[250px] h-[34px] bg-gradient-to-b from-slate-500 to-slate-600 border border-slate-400 shadow-xl rounded-l-sm flex items-center overflow-hidden">
             
             {/* Circular Scale Window / Beveled edge */}
             <div className="w-[40px] h-full bg-slate-600 border-r border-slate-700 relative overflow-hidden flex flex-col justify-center">
                <motion.div 
                   className="absolute left-0 w-full h-[300px] flex flex-col justify-center gap-[4px] items-start pl-1"
                   style={{ y: (rotation / 360) * 80 }} 
                >
                   {Array.from({ length: 110 }).map((_, i) => {
                      const val = (100 - (i % 100)) % 100;
                      const isTen = val % 10 === 0;
                      return (
                        <div key={i} className="flex items-center gap-1 w-full">
                           <div className={`bg-sky-300 h-[1px] ${isTen ? 'w-3' : 'w-1.5'}`}></div>
                           {isTen && <span className="text-[7px] text-sky-200 font-mono leading-none">{val}</span>}
                        </div>
                      )
                   })}
                </motion.div>
             </div>

             {/* Thimble Grip */}
             <div className="flex-1 h-full bg-slate-700 opacity-80" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)' }}></div>
          </div>

          {/* Ratchet */}
          <div className={`absolute left-[490px] w-[20px] h-[22px] bg-gradient-to-b from-slate-600 to-slate-800 border ${isTight ? 'border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'border-slate-500'} rounded-r-md shadow-md flex items-center justify-center transition-all duration-150`}>
            <div className={`w-[4px] h-[10px] ${isTight ? 'bg-emerald-400' : 'bg-slate-400'} rounded-full transition-colors`}></div>
            
            <AnimatePresence>
              {isTight && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute bottom-[30px] left-1/2 -translate-x-1/2 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/50 pointer-events-none"
                >
                  Click!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>

        {showHint && (
          <div className="absolute bottom-[20px] left-[50px] z-50 text-xs text-amber-400 bg-amber-900/40 px-4 py-2 rounded-lg border border-amber-500/30">
            Hint: Drag the thimble to rotate it and move the spindle. Stop when it holds the object tightly.
          </div>
        )}

      </div>
    </div>
  );
}
