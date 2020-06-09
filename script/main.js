import * as Utils from './Utils.js'
import WorldCell from './World.js'

export const table = document.getElementById("world").children[0].children;
export const world = []; // world data
export const roomList = []; // for checking for dublicates

// list of normal room objects. Generator will randomly select one of available objects and use its data
export const types = [
{
  id: 'room1',
  color: '#1b5e56',
  levelId: null
},
{
  id: 'room2',
  color: '#28317d',
  levelId: null
},
{
  id: 'room3',
  color: '#b6b7f0',
  levelId: null
}
];

// list of special room objects that can have all kind of information about said rooms
export const specialRooms = [
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

// how many rooms will the generator create including special rooms
export const rooms = 22;

Utils.createWorld(rooms);
Utils.paintTheWorld();
