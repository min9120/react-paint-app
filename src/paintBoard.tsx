import React, { useEffect, useRef } from 'react';

function Canvas() {

  const ref = useRef<HTMLCanvasElement>(null);
 

  useEffect(()=>{
    const ctx =ref.current?.getContext('2d'); ctx!.fillStyle ="green";
    ctx!.fillRect(10, 10, 150, 100)
  }, [ref])

  
 
  return (
  <canvas onLoad={()=>{ }} ref={ref} width="500px"height = '500px'></canvas>
  );
}

export default Canvas;
