export interface Coordinates {
  x:number;
  y:number;
}

export interface polygon{
  id: number;
  name: string;
  points: Array<{x: number, y:number}>
}