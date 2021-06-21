
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './canvas.css'

interface CanvasProps{
  width:number;
  height:number;
}

type Coordinates = {
  x:number;
  y:number;
}
function Canvas({width, height}:CanvasProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<Coordinates|undefined>(undefined)
  const [isDrawing, setIsDrawing] = useState(false);

  const getCoordinates = (event:MouseEvent):Coordinates|undefined =>{
    if(!canvasRef.current){
      return;
    }
    const canvas:HTMLCanvasElement = canvasRef.current;
    return {
      x:event.pageX-canvas.offsetLeft,
      y:event.pageY-canvas.offsetTop
    }
  }

  const drawLine = (originalMousePosition:Coordinates, newMousePosition:Coordinates)=>{
    if(!canvasRef.current){
      return;
    }
    const canvas:HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if(context){
      context.strokeStyle = 'black'
      context.lineJoin = "round";
      context.lineWidth = 3;

      context.beginPath();
      context.moveTo(originalMousePosition.x, originalMousePosition.y);
      context.lineTo(newMousePosition.x, newMousePosition.y);
      context.closePath();
      context.stroke();

    }
  }
  const startDraw = useCallback((event:MouseEvent)=>{
    const coordinate = getCoordinates(event);
    if(coordinate){
      setIsDrawing(true);
      setMousePosition(coordinate);
    }
  },[])

  const draw = useCallback((event:MouseEvent)=>{
    event.preventDefault();
    event.stopPropagation();
    if(isDrawing){
      const newMousePosition = getCoordinates(event);
      if(mousePosition&& newMousePosition){
        drawLine(mousePosition, newMousePosition);
        setMousePosition(newMousePosition);
      }
    }
  }, [isDrawing, mousePosition])
  const exitDraw = useCallback(()=>{
    setIsDrawing(false);
  }, [])

  useEffect(()=>{
 
    if(!canvasRef.current){
      return;}
    const canvas:HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', exitDraw);
    canvas.addEventListener('mouseleave', exitDraw);
    return ()=>{
      canvas.removeEventListener('mousedown', startDraw);
    canvas.removeEventListener('mousemove', draw);
    canvas.removeEventListener('mouseup', exitDraw);
    canvas.removeEventListener('mouseleave', exitDraw);
    }
  }, [startDraw, draw, exitDraw])

  return (
    <div className = 'Canvas-container'>
    <div className = 'Cavas-deleteMode-btn'>
      <input type="checkbox" name ="mode"></input>
      <label htmlFor="mode">delete mode</label>
    </div>
    
    <canvas  
    onLoad={()=>{ }} 
    ref={canvasRef}
    width = {width}
    height = {height}>
  </canvas>

    <div className = 'Canvas-zoom-btn'>
    <button>+</button>
    <button>-</button>

    </div>
    </div>
  );
}


export default Canvas;


    
