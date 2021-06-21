import React from 'react';
import Canvas from '../components/canvas'
import List from '../components/list'
import './App.css'

function App() {
  return (
    <div className ='App'>
      <Canvas width = {window.innerWidth} height = {window.innerHeight}/>
      <List/>
    </div>
  );
}

export default App;
