import { Player } from "./playerClass";

export class GameController {
    constructor(sockets) {
      console.log(sockets)
      this.socket = sockets;
      this.dx = 10;
      this.dy = 10;
      this.bulletdx = 0;
      this.bulletdy = 0;
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
  
    update(player) {
      if (this.keys["ArrowLeft"]) {
        this.dx = -5;
        this.socket.socket.emit('playerMove', { dx: this.dx, dy: this.dy });
        

      } else if (this.keys["ArrowRight"]) {
        this.dx = 5;
        this.socket.socket.emit('playerMove', { dx: this.dx, dy: this.dy });
      } else {
        this.dx = 0;
        this.socket.socket.emit('playerMove', { dx: this.dx, dy: this.dy });

      }
  
      if (this.keys["ArrowUp"]) {
        this.dy = -5;
        this.socket.socket.emit('playerMove', { dx: this.dx, dy: this.dy });
   
      } else if (this.keys["ArrowDown"]) {
        this.dy = 5;
        this.socket.socket.emit('playerMove', { dx: this.dx, dy: this.dy });

      } else {
        this.dy = 0;
        this.socket.socket.emit('playerMove', { dx: this.dx, dy: this.dy });

      }
      if (this.keys["a"]) {
     this.bulletdx = player.x
     this.bulletdy = player.y
       this.socket.socket.emit('playerShoot', { bulletdx: this.bulletdx, bulletdy: this.bulletdy });
      }
      else{
        this.bulletdx = 0;
        this.bulletdy = 0;
      }

    }
  }
