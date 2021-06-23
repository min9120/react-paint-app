import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootStoreState } from './../index';
import './list.css'

function List() {
  const polygonsList = useSelector((state:RootStoreState)=>state.polygons,(a,b)=>false);

  return (
      <div className = 'List-container'>
        <ul>
          {
            polygonsList.map((current, index)=>{
              return (
                <li key ={index}>{current.name}</li>
              )
            })
          }
        </ul>
      </div>
 
  );
}

export default List;
