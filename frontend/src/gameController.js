export class GameController {
    constructor(player) {
      this.player = player;
      this.keys = {};
      window.addEventListener("keydown", this.handleKeyDown.bind(this));
      window.addEventListener("keyup", this.handleKeyUp.bind(this));
    }
  
    handleKeyDown(event) {
      this.keys[event.key] = true;
    }
  
    handleKeyUp(event) {
      this.keys[event.key] = false;
    }
  
    update() {
      if (this.keys["ArrowLeft"]) {
        this.player.dx = -5;
        console.log(this.player.dx)
      } else if (this.keys["ArrowRight"]) {
        this.player.dx = 5;
      } else {
        this.player.dx = 0;
      }
  
      if (this.keys["ArrowUp"]) {
        this.player.dy = -5;
      } else if (this.keys["ArrowDown"]) {
        this.player.dy = 5;
      } else {
        this.player.dy = 0;
      }
    }
  }