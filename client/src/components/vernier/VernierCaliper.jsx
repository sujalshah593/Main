import { useRef, useEffect, useState } from 'react';
import { motion, useDragControls, AnimatePresence } from 'framer-motion';

// Scale rendering helpers
const generateMainScale = () => {
  const marks = [];
  // 0 to 150 mm
  for (let i = 0; i <= 150; i++) {
    const isCm = i % 10 === 0;
    const isHalfCm = i % 5 === 0 && !isCm;
    marks.push(
      <div key={`m-${i}`} className="absolute top-0 flex flex-col items-center" style={{ left: `${i * 4}px` }}>
        <div className={`bg-slate-400 w-[1px] ${isCm ? 'h-6' : isHalfCm ? 'h-4' : 'h-2'}`}></div>
        {isCm && <span className="text-[10px] font-mono mt-1 text-slate-300">{i / 10}</span>}
      </div>
    );
  }
  return marks;
};

const generateVernierScale = () => {
  const marks = [];
  // 10 divisions on vernier = 9 divisions on main scale (9mm)
  // Since 1mm on main scale = 4px, 9mm = 36px. 
  // Each vernier division is 3.6px apart.
  for (let i = 0; i <= 10; i++) {
    const isMajor = i === 0 || i === 5 || i === 10;
    marks.push(
      <div key={`v-${i}`} className="absolute bottom-0 flex flex-col items-center" style={{ left: `${i * 3.6}px` }}>
        {isMajor && <span className="text-[10px] font-mono mb-1 text-sky-300">{i}</span>}
        <div className={`bg-sky-400 w-[1px] ${isMajor ? 'h-6' : 'h-3'}`}></div>
      </div>
    );
  }
  return marks;
};

export default function VernierCaliper({ jawPosition, setJawPosition, selectedObject, zeroError, showHint }) {
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);
  
  // Object dimensions constraints
  const [minJaw, setMinJaw] = useState(0);
  const PIXELS_PER_MM = 4;

  useEffect(() => {
    // Determine the minimum jaw position based on the selected object.
    // If it's an outer measurement, the jaw cannot close further than the object's size + zeroError
    if (selectedObject && selectedObject.type === 'outer') {
      const newMinJaw = selectedObject.value + (zeroError || 0);
      setMinJaw(newMinJaw);
      if (jawPosition < newMinJaw) {
         setJawPosition(newMinJaw);
      }
    } else {
      const newMinJaw = zeroError || 0;
      setMinJaw(newMinJaw);
      if (jawPosition < newMinJaw) {
         setJawPosition(newMinJaw);
      }
    }
  }, [selectedObject, zeroError]);

  const handleDrag = (event, info) => {
    // Current x position
    const currentX = info.point.x;
    // Calculate new position based on constraint refs and dragging
    // We will use framer-motion's onDrag to update the exact mm value.
    // However, it's easier to bind the 'x' motion value or just read it from the drag.
  };

  // The actual drag logic uses Framer motion's state or controlled x value.
  // We'll control x explicitly to allow precise measurements.
  const handleDragEnd = (event, info) => {
    // Calculate final dropped position
    // No strict need to snap unless we want it, verniers are smooth.
  };

  const isTight = jawPosition <= minJaw + 0.01;

  const dragStartPos = useRef(0);

  return (
    <div className="relative w-full overflow-x-auto pb-10 select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" ref={constraintsRef}>
      <div className="min-w-[800px] w-[800px] h-[300px] relative mt-10 ml-10 overflow-hidden">
        
        {/* Render Selected Object */}
        <div className="absolute top-[80px] left-[20px] h-[100px] z-10 flex items-center justify-center opacity-80" 
             style={{ width: `${(selectedObject?.value || 0) * PIXELS_PER_MM}px` }}>
          {selectedObject?.id === 'coin' && <div className="rounded-full bg-yellow-600/60 border-2 border-yellow-500 w-full aspect-square shadow-inner shadow-yellow-900 flex items-center justify-center text-[10px] font-bold mx-auto text-yellow-900">Coin</div>}
          {selectedObject?.id === 'rod' && <div className="rounded-sm bg-stone-500/80 border-y-2 border-stone-400 w-full h-[30px] shadow-sm"></div>}
          {selectedObject?.id === 'bolt' && <div className="rounded-sm bg-zinc-400 border-2 border-zinc-300 w-full h-[20px] shadow-md flex items-center justify-center relative"><div className="w-[10px] h-[30px] bg-zinc-500 absolute left-0 rounded-l-md"></div></div>}
          {selectedObject?.id === 'ring_outer' && <div className="rounded-full border-[8px] border-orange-300 w-full aspect-square mx-auto"></div>}
          {selectedObject?.id === 'cube' && <div className="bg-blue-800/80 border-2 border-blue-500 w-full aspect-square shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)] mx-auto"></div>}
        </div>

        {/* --- Main Body (Fixed) --- */}
        <div className="absolute top-[60px] left-0 w-[700px] h-[140px]">
          {/* Main Fixed Jaw */}
          <div className="absolute left-0 top-0 w-[20px] h-[140px] bg-gradient-to-r from-slate-700 to-slate-600 border border-slate-500 rounded-l-md shadow-2xl z-20">
             {/* Upper Fixed Jaw (Inner) */}
             <div className="absolute -top-[40px] left-[10px] w-[10px] h-[40px] bg-slate-600 border border-slate-500 rounded-t-full clip-inner-jaw"></div>
             {/* Lower Fixed Jaw (Outer) */}
             <div className="absolute bottom-[-60px] left-0 w-[20px] h-[60px] bg-gradient-to-r from-slate-700 to-slate-600 border border-slate-500 rounded-b-full shadow-lg"></div>
          </div>
          
          {/* Main Beam / Scale */}
          <div className="absolute left-[20px] top-[40px] w-[680px] h-[60px] bg-slate-800 border-y border-slate-600 shadow-inner flex relative overflow-hidden">
             {/* Graduations container, start slightly shifted if needed */}
             <div className="absolute top-0 left-[10px] w-full h-full">
               {generateMainScale()}
             </div>
             
             {/* Depth Probe Groove */}
             <div className="absolute top-[28px] w-full h-[4px] bg-slate-900 border-y border-slate-950"></div>
          </div>
        </div>

        {/* --- Vernier (Movable) --- */}
        <motion.div 
          className="absolute top-[20px] h-[220px] z-30 cursor-grab active:cursor-grabbing"
          style={{ x: jawPosition * PIXELS_PER_MM }}
          onPanStart={() => {
             dragStartPos.current = jawPosition;
          }}
          onPan={(e, info) => {
             let newPos = dragStartPos.current + (info.offset.x / PIXELS_PER_MM);
             if (newPos < minJaw) newPos = minJaw;
             if (newPos > 150) newPos = 150;
             setJawPosition(newPos);
          }}
        >
          {/* Main Slider Body */}
          <div className="absolute top-[35px] left-[20px] w-[100px] h-[70px] bg-gradient-to-b from-slate-600 to-slate-700 border-2 border-slate-500 shadow-xl rounded-sm">
             {/* Vernier Window Cutout */}
             <div className="absolute top-[5px] left-[10px] w-[50px] h-[60px] bg-slate-800/80 shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)] border border-slate-900 relative">
                {/* Vernier Graduations (0 to 10) */}
                <div className="absolute bottom-0 w-full h-full flex pt-1">
                   {generateVernierScale()}
                </div>
             </div>

             {/* Thumb wheel for dragging */}
             <div className="absolute -bottom-[15px] left-[70px] flex flex-col items-center">
               <div className={`w-[20px] h-[20px] rounded-full bg-slate-500 border ${isTight ? 'border-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'border-slate-400'} shadow-md flex items-center justify-center transition-all duration-150`}>
                  <div className={`w-[12px] h-[12px] rounded-full ${isTight ? 'bg-emerald-400' : 'bg-slate-700'} transition-colors`}></div>
               </div>
               
               <AnimatePresence>
                {isTight && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-[25px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/50 whitespace-nowrap pointer-events-none z-50"
                  >
                    Tight!
                  </motion.div>
                )}
               </AnimatePresence>
             </div>
          </div>

          {/* Movable Lower Jaw (Outer) */}
          <div className="absolute top-[105px] w-[20px] h-[60px] bg-gradient-to-r from-slate-600 to-slate-700 border border-slate-500 rounded-b-full shadow-lg"
               style={{ left: `${20 - (zeroError || 0) * PIXELS_PER_MM}px` }}></div>

          {/* Movable Upper Jaw (Inner) */}
          <div className="absolute top-[0px] w-[10px] h-[35px] bg-slate-600 border border-slate-500 rounded-t-full"
               style={{ left: `${20 - (zeroError || 0) * PIXELS_PER_MM}px` }}></div>
          
          {/* Depth Probe (Extends to the right based on position) */}
          {/* This part visually extends past the main beam, technically attached to the slider */}
          <div className="absolute top-[68px] left-[700px] h-[4px] bg-slate-500 border border-slate-400 z-10" 
               style={{ width: `${(jawPosition - (zeroError || 0)) * PIXELS_PER_MM}px` }}></div>
        </motion.div>

        {showHint && (
          <div className="absolute bottom-[20px] left-[50px] z-50 text-xs text-amber-400 bg-amber-900/40 px-4 py-2 rounded-lg border border-amber-500/30">
            Hint: Drag the thumb wheel to move the vernier scale. Stop when the jaws touch the object tightly.
          </div>
        )}

      </div>
    </div>
  );
}
