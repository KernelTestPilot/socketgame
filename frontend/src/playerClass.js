import * as PIXI from "pixi.js";

export class Player extends PIXI.Graphics {
  constructor(socketId, x, y) {
    super();
    this.radius = 20;
    this.socketId = socketId;
    this.position.set(x, y); // Set initial position

    this.beginFill(0xFF0000);
    this.drawCircle(0, 0, this.radius); // Center of the circle is (0, 0)
    this.endFill();

    // Initial velocity
    this.dx = 0;
    this.dy = 0;
  }

  move() {
    // Update position based on velocity
    this.x += this.dx;
    this.y += this.dy;
  }

  setVelocity(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }
}