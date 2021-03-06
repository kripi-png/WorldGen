import { world } from './main.js'
const defaultColor = "#7f7f7f";

export default class WorldCell {
  constructor(x, y, id = 'worldCell', color = defaultColor, cleared = false) {
    this.id = id;
    this.left = null;
    this.right = null;
    this.up = null;
    this.down = null;
    this.cleared = cleared;
    this.color = color;
    this.x = x;
    this.y = y;

    this.setNeighbours();
  }

  removeRoom() {
    world[this.y][this.x] = new WorldCell(i,j,'empty',null);
  }

  setNeighbours() {
    if ( this.id !== 'empty' ) {
      const x = this.x;
      const y = this.y;

      this.up = (y===0)?null : world[y-1][x];
      this.down = (y===10)?null : world[y+1][x];
      this.left = (x===0)?null : world[y][x-1];
      this.right  = (x===10)?null : world[y][x+1];

      if ( this.up )
        this.up.down = this;
      if ( this.down )
        this.down.up = this;
      if ( this.left )
        this.left.right = this;
      if ( this.right )
        this.right.left = this;
    }
  }

  // returns true if given id matches the id of a neighbour room
  // ( id ) can be either [a list] or a 'string'
  isTouching(id) {
    const n = [this.up,this.down,this.left,this.right];
    
    if ( typeof id === 'object' ) {
      for ( const object of id ) {
        for ( const dir of n ) {
          if ( dir !== null ) {
            if ( object === dir.id ) return true;
          }
        }
      } return false;
    }

    else if ( typeof id === 'string' ) {
      for ( const dir of n ) {
        if ( dir !== null ) {
          if ( dir.id === id ) return true;
        }
      } return false;
    }

    else throw new Error ( "Invalid type: " + typeof id );
  }
}
