import React, { useEffect, useRef } from 'react';
import './canvas.css'

function Canvas() {

  const ref = useRef<HTMLCanvasElement>(null);
 

  useEffect(()=>{
    const ctx =ref.current?.getContext('2d'); ctx!.fillStyle ="green";
    ctx!.fillRect(10, 10, 150, 100)
  }, [ref])

  
 
  return (
    <div className = 'Canvas-container'>
    <div className = 'Cavas-deleteMode-btn'>
      <input type="checkbox" name ="mode"></input>
      <label htmlFor="mode">delete mode</label>
    </div>
    
    <canvas  onLoad={()=>{ }} ref={ref}>
  </canvas>

    <div className = 'Canvas-zoom-btn'>
    <button>+</button>
    <button>-</button>

    </div>
    </div>
  );
}

export default Canvas;
