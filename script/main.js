import * as Utils from './Utils.js'
import WorldCell from './World.js'

export const table = document.getElementById("world").children[0].children;
export const world = [];
export const roomList = [];
export const possibleRooms = [
{
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

export const rooms = 20 + importantRooms.length - 1;

Utils.createWorld(rooms);
Utils.paintTheWorld();

// world.forEach((item, i) => { item.setNeighbours(); });
console.log("----- Actual room count",checkActualSize(),"-----");

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
