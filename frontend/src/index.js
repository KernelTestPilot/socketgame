import "./styles.css";
import * as PIXI from "pixi.js";
import { Player } from "./playerClass";
import { GameController } from "./gameController";
import io from 'socket.io-client';


let currentPlayers = [];

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


function gameLoop(){
  gc.update();
  newPlayer.move();
  app.renderer.render(stage);
  requestAnimationFrame(gameLoop);

}
requestAnimationFrame(gameLoop);



const sockets = {
  sockets: null,
  socket: io('http://localhost:5000/', { transports: ['websocket'] }),

  init() {
      this.registerConnection();
  },

  registerConnection() {
      const connectedPromise = new Promise(resolve => {
          this.socket.on('connect', () => {
              console.log('client connected to server');
              resolve();
          });
      });

      connectedPromise.then(() => {
       //DO updates here
      });
 
  },
};

currentPlayers.forEach(player => {
  console.log(currentPlayers)
  app.stage.addChild(player);
});

sockets.init();

