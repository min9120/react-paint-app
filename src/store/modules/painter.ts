const CREATE = 'painter/CREATE';
const DELETE = 'painter/DELETE';

interface polygon{
  id: number;
  name: string;
  points: Array<{x: number, y:number}>
}
export const painterActions = {
  create: (points:Array<{x:number, y:number}>)=> {
    return{type:CREATE, payload:{points}}},
  delete:(id:number)=>({type:DELETE, payload:{id}})
}


type CreateAction = ReturnType<typeof painterActions.create>
type DeleteAction = ReturnType<typeof painterActions.delete>
type Actions = CreateAction | DeleteAction;

export type PolygonState = {
  count: number
  polygons:Array<polygon>;
}
const initialState:PolygonState ={
  count:0,
  polygons:[
    
  ]
}

export default function reducer(
  state:PolygonState =initialState, 
  action:Actions
  ){
    let newState: PolygonState;
 switch(action.type){
   case CREATE : 
      newState = {...state}
      newState.count +=1;
      const newPolygon = {
        id: newState.count,
        name : `polygon${newState.count}`,
        points : (action.payload as {points:Array<{x:number,y:number}>}).points
      }
      newState.polygons.push(newPolygon)
      return newState;
    case DELETE :
      newState = {...state}
      newState.polygons.pop();
      return newState;
    default :
    return state;

 }
 
}

