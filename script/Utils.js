import { possibleRooms, importantRooms, world, table } from './main.js'
import WorldCell from './World.js'

export function createSpawn() {
  // get spawn room data
  let spawnId = importantRooms.findIndex(function(index, i) { return index.id == 'spawn'; });
  let spawn = importantRooms[spawnId];
  world.push(new WorldCell(spawn.x, spawn.y, spawn.id, spawn.color));
  table[spawn.y].children[spawn.x].innerHTML = "spawn";
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

export function createRooms(num) {
  console.log("Rooms on this floor:",num);
  while ( world.length < num ) {
    const available = [];
    // loop all rooms and add existing ones into the array
    for (let i = 0; i < world.length; i++) {
      let room = world[i];
      if (room.id != 'loot' && room.id != 'exit')
        if ((!available.includes(room))) available.push(room); else return;
    }

    let ran = rand(0, available.length - 1);
    let randomRoom = available[ran];
    let dirs = randomRoom.getAvailableDirections;

    if ( dirs ) {
      let randDir = dirs[rand(0,dirs.length-1)];
      randomRoom.funcs[randDir](randomRoom);
    }
    available.splice(ran, 1)
  }
  console.log("Finished building",world.length,"rooms.");
}
