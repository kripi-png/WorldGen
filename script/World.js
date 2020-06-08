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
  }

  createLeft() {
    const locX = this.x - 1;
    const locY = this.y;
    if ( locX < 0 ) return;
    if ( this.left !== null ) return;

    const a = this.getNeighbours;

    const left = null;
    const right = this;
    const up = ( a.up === null ) ? null : a.up.left;
    const down = ( a.down === null ) ? null : a.down.left;

    let room = new WorldCell(locX, locY, 'worldCell', '#000',left,right,up,down );

    this.left = room;
    world.push(room);
  }

  createRight() {
    const locX = this.x + 1;
    const locY = this.y;
    if ( locX > 10 ) return;
    if ( this.right !== null ) return;

    const a = this.getNeighbours;

    const left = this;
    const right = null;
    const up = ( a.up === null ) ? null : a.up.right;
    const down = ( a.down === null ) ? null : a.down.right;

    let room = new WorldCell(locX, locY, 'worldCell', '#000',left,right,up,down );

    this.right = room;
    world.push(room);
  }

  createUp() {
    const locX = this.x;
    const locY = this.y - 1;
    if ( locY < 0 ) return;
    if ( this.up !== null ) return;

    const a = this.getNeighbours;

    const left = ( a.left === null ) ? null : a.left.up;
    const right = ( a.right === null ) ? null : a.right.up;
    const up = null;
    const down = this;

    let room = new WorldCell(locX, locY, 'worldCell', '#000',left,right,up,down );

    this.up = room;
    world.push(room);
  }

  createDown() {
    const locX = this.x;
    const locY = this.y + 1;
    if ( locY > 10 ) return;
    if ( this.down !== null ) return;

    const a = this.getNeighbours;

    const left = ( a.left === null ) ? null : a.left.down;
    const right = ( a.right === null ) ? null : a.right.down;
    const up = this;
    const down = null;

    let room = new WorldCell(locX, locY, 'worldCell', '#000',left,right,up,down );

    this.down = room;
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
    let neighboursList = { left: null, right: null, up: null, down: null };

    if ( this.up !== null ) neighboursList.up = this.up;
    if ( this.down !== null ) neighboursList.down = this.down;
    if ( this.left !== null ) neighboursList.left = this.left;
    if ( this.right !== null ) neighboursList.right = this.right;

    return neighboursList;
  }

  setNeighbours() {
    console.log(this);

    const sUp = this.up;
    const sDown = this.down;
    const sLeft = this.left;
    const sRight = this.right;

    // up
    if ( sUp === null) {
      if ( sLeft !== null ) {
        if ( sLeft.up ) {
          if ( sLeft.up.right !== null ) {
            this.up = sLeft.up.right;
          } else this.up = null;
        }
      }

      else if ( sRight !== null ) {
        if ( sRight.up ) {
          if ( sRight.up.left !== null ) this.up = sRight.up.left;
        } else this.up = null;
      }
    }

    if ( sDown !== null ) {
      if ( sLeft !== null ) {
        if ( sLeft.down ) {
          if (sLeft.down.right !== null ) {
            this.down = sLeft.down.right;
          } else this.down = null;
        }
      }

      else if ( sRight !== null ) {
        if ( sRight.down ) {
          if (sRight.down.left !== null ) {
            this.down = sRight.down.left;
          } else this.down = null;
        }
      }
    }

    if ( sLeft !== null ) {
      if ( sDown !== null ) {
        if ( sDown.left ) {
          if ( sDown.left.up !== null ) {
            this.left = sDown.left.up;
          } else this.left = null;
        }
      }

      else if ( sUp !== null) {
        if ( sUp.left ) {
          if ( sUp.left.down !== null ) {
            this.left = sUp.left.down;
          } else this.left = null;
        }
      }
    }

    if ( sRight !== null ) {
      if ( sDown !== null ) {
        if ( sDown.right ) {
          if ( sDown.right.up !== null ) {
            this.right = sDown.right.up;
          } else this.right = null;
        }
      }

      else if ( sUp !== null) {
        if ( sUp.right ) {
          if ( sUp.right.down !== null ) {
            this.right = sUp.right.down;
          } else this.right = null;
        }
      }
    }
  }

  isNexTo ( id ) {
    const a = this.getNeighbours;
    for (const i in a) {
      if ( a[i] !== null)
        if (a[i].id === id)
          return true;
    }

    return false;
  }
}
