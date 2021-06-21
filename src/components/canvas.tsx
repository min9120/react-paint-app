
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './canvas.css'

type Coordinates = {
  x:number;
  y:number;
}
function Canvas() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<Coordinates|undefined>(undefined)
  const [isDrawing, setIsDrawing] = useState(false);
  let startPoint:Coordinates|undefined = undefined;
  let endPoint:Coordinates|undefined = undefined;
  

  const getCoordinates = (event:MouseEvent):Coordinates|undefined =>{
    if(!canvasRef.current){
      return;
    }
    const canvas:HTMLCanvasElement = canvasRef.current;
    
    return {
      x:event.pageX - canvas.offsetLeft,
      y:event.pageY - canvas.offsetTop
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
    console.log('start')
    const coordinate = getCoordinates(event);
    if(coordinate){
      setIsDrawing(true);
      setMousePosition(coordinate);
      startPoint =coordinate;
    }
  },[])

  const draw = useCallback((event:MouseEvent)=>{
    console.log('drawing')
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

  const endDraw = useCallback((event:MouseEvent)=>{
    const coordinate = getCoordinates(event);
    if(coordinate){
      endPoint = coordinate;
      console.log(endPoint?.y)
      if(startPoint&&endPoint){
        console.log(startPoint?.x, endPoint?.x)
        drawLine(startPoint, endPoint)
      }
      setIsDrawing(false);
    }
  }, [])

  const exitDraw = useCallback(()=>{
    setIsDrawing(false);
  }, [])

  useEffect(()=>{
 
    if(!canvasRef.current){
      return;}
    const canvas:HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('mouseleave', exitDraw);
    return ()=>{
      canvas.removeEventListener('mousedown', startDraw);
    canvas.removeEventListener('mousemove', draw);
    canvas.removeEventListener('mouseup', endDraw);
    canvas.removeEventListener('mouseleave', exitDraw);
    }
  }, [startDraw, draw, exitDraw, endDraw])

  return (
    <div className = 'Canvas-container'>
    <div className = 'Canvas-deleteMode-btn'>
      <input type="checkbox" name ="mode"></input>
      <label htmlFor="mode">delete mode</label>
    </div>
    

    <div className = 'Canvas-zoom-btn'>
    <button>+</button>
    <button>-</button>
    <button onClick={()=>{
      canvasRef.current?.getContext("2d")?.clearRect(0,0,800,800);
    }}>delete</button>
    </div>
    <canvas  
    onLoad={()=>{ }} 
    ref={canvasRef}
    width = {800}
    height = {800}>
  </canvas>
    </div>
  );
}


export default Canvas;


    
