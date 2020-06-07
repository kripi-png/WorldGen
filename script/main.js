import * as Utils from './Utils.js'
import WorldCell from './World.js'

// IDEA: remove "empty" cells from world[] and instead give each existing cell coordinates
// then loop world[], check x and y of each cell and draw the world


// create the world
export const table = document.getElementById("world").children[0].children;
const rooms = 20;
export let world = new Array();
export const possibleRooms = [{
    id: 'room1',
    mapId: null
  },
  {
    id: 'room2',
    mapId: null
  },
  {
    id: 'room3',
    mapId: null
  },
  {
    id: 'room4',
    mapId: null
  },
  {
    id: 'room5',
    mapId: null
  },
  {
    id: 'room6',
    mapId: null
  },
  {
    id: 'room7',
    mapId: null
  },
  {
    id: 'room8',
    mapId: null
  }
];
export const importantRooms = [
  {
    id: 'spawn',
    color: '#0ff',
    x: Utils.rand(0,10),
    y: Utils.rand(0,10)
  },
  {
    id: 'exit',
    color: '#f00'
  },
  {
    id: 'loot',
    color: '#FFEB3B'
  }
];

Utils.createSpawn();
createRooms(rooms);
Utils.paintTheWorld();

function createRooms(num) {
  console.log("Rooms on this floor", num);

  while ( world.length < num ) {
  // for (let i = 0; i < num; i++) {
    const available = new Array();

    // loop through all rooms and add existing ones into the array
    for (let i = 0; i < world.length; i++) {
      let room = world[i];
      if (room.id != 'empty' && room.id != 'loot' && room.id != 'exit' && room.id != 'x')

      if ((!available.includes(room))) available.push(room); else return;

    }

    // select random room out of already existing ones
    let a = Utils.rand(0, available.length - 1); // index of random room
    let randomRoom = available[a];
    let dirs = randomRoom.getAvailableDirections;

    if ( dirs ) {
      let randDir = dirs[Utils.rand(0,dirs.length-1)];
      randomRoom.funcs[randDir](randomRoom);
    }
    available.splice(a, 1)
  }

  console.log(world.length,"rooms built");
}

export function getWorld() {
  return world;
}
