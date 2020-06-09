import { importantRooms, world, table, roomList } from './main.js'
import WorldCell from './World.js'

// use room.color property to color cells
export function paintTheWorld() {
  console.log( "----- Painting the world -----" );
  for ( const y in world ) {
    for ( const x in world ) {
      const cell = world[x][y]
      if ( cell.id !== 'empty' )
        table[x].children[y].style.backgroundColor = cell.color;

      // else
      //   table[x].children[y].innerHTML = cell.y+";"+cell.x;

      if ( cell.id === 'spawn' || cell.id === 'loot' || cell.id === 'exit' )
        table[x].children[y].innerHTML = cell.id
    }
  }
}

export function createWorld(a) {
  for (let y=0;y<11;y++) {
    world[y] = [];
    for (let x=0;x<11;x++) {
      world[y][x] = new WorldCell(x,y,'empty',null);
    }
  }
  console.log(world);

  createRooms(a);
}

export function createRooms(num) {
  console.log("----- Rooms on this floor:",num,"-----");
  createSpawn();

  while ( roomList.length < num ) {
    const randomRoom = getRandomRoom();
    const randDir = getRandomDirection(randomRoom);
    const randomNeighbour = randomRoom[randDir];

    const x = randomNeighbour.y;
    const y = randomNeighbour.x;


    if ( randomNeighbour !== null ) {
      if ( randomNeighbour.id === 'empty' ) {
        if ( !roomList.includes( randomNeighbour ) ) {
          console.debug(">> Creating new room in coordinates",y,x);
          world[x][y] = new WorldCell(y,x);
          roomList.push(world[x][y]);
        }
      }
    }
  }

  createSpecialRooms()

  console.log("----- Finished building",roomList.length,"rooms -----");
}

export function createSpawn() {
  console.log("----- Creating the spawn room -----");
  const id = importantRooms.findIndex(function(index, i) { return index.id == 'spawn'; });
  const spawnRoomData = importantRooms[id];
  world[spawnRoomData.y][spawnRoomData.x] = new WorldCell(spawnRoomData.x, spawnRoomData.y, spawnRoomData.id, spawnRoomData.color);
  roomList.push(world[spawnRoomData.y][spawnRoomData.x]);
}

export function getRandomRoom(special=true) {
  const randomRooms = [];
  const allowedRooms = (special)? ['exit','special']: importantRooms;

  for ( const row of world ) {
    for ( const cell of row ) {
      if ( cell.id !== 'empty' && !allowedRooms.includes(cell.id) && !randomRooms.includes(cell) ) {
        randomRooms.push(cell);
      }
    }
  }

  if ( randomRooms.length>0 ) {
    const i = rand(0,randomRooms.length-1);
    return randomRooms[i];
  } else throw new Error ( "No valid cells in the world" )
}

export function getRandomDirection(room) {
  const dirs = [];

  if ( room.x !== 0 ) dirs.push('left');
  if ( room.x !== 10 ) dirs.push('right');
  if ( room.y !== 0 ) dirs.push('up');
  if ( room.y !== 10 ) dirs.push('down');

  const i = rand(0,dirs.length-1);
  return dirs[i];
}












export function createSpecialRooms() {
  // const rooms = importantRooms;
  // const a = rooms.findIndex(function(index, i) { return index.id == 'spawn'; });
  // rooms.splice(a,1);
  // let i = 0;
  // while ( rooms.length >= 1 ) {
  //   if ( rooms[0] !== null ) {
  //     let room = rooms[0];
  //     let b = getRandomRoom( false )
  //     let c = b.getNeighbours;
  //
  //     if (!b.isNexTo('spawn') && !b.isNexTo('loot') && !b.isNexTo('exit')) {
  //       b.removeRoom();
  //       b = new WorldCell(b.x, b.y, room.id, room.color,b.left,b.right,b.up,b.down);
  //       world.push(b);
  //       console.log("room created",b);
  //       rooms.splice(0,1)
  //     } else {
  //     }
  //   }
  //   i++;
  //   if ( i > 10 ) return;
  // }
}

// a function for getting random number between a and b
export function rand(a, b) {
  if (a == 0) b += 1;
  return Math.floor(Math.random() * b) + a;
}
