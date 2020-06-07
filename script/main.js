import * as Utils from './Utils.js'
import WorldCell from './World.js'

// IDEA: remove "empty" cells from world[] and instead give each existing cell coordinates
// then loop world[], check x and y of each cell and draw the world


// create the world
const table = document.getElementById("world").children[0].children;
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
    color: '#0ff'
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
paintTheWorld();

function createRooms(num) {
  console.log("Rooms on this floor", num);
  // selecting spawn room

  // let n = rand(0, 1);
  // if (n == 1) world[0].createLeft();
  // n = rand(0, 1);
  // if (n == 1) world[0].createRight();
  // n = rand(0, 1);
  // if (n == 1) world[0].createUp();
  // n = rand(0, 1);
  // if (n == 1) world[0].createDown();

  console.log("rooms to be built:", num);

  // while ( world.length < num+1 ) {
  for (let i = 0; i < num; i++) {
    const available = new Array();

    // loop through all rooms and add existing ones into the array
    for (let i = 0; i < world.length; i++) {
      let room = world[i];
      if (room.id != 'empty' && room.id != 'loot' && room.id != 'exit' && room.id != 'x')

      if (!available.includes(room)) available.push(room); else return;

    }

    // select random room out of already existing ones
    let a = rand(0, available.length - 1);
    let randomRoom = available[a];
    console.log(randomRoom);
    // check how many available spots there is

    // if (randomRoom.right == null)
    //   if (randomRoom.right.up == null && randomRoom.right.down == null)
    //     console.log("asd");





    available.splice(a, 1)
    
  }
}

function paintTheWorld() {
  for (let i = 0; i < world.length; i++) {
    if (world[i].id)
      table[world[i].y].children[world[i].x].style.background = world[i].color;
  }
}

function rand(a, b) {
  if (a == 0) b += 1;
  return Math.floor(Math.random() * b) + a;
}
