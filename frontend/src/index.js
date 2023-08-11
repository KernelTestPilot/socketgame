import "./styles.css";
import * as PIXI from "pixi.js";
import { Player } from "./playerClass";
import { GameController } from "./gameController";
import io from 'socket.io-client';


  const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
  });
  document.body.appendChild(app.view);

const gameLoop ={
  gameUpdate: null,
  match: null,
  players: [],

  start() {
      const update = this.gameUpdate;
      requestAnimationFrame(this.render.bind(this));
      app.stage.removeChildren(); // Clear the stage before drawing players

},
render() {
  // Make function to check if new players join app.stage.removeChildren(); // Clear the stage before drawing players

  gc.update();

  const update = this.gameUpdate;

  if (update) {
    Object.values(update.players).forEach(playerData => {
      // Get player's current position and velocity
      const { x, y, dx, dy } = playerData;

      // Create or retrieve the player instance
      let player = this.players[playerData.socketId];
      if (!player) {
        player = new Player(playerData.socketId, x, y);
        this.players[playerData.socketId] = player;

        //app.stage.removeChildren(); // Clear the stage before drawing players

        app.stage.addChild(player);
        
      }

      // Update player's position and velocity
      player.setVelocity(dx, dy);
      player.move(); // Update player's position based on velocity
    });
  }

  app.renderer.render(app.stage);
  requestAnimationFrame(this.render.bind(this));
  
}
}



const sockets = {
  socket: null,

  init() {

    this.socket = io('http://localhost:5000/', { transports: ['websocket'] });
    this.registerConnection();
    //this.socket.onAny((event, ...args) => {
     // console.log(event, args);});
  },

  registerConnection() {
      const connectedPromise = new Promise(resolve => {
          this.socket.on('connect', () => {
              console.log('client connected to server');
              resolve();
          });
      });

      connectedPromise.then(() => {
        
        const syncUpdate = (update) =>
        gameLoop.gameUpdate = update;
        this.socket.on('gameUpdate', syncUpdate);

      });
 
  },
};


sockets.init();
const gc = new GameController(sockets);
gameLoop.start();

//requestAnimationFrame(gameLoop);