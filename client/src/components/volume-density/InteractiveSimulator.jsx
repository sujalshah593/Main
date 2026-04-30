import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InteractiveSimulator({ selectedObject, activeTool, showHint }) {
  const [objectPosition, setObjectPosition] = useState({ x: 0, y: 0 });
  const [isPlaced, setIsPlaced] = useState(false);
  const [rotation, setRotation] = useState(0); // 0=L, 1=B, 2=H
  const containerRef = useRef(null);
  const targetRef = useRef(null);

  // Reset position and rotation when tool or object changes
  useEffect(() => {
    setObjectPosition({ x: 0, y: 0 });
    setIsPlaced(false);
    setRotation(0);
  }, [activeTool, selectedObject]);

  const handleDragEnd = (e, info) => {
    if (!targetRef.current || !containerRef.current) return;
    
    const targetRect = targetRef.current.getBoundingClientRect();
    const objectX = info.point.x;
    const objectY = info.point.y;

    // Extremely generous padding so any drop remotely near the tool works
    const padding = 250;
    if (
      objectX > targetRect.left - padding && 
      objectX < targetRect.right + padding && 
      objectY > targetRect.top - padding && 
      objectY < targetRect.bottom + padding
    ) {
      setIsPlaced(true);
    }
  };

  const handleDrag = (e, info) => {
    if (!targetRef.current || !containerRef.current) return;
    
    const targetRect = targetRef.current.getBoundingClientRect();
    const objectX = info.point.x;
    const objectY = info.point.y;

    const padding = 250; // Increased snap distance significantly
    if (
      objectX > targetRect.left - padding && 
      objectX < targetRect.right + padding && 
      objectY > targetRect.top - padding && 
      objectY < targetRect.bottom + padding
    ) {
      setIsPlaced(true);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 1) % 3);
  };

  // Render the selected object visually
  const renderObject = (isDraggable = true) => {
    let shapeClass = "";
    let sizeStyle = {};
    let innerContent = null;

    if (selectedObject.id === 'cube') {
      // Wood Block - Dynamic size based on rotation
      shapeClass = "bg-amber-800 border-2 border-amber-950 rounded shadow-[inset_0_-10px_20px_rgba(0,0,0,0.6)] flex items-center justify-center transition-all duration-300";
      sizeStyle = { 
        width: selectedObject.dimensions[rotation] * 20, 
        height: selectedObject.dimensions[(rotation + 1) % 3] * 20,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 12px)'
      };
      innerContent = <span className="text-[10px] font-bold text-amber-950/50 rotate-0">Wood</span>;
    } else if (selectedObject.id === 'metal_block') {
      // Metal Block - Dynamic size based on rotation
      shapeClass = "bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 border border-slate-300 shadow-[inset_0_2px_10px_rgba(255,255,255,0.8),inset_0_-10px_20px_rgba(0,0,0,0.5)] rounded-sm flex items-center justify-center transition-all duration-300";
      sizeStyle = { 
        width: selectedObject.dimensions[rotation] * 20, 
        height: selectedObject.dimensions[(rotation + 1) % 3] * 20 
      };
      innerContent = <span className="text-[10px] font-bold text-slate-800/60 uppercase tracking-widest">Metal</span>;
    } else if (selectedObject.id === 'stone') {
      // Stone - Static size, no rotation
      shapeClass = "bg-stone-500 border border-stone-700 shadow-[inset_0_-15px_15px_rgba(0,0,0,0.6),inset_0_5px_10px_rgba(255,255,255,0.3)] flex items-center justify-center relative overflow-hidden";
      sizeStyle = { 
        width: 60, height: 55, 
        borderRadius: '45% 55% 65% 35% / 40% 60% 40% 60%'
      };
      innerContent = (
        <>
          <div className="absolute top-2 left-2 w-2 h-1 bg-stone-700/40 rounded-full"></div>
          <div className="absolute bottom-3 right-4 w-3 h-2 bg-stone-700/30 rounded-full"></div>
          <div className="absolute top-5 right-2 w-1 h-1 bg-stone-300/40 rounded-full"></div>
          <span className="text-[9px] font-bold text-stone-900/50 relative z-10">Stone</span>
        </>
      );
    }

    const content = (
      <div 
        className={`${shapeClass} ${isDraggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'} hover:brightness-110`}
        style={sizeStyle}
        onClick={!isDraggable ? handleRotate : undefined}
      >
        {innerContent}
      </div>
    );

    if (!isDraggable) return content;

    return (
      <motion.div
        drag
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        animate={isPlaced ? { x: 0, y: 0 } : objectPosition}
        className="absolute z-50"
      >
        {content}
      </motion.div>
    );
  };

  return (
    <div className="w-full h-full relative min-h-[350px] flex items-center justify-center bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden" ref={containerRef}>
      
      {/* Table Surface */}
      <div className="absolute bottom-0 w-full h-[100px] bg-gradient-to-b from-slate-800 to-slate-900 border-t border-slate-700"></div>

      {/* Starting Area for Object */}
      {!isPlaced && (
         <div className="absolute left-[50px] bottom-[100px] flex flex-col items-center gap-2">
            <div className="text-[10px] text-lab-muted font-bold uppercase tracking-widest bg-black/40 px-2 py-1 rounded">Start Area</div>
         </div>
      )}

      {/* Tool Rendering */}
      <AnimatePresence mode="wait">
        
        {/* WEIGHING BALANCE */}
        {activeTool === 'scale' && (
          <motion.div 
            key="scale"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-[100px] flex flex-col items-center"
          >
            {/* Scale Pan (Drop Target) */}
            <div 
              ref={targetRef}
              className="w-[140px] h-[40px] bg-gradient-to-r from-slate-300 to-slate-400 rounded-t-full border border-slate-500 mb-1 relative flex justify-center items-end"
            >
               {/* When placed, the object sits perfectly on the pan */}
               {isPlaced && (
                 <div className="absolute bottom-full mb-0 z-10 flex flex-col items-center">
                   {renderObject(false)}
                 </div>
               )}
               {!isPlaced && <span className="absolute text-slate-500/50 text-xs font-bold w-full text-center bottom-2 left-0">Drop Here</span>}
            </div>
            {/* Scale Body */}
            <div className="w-[160px] h-[50px] bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-xl border border-slate-600 shadow-2xl flex items-center justify-center">
               <div className="w-[90px] h-[28px] bg-emerald-950 border-2 border-emerald-900 rounded flex items-center justify-end px-2 font-mono text-emerald-400 text-sm shadow-inner">
                 {isPlaced ? selectedObject.mass.toFixed(1) : "0.0"} g
               </div>
            </div>
          </motion.div>
        )}

        {/* RULER */}
        {activeTool === 'ruler' && (
          <motion.div 
            key="ruler"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-[120px] flex flex-col items-center"
          >
            {selectedObject.type === 'irregular' ? (
              <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded text-sm font-bold animate-pulse">
                Cannot use Ruler on Irregular Object!
              </div>
            ) : (
              <div className="relative flex flex-col items-center">
                {/* Object Placement Area */}
                <div 
                  ref={targetRef}
                  className="w-[300px] h-[80px] border-2 border-dashed border-sky-500/30 rounded-t-lg flex items-end justify-start relative"
                >
                  {isPlaced && (
                    <div className="absolute bottom-[0px] left-[0px] z-10 flex items-center gap-4">
                      {renderObject(false)}
                      <button 
                        onClick={handleRotate}
                        className="bg-sky-500/20 text-sky-300 border border-sky-500/50 px-2 py-1 rounded text-[10px] font-bold shadow-xl hover:bg-sky-500/40 transition-all absolute -top-8 -right-8 flex items-center gap-1"
                      >
                         Click Object to Rotate (Currently Measuring: {rotation === 0 ? 'Length' : rotation === 1 ? 'Breadth' : 'Height'})
                      </button>
                    </div>
                  )}
                  {!isPlaced && <span className="absolute text-sky-500/50 text-xs font-bold w-full text-center bottom-2 left-0">Place Object Here</span>}
                </div>
                {/* Ruler Graphics */}
                <div className="w-[300px] h-[30px] bg-yellow-100/90 border border-yellow-600/50 shadow-md flex items-start overflow-hidden backdrop-blur-sm relative">
                  {Array.from({length: 15}).map((_, i) => (
                    <div key={i} className="flex-1 border-l border-yellow-700/50 h-full flex flex-col relative">
                       <div className="h-1/2 w-full flex justify-between px-0.5">
                         <div className="w-[1px] h-1/2 bg-yellow-700/30"></div>
                         <div className="w-[1px] h-full bg-yellow-700/50"></div>
                         <div className="w-[1px] h-1/2 bg-yellow-700/30"></div>
                       </div>
                       <span className="text-[8px] font-bold text-yellow-900 absolute bottom-0 -left-1">{i}</span>
                    </div>
                  ))}
                  {/* Final 15 mark on the right edge */}
                  <div className="absolute right-0 bottom-0 h-full w-[1px] bg-yellow-700/50">
                    <span className="text-[8px] font-bold text-yellow-900 absolute bottom-0 -left-2">15</span>
                  </div>
                </div>
                {/* Live Dimensions Display */}
                {isPlaced && (
                  <div className="absolute -top-16 left-0 right-0 flex justify-center">
                    <div className="bg-sky-900/80 border border-sky-500 px-3 py-1 rounded text-xs font-mono text-sky-300 shadow-xl flex items-center gap-3">
                      <span>L: {selectedObject.dimensions[0].toFixed(1)}cm</span>
                      <span>B: {selectedObject.dimensions[1].toFixed(1)}cm</span>
                      <span>H: {selectedObject.dimensions[2].toFixed(1)}cm</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {/* MEASURING CYLINDER */}
        {activeTool === 'cylinder' && (
          <motion.div 
            key="cylinder"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-[100px] flex items-end"
          >
            {selectedObject.type === 'regular' ? (
              <div className="bg-amber-500/20 border border-amber-500 text-amber-300 px-4 py-2 rounded text-sm font-bold">
                Use a Ruler for Regular Objects!
              </div>
            ) : (
              <div className="relative flex flex-col items-center" ref={targetRef}>
                {/* Cylinder Glass Body */}
                <div className="w-[80px] h-[200px] border-x-2 border-b-2 border-white/40 rounded-b-xl relative bg-white/5 backdrop-blur-sm overflow-hidden flex flex-col justify-end mt-4">
                  
                  {/* Water inside */}
                  <motion.div 
                    initial={{ height: '40%' }}
                    animate={{ height: isPlaced ? `${40 + (selectedObject.volume / 100) * 60}%` : '40%' }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="w-full bg-blue-500/40 border-t border-blue-400/50 relative flex items-end justify-center pb-2"
                  >
                    {isPlaced && (
                      <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                      >
                         {renderObject(false)}
                      </motion.div>
                    )}
                  </motion.div>
                  
                  {/* Markings */}
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col-reverse justify-between py-2 pointer-events-none z-10">
                     {Array.from({length: 10}).map((_, i) => (
                       <div key={i} className="w-1/4 h-[1px] bg-white/50 ml-1 relative">
                         <span className="text-[8px] text-white absolute left-full ml-1 -top-1.5 font-bold shadow-black drop-shadow-md">{i * 10}</span>
                       </div>
                     ))}
                  </div>
                </div>
                {/* Cylinder Base */}
                <div className="w-[100px] h-[10px] bg-white/20 rounded-[50%] mt-[-5px]"></div>
                
                {/* Floating Drop Hint if Not Placed */}
                {!isPlaced && (
                  <div className="absolute -top-6 text-sky-300 font-bold text-xs uppercase tracking-widest bg-sky-900/50 px-2 py-1 rounded border border-sky-500/30">
                    Drop Stone Here
                  </div>
                )}
                
                {/* Live Volume Display */}
                <div className="absolute -right-[120px] top-1/2 -translate-y-1/2">
                   <div className="bg-blue-900/80 border border-blue-500 px-3 py-2 rounded text-xs font-mono text-blue-300 w-[110px]">
                     Initial: 40 mL <br/>
                     {isPlaced && <span>Final: {(40 + selectedObject.volume).toFixed(1)} mL <br/> <span className="text-emerald-400">Rise = {selectedObject.volume} mL</span></span>}
                   </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>

      {/* The Draggable Object */}
      {!isPlaced && (
        <div className="absolute left-[50px] bottom-[130px] z-50">
           {renderObject(true)}
        </div>
      )}

      {showHint && (
        <div className="absolute top-4 right-4 z-50 text-xs text-amber-400 bg-amber-900/40 px-4 py-2 rounded-lg border border-amber-500/30 max-w-[200px]">
          Hint: Drag the {selectedObject.name} onto the {activeTool === 'scale' ? 'Pan' : activeTool === 'ruler' ? 'Ruler' : 'Cylinder'}.
        </div>
      )}
    </div>
  );
}
