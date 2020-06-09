import * as Utils from './Utils.js'
import WorldCell from './World.js'

export const table = document.getElementById("world").children[0].children;
export const world = []; // world data
export const roomList = []; // for checking for dublicates

// list of normal room objects. Generator will randomly select one of available objects and use its data
export const possibleRooms = [
{
  id: 'room1',
  levelId: null
},
{
  id: 'room2',
  levelId: null
},
{
  id: 'room3',
  levelId: null
},
{
  id: 'room4',
  levelId: null
},
{
  id: 'room5',
  levelId: null
},
{
  id: 'room6',
  levelId: null
},
{
  id: 'room7',
  levelId: null
},
{
  id: 'room8',
  levelId: null
}
];

// list of special room objects that can have all kind of information about said rooms
export const importantRooms = [
  {
    id: 'spawn',
    color: '#0ff',
    x: Utils.rand(0,10),
    y: Utils.rand(0,10),
    levelId: null
  },
  {
    id: 'exit',
    color: '#f00',
    levelId: null
  },
  {
    id: 'loot',
    color: '#FFEB3B',
    levelId: null
  }
];

// how many rooms will the generator create. Includes important rooms
export const rooms = 22;

Utils.createWorld(rooms);
Utils.paintTheWorld();

console.log("----- Actual room count",checkActualSize(),"-----");

// for debugging purposes
// counts how many colored cells there are
export function checkActualSize () {
  const list = [];
  for ( const row in table ) {
    for ( const cell in table[row].children ) {
      if ( typeof table[row].children[cell] === 'object' ) {
        const a = table[row].children[cell].getAttribute("style");
        if ( a !== null )
          list.push(a);
      }
    }
  }
  return list.length;
}
