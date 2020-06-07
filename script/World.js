import { world } from './main.js'

export default class WorldCell {
  constructor(x, y, id = "worldCell", color = "#000", left = null, right = null, up = null, down = null, cleared = false) {
    this.id = id;
    this.left = left;
    this.right = right;
    this.up = up;
    this.down = down;
    this.cleared = cleared;
    this.color = color;
    this.x = x;
    this.y = y;
  }

  createLeft() {
    const locX = this.x - 1;
    const locY = this.y;
    let room = new WorldCell(locX, locY);
    room.right = this;
    this.left = room;
    world.push(room);
  }

  createRight() {
    const locX = this.x + 1;
    const locY = this.y;
    let room = new WorldCell(locX, locY);
    room.left = this;
    this.right = room;
    world.push(room);
  }

  createUp() {
    const locX = this.x;
    const locY = this.y - 1;
    let room = new WorldCell(locX, locY);
    room.down = this;
    this.up = room;
    world.push(room);
  }

  createDown() {
    const locX = this.x;
    const locY = this.y + 1;
    let room = new WorldCell(locX, locY);
    room.up = this;
    this.down = room;
    world.push(room);
  }
}
