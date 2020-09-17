import { specialRooms, types, world, table, roomList } from './main.js'
import WorldCell from './World.js'

// use room.color property to color cells
export function paintTheWorld() {
  console.log( "----- Painting the world -----" );
  for ( const y in world ) {
    for ( const x in world[y] ) {
      const cell = world[x][y]
      if ( cell.id !== 'empty' )
        table[x].children[y].style.backgroundColor = cell.color;
      if ( cell.id === 'spawn' || cell.id === 'loot' || cell.id === 'exit' || cell.id === 'boss' )
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
  createRooms( a );
}

export function createRooms( num ) {
  console.log( "----- Rooms on this floor:",num,"-----" );
  createSpawn();
  while ( roomList.length < num ) {
    const randomRoom = getRandomRoom();
    const randDir = getRandomDirection(randomRoom);
    const randomNeighbour = randomRoom[randDir];
    const x = randomNeighbour.y;
    const y = randomNeighbour.x;
    if ( randomNeighbour ) {
      if ( randomNeighbour.id === 'empty' ) {
        if ( !roomList.includes( randomNeighbour )) {
          const type = types[rand(0,types.length-1)];
          // console.debug( ">> Creating a new room [id:",type.id+"] in coordinates",y,x );
          world[x][y] = new WorldCell(y,x,type.id,type.color);
          roomList.push(world[x][y]);
        }
      }
    }
  }
  createSpecialRooms();
  console.log( "----- Finished building",roomList.length,"rooms -----" );
}

export function createSpawn() {
  console.log( "----- Creating the spawn room -----" );
  const id = specialRooms.findIndex(function(room, i) { return room.id === 'spawn'; });
  const spawnRoomData = specialRooms[id];
  world[spawnRoomData.y][spawnRoomData.x] = new WorldCell(spawnRoomData.x, spawnRoomData.y, spawnRoomData.id, spawnRoomData.color);
  roomList.push(world[spawnRoomData.y][spawnRoomData.x]);
}

export function createSpecialRooms() {
  console.log( "----- Creating special rooms -----" );
  const rooms = specialRooms.slice(); // for special room data (levelId, color, id, etc.)
  rooms.splice(specialRooms.findIndex((room,i) => { return room.id === 'spawn'}),1); // remove the spawn room object
  let roomIds = []; // for checking if the room which the code is going to replace is a special room (e.g. spawn)
  for ( const room of specialRooms ) { roomIds.push( room.id ) }
  while ( rooms.length > 0) {
    const room = getRandomRoom();
    const x = room.y;
    const y = room.x;
    if ( !room.isTouching(roomIds) && !roomIds.includes(room.id) ) {
      world[x][y] = new WorldCell(y,x,rooms[0].id,rooms[0].color);
      rooms.splice(0,1);
    }
  }
}

export function getRandomRoom(special=true) {
  const randomRooms = [];
  const allowedRooms = (special)? ['exit','special']: specialRooms;
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

// a function for getting a random number between a and b
export function rand(a, b) {
  if (a == 0) b += 1;
  return Math.floor(Math.random() * b) + a;
}
