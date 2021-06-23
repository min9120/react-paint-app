
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {useDispatch } from 'react-redux';
import './canvas.css'
import { painterActions } from '../modules/painter';
import { Coordinates } from '../interfaces/canvasInterface';

function Canvas() {
  const dispatch = useDispatch();
  const onCreatePolygon = ()=>{
    dispatch(painterActions.create(pointArray))
  }
  const onDeletePolygon = ()=>{
    dispatch(painterActions.delete(polygonId));
  }
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<Coordinates|undefined>(undefined)
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [pointArray, setPointArray]= useState<Array<Coordinates> >([]);
  const [ path2Ds, setPath2Ds] =useState<Array<Path2D>>([]);  
  const [recentPath2D, setRecentPath2D] = useState<Path2D>(new Path2D());
  const [canvasScale, setCanvasScale] = useState<number>(1.0)
  let startPoint:Coordinates|undefined = undefined;
  let endPoint:Coordinates|undefined = undefined;
  let polygonId:number;
  let scaleMultiplier = 0.5;
  

  const zoomCanvas  =(canvasScale:number)=>{
    if(!canvasRef.current){
      return;
    }
    const canvas:HTMLCanvasElement = canvasRef.current;
    let translatePos = {
      x:canvas.width/2,
      y:canvas.height/2
    }
    const context = canvas.getContext('2d');
    if(context){
     
      context.save();
      context.translate(translatePos.x, translatePos.y)
      context.scale(canvasScale, canvasScale);
    
    }
  }
  const zoomIn = ()=>{
    console.log('in')
     let newScale = canvasScale;
     setCanvasScale(newScale*scaleMultiplier);
     zoomCanvas(canvasScale)
  }
  const zoomOut = ()=>{
    let newScale = canvasScale;
     setCanvasScale(newScale/scaleMultiplier);
     zoomCanvas(canvasScale)
  }
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
  const deletePoint = (event:MouseEvent)=>{
    if(!canvasRef.current){
      return;
    }
    const canvas:HTMLCanvasElement = canvasRef.current;
    const context = canvas.getContext('2d');
    if(context){
      const coordinate = getCoordinates(event);
      if(coordinate){
        console.log(coordinate)
        console.log(path2Ds)


        for(let path of path2Ds){
          if (context.isPointInPath(path,coordinate.x,coordinate.y)) {
            console.log("맞다!")
           }
           else {
            console.log("아니다!!")
           }}
        }
    }
  }
 const drawLine = 
  (
    originalMousePosition:Coordinates, 
    newMousePosition:Coordinates, 
    isLastLine: boolean = false, 
  )=>{
  if(!canvasRef.current){
    return;
  }
  const canvas:HTMLCanvasElement = canvasRef.current;
  const context = canvas.getContext('2d');
  if(context){
    context.strokeStyle = 'black'
    context.lineJoin = "round";
    context.lineWidth = 2;

    recentPath2D.moveTo(originalMousePosition.x, originalMousePosition.y);
    recentPath2D.lineTo(newMousePosition.x, newMousePosition.y);
    context.stroke(recentPath2D);
    

    if(isLastLine){
      recentPath2D.closePath();
    }
  }
}
  
  const startDraw = useCallback((event:MouseEvent)=>{
    if(isDelete){
      deletePoint(event);
      return;
    }
    
    const coordinate = getCoordinates(event);
    if(coordinate){
      setIsDrawing(true);
      setMousePosition(coordinate);
      startPoint =coordinate;
    }
  },[isDelete])

  const draw = useCallback((event:MouseEvent)=>{
   
    event.preventDefault();
    event.stopPropagation();
    if(isDrawing){
      const newMousePosition = getCoordinates(event);
      if(mousePosition&& newMousePosition){
        setPointArray([...pointArray, mousePosition]);
        drawLine(mousePosition, newMousePosition);
        setMousePosition(newMousePosition);
      }
    }
  }, [isDrawing, mousePosition])

  const endDraw = useCallback((event:MouseEvent)=>{
    if(isDelete){
      return;
    }
    const coordinate = getCoordinates(event);
    if(coordinate){
      endPoint = coordinate;
      if(startPoint&&endPoint){
        drawLine(startPoint, endPoint, true);
        setPath2Ds([...path2Ds, recentPath2D]);
        onCreatePolygon()
        setPointArray([])

        setRecentPath2D(new Path2D());
      }
      setIsDrawing(false);
    }
  }, [isDelete])

  const exitDraw = useCallback(()=>{
    setIsDrawing(false);
  }, [])

  const handleDeleteMode = ()=>{
    setDelete(!isDelete)
  }

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
      <input type="checkbox" name ="mode" onChange ={handleDeleteMode} defaultChecked ={false}></input>
      <label htmlFor="mode">delete mode</label>
    </div>
    

    <div className = 'Canvas-zoom-btn'>
    <button onClick={zoomIn}>+</button>
    <button onClick ={zoomOut}>-</button>
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


    
