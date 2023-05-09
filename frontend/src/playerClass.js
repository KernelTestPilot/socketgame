import * as PIXI from "pixi.js";


export class Player extends PIXI.Graphics{
    constructor(radius=20,color=0xFF0000, health, level, name) {
        super();
        this.radius = radius;
        this.health = health;
        this.level = level;
        this.name = name;
        this.beginFill(color);
        this.drawCircle(0,0,radius);
		    this.endFill();

     // Set initial velocity values
     this.dx = 0;
     this.dy = 0;
  }
    
    move(){
		this.x += this.dx;
		this.y += this.dy;
	}

  }
  