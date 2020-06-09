import { importantRooms, world, table, rooms, checkActualSize } from './main.js'
import WorldCell from './World.js'

// use room.color property to color cells
export function paintTheWorld() {
  console.log( "Painting the world" );
  for ( let i = 0; i < world.length; i++ ) {
    const col = world[i];
    for ( let j = 0;j<col.length;j++) {
      const cell = world[j][i]
      if ( cell.id !== 'empty' )
        table[j].children[i].style.backgroundColor = cell.color;

      if ( cell.id === 'spawn' || cell.id === 'loot' || cell.id === 'exit' )
        table[j].children[i].innerHTML = cell.id
    }
  }
}

export function createWorld() {
  for (let i=0;i<11;i++) {
    world[i] = [];
    for (let j=0;j<11;j++) {
      world[i][j] = new WorldCell(i,j,'empty',null);
    }
  }
  console.log(world);
}

export function createSpawn() {
  console.log("Creating spawn room");
  const id = importantRooms.findIndex(function(index, i) { return index.id == 'spawn'; });
  const spawnRoomData = importantRooms[id];
  world[spawnRoomData.y][spawnRoomData.x] = new WorldCell(spawnRoomData.x, spawnRoomData.y, spawnRoomData.id, spawnRoomData.color);
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

export function getRandomRoom(canBeSpecial=true) {
  // loop all rooms and add existing ones into the array
  const randomRooms = [];
  const allowedRooms = (canBeSpecial)? ['exit','special']: importantRooms;

  world.forEach((room) => {
    if (!allowedRooms.includes(room.id)) {
      randomRooms.push(room);
    }
  });
  return randomRooms[rand(0, randomRooms.length - 1)];;
}

export function getRandomDirection(room) {
  const dirs = room.getAvailableDirections;
  if ( dirs ) return dirs[rand(0,dirs.length-1)];
}

const asd = [];

export function createRooms(num) {
  console.log("Rooms on this floor:",num);
  let newRoom;
  while ( world.length < 6 ) {
    const randomRoom = getRandomRoom();
    const randDir = 'left';//getRandomDirection(randomRoom);
    const nb = randomRoom.getNeighbours; //NeighBours
    console.log(randomRoom.id);
    const nbr = nb[randDir]; // NeighBourRoom


    if ( randDir === 'left' ) {
      if ( nbr === null ) {
        console.log("building");
        newRoom = randomRoom.createLeft();
      } else console.log("room already exists in direction",randDir,"in coordinates",nbr.x,nbr.y);
    }
    console.log(newRoom);
    if ( newRoom )
      if ( !world.includes( newRoom ) )
        world.push(newRoom)
      else console.log("Room already exists in the world in coordinates",newRoom.x,newRoom.y);
  }


  console.log("Finished building",world.length,"rooms.");
}
