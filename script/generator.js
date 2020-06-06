class WorldCell {
  constructor(id="empty",color="#fff",left=null,right=null,up=null,down=null,cleared=false) {
    this.id = id;
    this.left = left;
    this.right = right;
    this.up = up;
    this.down = down;
    this.cleared = cleared;
    this.color = color;
  }
}


// create the world
const table = document.getElementById("world").children[0].children;
const rooms = 6;
let world = new Array();
const possibleRooms = [
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
const importantRooms = [
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

for ( let i=0;i<table.length;i++ ) {
  let worldRow = new Array();
  world.push(worldRow);
  for ( let j=0;j<table[i].children.length;j++ ) {
    let worldCell = new WorldCell();
    worldRow.push(worldCell)
  }
}

createRooms(rooms);
paintTheWorld();

function createRooms(num) {
  console.log("Rooms on this floor",num);
  // selecting spawn room
  let spawnId = importantRooms.findIndex(function (index,i){return index.id == 'spawn';});
  let spawn = importantRooms[spawnId];
  world[5][5] = new WorldCell(spawn.id,spawn.color);
  const newRooms = new Array();

  // IDEA: createLeft, ..Right, etc = (thisRoom) => {}
  // -> no need for const newRooms

  let n = rand(0,1);if (n==1) newRooms.push("left");
  n = rand(0,1);if (n==1) newRooms.push("right");
  n = rand(0,1);if (n==1) newRooms.push("up");
  n = rand(0,1);if (n==1) newRooms.push("down");

  if (newRooms.length==0) newRooms.push("left");

  console.log("Creating",newRooms.length,"rooms next to the spawn room");
  const thisRoom = {
    x:5,
    y:5
  };

  num -= newRooms.length;

  spawn = world[thisRoom.x][thisRoom.y];
  spawn.cleared = true;
  let room=new WorldCell();
  for (let i=0;i<newRooms.length;i++) {
    switch (newRooms[i]) {
      case "left":
        room=new WorldCell();
        room.id='worldCell';
        room.color='#000';
        room.right = spawn;
        spawn.left = world[thisRoom.y][thisRoom.x-1] = room;
        console.log("left");
        console.log(room);
        break;

      case "right":
        room=new WorldCell();
        room.id='worldCell';
        room.color='#000';
        room.left = spawn;
        spawn.right = world[thisRoom.y][thisRoom.x+1] = room;
        console.log("right");
        console.log(room);
        break;

      case "up":
        room=new WorldCell();
        room.id='worldCell';
        room.color='#000';
        room.down = spawn;
        spawn.up = world[thisRoom.y-1][thisRoom.x] = room;
        console.log("up");
        console.log(room);
        break;

      case "down":
        room=new WorldCell();
        room.id='worldCell';
        room.color='#000';
        room.up = spawn;
        spawn.down = world[thisRoom.y+1][thisRoom.x] = room;
        console.log("down");
        console.log(room);
        break;

      default:
        throw new Error("y u running");

    newRooms.splice(i,1);

    }
  }

  console.log("rooms to be built:",num);

  for (let i=0;i<num;i++){
    const available = new Array();

    // loop through all rooms and add existing ones into the array
    for (let i = 0; i < world.length; i++) {
      for (let j = 0; j < world[i].length; j++) {
        let room = world[i][j];
        // if (room.id != 'empty')
          // console.log(room);
      }
    }

    // select random room out of already existing ones
    // check how many available spots there is
    // build room
  }
}

function paintTheWorld() {
  for( let i=0;i<world.length;i++ ) {
    for( let j=0;j<world.length;j++ ) {
      let cell = world[i][j];
      let tile = table[i].children[j];
      tile.style.background = cell.color;
    }
  }
}

function rand(a,b){if(a==0)b+=1;return Math.floor(Math.random()*b)+a;}
