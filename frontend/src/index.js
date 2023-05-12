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

  const newPlayer =  new Player(100,1,"OSKAR");
  const stage = app.stage;

  const gc = new GameController(newPlayer);
  app.stage.addChild(newPlayer);


 



const gameLoop ={
  gameUpdate: null,
  match: null,

  start() {
    requestAnimationFrame(this.render.bind(this));
},
render() {
  const update = this.gameUpdate;
  for (let key in update) {
    const playerData = update[key];
    const newPlayer = new Player(playerData.x, playerData.y, playerData.name);
    app.stage.addChild(newPlayer)

  }
console.log(update)
  gc.update();
  newPlayer.move();
  app.renderer.render(stage);
  requestAnimationFrame(this.render.bind(this));
},


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
      
        const syncUpdate = (update) => gameLoop.gameUpdate = update;
        this.socket.on('gameUpdate', syncUpdate);
      });
 
  },
};


sockets.init();
gameLoop.start();
//requestAnimationFrame(gameLoop);