import { importantRooms, world, table, rooms } from './main.js'
import WorldCell from './World.js'

export function createSpawn() {
  // get spawn room data
  let spawnId = importantRooms.findIndex(function(index, i) { return index.id == 'spawn'; });
  let spawn = importantRooms[spawnId];
  world.push(new WorldCell(spawn.x, spawn.y, spawn.id, spawn.color));
  table[spawn.y].children[spawn.x].innerHTML = "spawn";
}

export function createSpecialRooms() {
  // get spawn room data
  importantRooms.forEach((item, i) => {
    if ( item.id !== 'spawn' ) {
      const randomRoom = getRandomRoom(false);
      world[world.indexOf(randomRoom)] = new WorldCell(randomRoom.x, randomRoom.y, item.id, item.color);
    }
  });
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
  }
}

export function getRandomRoom(canBeSpawn=true) {
  // loop all rooms and add existing ones into the array
  const randomRooms = [];
  for (let i = 0; i < world.length; i++) {
    const room = world[i];
    if (room.id != 'loot' && room.id != 'exit')
      if (canBeSpawn)
          if ((!randomRooms.includes(room))) randomRooms.push(room); else return;
      else
        if ( room.id != 'spawn' )
          if ((!randomRooms.includes(room))) randomRooms.push(room); else return;
  }
  return randomRooms[rand(0, randomRooms.length - 1)];
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
    if ( randDir ) randomRoom.funcs[randDir](randomRoom);
  }
  console.log("Finished building",world.length,"rooms.");
}
