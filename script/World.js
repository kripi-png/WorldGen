import { world } from './main.js'

export default class WorldCell {
  constructor(x, y, id = "worldCell", color = "#000", left = null, right = null, up = null, down = null, cleared = false) {
    this.id = id;
    this.left = left;
    this.right = right;
    this.up = up;
    this.down = down;
    this.cleared = cleared;
    this.color = color;
    this.x = x;
    this.y = y;

    this.funcs = {
      left: this.createLeft,
      right: this.createRight,
      up: this.createUp,
      down: this.createDown
    }
  }

  createLeft(a) {
    const locX = a.x - 1;
    const locY = a.y;
    if ( locX < 0 ) return;
    if ( a.left !== null ) return;

    let room = new WorldCell(locX, locY, 'worldCell', '#000',a.getNeighbours.left,a.getNeighbours.right,a.getNeighbours.up,a.getNeighbours.down);
    room.right = a;
    a.left = room;
    world.push(room);
  }

  createRight(a) {
    const locX = a.x + 1;
    const locY = a.y;
    if ( locX > 10 ) return;
    if ( a.right !== null ) return;

    let room = new WorldCell(locX, locY, 'worldCell', '#000',a.getNeighbours.left,a.getNeighbours.right,a.getNeighbours.up,a.getNeighbours.down);
    room.left = a;
    a.right = room;
    world.push(room);
  }

  createUp(a) {
    const locX = a.x;
    const locY = a.y - 1;
    if ( locY < 0 ) return;
    if ( a.up !== null ) return;

    let room = new WorldCell(locX, locY, 'worldCell', '#000',a.getNeighbours.left,a.getNeighbours.right,a.getNeighbours.up,a.getNeighbours.down);
    room.down = a;
    a.up = room;
    world.push(room);
  }

  createDown(a) {
    const locX = a.x;
    const locY = a.y + 1;
    if ( locY > 10 ) return;
    if ( a.down !== null ) return;

    let room = new WorldCell(locX, locY, 'worldCell', '#000',a.getNeighbours.left,a.getNeighbours.right,a.getNeighbours.up,a.getNeighbours.down);
    room.up = a;
    a.down = room;
    world.push(room);
  }

  get getAvailableDirections() {
    let directions = new Array();

    if ( this.up == null ) directions.push( 'up' );
    else {
      if  ( this.up.right == null ) directions.push( 'right' );
      if  ( this.up.left == null ) directions.push( 'left' );
    }

    if ( this.down == null ) directions.push( 'down' );
    else {
      if  ( this.down.right == null ) if (!directions.includes( 'right' )) directions.push( 'right' );
      if  ( this.down.left == null ) if (!directions.includes( 'left' )) directions.push( 'left' );
    }
    // console.log(directions);
    if ( directions.length !== 0 ) return directions;
  }

  get getNeighbours(){
    let neighbours = { left: null, right: null, up: null, down: null };

    if ( this.up !== null ) neighbours.up = this.up;
    if ( this.down !== null ) neighbours.down = this.down;
    if ( this.left !== null ) neighbours.left = this.left;
    if ( this.right !== null ) neighbours.right = this.right;

    return neighbours;
  }
}
