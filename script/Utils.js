import { importantRooms, world, table, rooms } from './main.js'
import WorldCell from './World.js'

export function createSpawn() {
  // get spawn room data
  let spawnId = importantRooms.findIndex(function(index, i) { return index.id == 'spawn'; });
  let spawn = importantRooms[spawnId];
  world.push(new WorldCell(spawn.x, spawn.y, spawn.id, spawn.color));
}

export function createSpecialRooms() {
  const rooms = importantRooms;
  const a = rooms.findIndex(function(index, i) { return index.id == 'spawn'; });
  rooms.splice(a,1);
  let n = 0;
  while ( rooms.length >= 1 ) {
    if ( rooms[0] !== null ) {
      let room = rooms[0];
      let b = getRandomRoom( false )
      let c = b.getNeighbours;

      if (!b.isNexTo('spawn') && !b.isNexTo('loot') && !b.isNexTo('exit')) {
        b = world[world.indexOf(b)] = new WorldCell(b.x, b.y, room.id, room.color,b.left,b.right,b.up,b.down);
        console.log("room created",b);
        rooms.splice(0,1)
      } else {
      }
    }
    n++;
    if ( n > 10 ) return;
  }
}

// a function for getting random number between a and b
export function rand(a, b) {
  if (a == 0) b += 1;
  return Math.floor(Math.random() * b) + a;
}

// use room.color property to color cells
export function paintTheWorld() {
  for (let i = 0; i < world.length; i++) {
    // get x and y properties of world[i] and use the coordinates as index
    table[world[i].y].children[world[i].x].style.background = world[i].color;
    if ( world[i].id !== 'worldCell' )
      table[world[i].y].children[world[i].x].innerHTML = world[i].id;
  }
}

export function getRandomRoom(canBeSpecial=true) {
  // loop all rooms and add existing ones into the array
  const randomRooms = [];
  for (let i = 0; i < world.length; i++) {
    const room = world[i];
    if (room.id !== 'loot' && room.id !== 'exit')
      if (canBeSpecial)
          if ((!randomRooms.includes(room))) randomRooms.push(room); else return;
      else
        if ( room.id !== 'spawn')
          if ((!randomRooms.includes(room))) randomRooms.push(room); else return;
  }
  let a = randomRooms[rand(0, randomRooms.length - 1)];
  return a;
}

export function getRandomDirection(room) {
  const dirs = room.getAvailableDirections;
  if ( dirs ) return dirs[rand(0,dirs.length-1)];
}

export function createRooms(num) {
  console.log("Rooms on this floor:",num);
  while ( world.length < num ) {
    const randomRoom = getRandomRoom();
    const randDir = getRandomDirection(randomRoom);
    if ( randDir === 'left' ) randomRoom.createLeft();
    else if ( randDir === 'right' ) randomRoom.createRight();
    else if ( randDir === 'up' ) randomRoom.createUp();
    else if ( randDir === 'down' ) randomRoom.createDown();
  }
  console.log("Finished building",world.length,"rooms.");
}
