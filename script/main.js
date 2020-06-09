import * as Utils from './Utils.js'
import WorldCell from './World.js'

export const table = document.getElementById("world").children[0].children;
export const world = [];
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

Utils.createWorld();
Utils.createSpawn();
// Utils.createRooms(rooms);
// Utils.createSpecialRooms();
Utils.paintTheWorld();

// world.forEach((item, i) => { item.setNeighbours(); });
// console.log("Actual room count",checkActualSize());
// if ( checkActualSize() !== rooms )
//   console.log("seems like some rooms got replaced");

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

export function lookForDuplicates() {
  const list = [];

  for ( const i in world ) {
    const a = world[i];
    const b = { x:a.x,y:a.y }

    console.log(a);

    const c = [];
    for ( j in list ) {
      d = list[j]
      console.log(d);
      if ( (b.x !== d.x) && (b.y !== d.y) ) console.log("asd");
      else console.log("wtf", b);
    }
  }

  return list;
}
