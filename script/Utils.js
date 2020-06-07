import { possibleRooms, importantRooms, world } from './main.js'
import WorldCell from './World.js'

export function createSpawn() {
  let spawnId = importantRooms.findIndex(function(index, i) {
    return index.id == 'spawn';
  });
  let spawn = importantRooms[spawnId];
  world.push(new WorldCell(5, 5, spawn.id, spawn.color));
  const newRooms = new Array();
}
