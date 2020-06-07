import { possibleRooms, importantRooms, world, table } from './main.js'
import WorldCell from './World.js'

export function createSpawn() {
  let spawnId = importantRooms.findIndex(function(index, i) {
    return index.id == 'spawn';
  });
  let spawn = importantRooms[spawnId];
  world.push(new WorldCell(spawn.x, spawn.y, spawn.id, spawn.color));

  table[spawn.y].children[spawn.x].innerHTML = "spawn";
}

export function rand(a, b) {
  if (a == 0) b += 1;
  return Math.floor(Math.random() * b) + a;
}

export function paintTheWorld() {
  for (let i = 0; i < world.length; i++) { // loop every room
    // get x and y properties of world[i] and use the coordinates as index
    table[world[i].y].children[world[i].x].style.background = world[i].color;
  }
}
