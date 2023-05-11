import "./styles.css";
import * as PIXI from "pixi.js";
import { Player } from "./playerClass";
import { GameController } from "./gameController";
import io from 'socket.io-client';


const Game = {
  update: {},
  actorData: {},
  player: {}
}
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


  const drawMap = () => {
    console.log(Game)
    for(let i = 0; i < Game.update.length; i++){
      const newPlayer =  new Player(100,1,"OSKAR");
      app.stage.addChild(newPlayer);

      console.log("teststs")
  
    }
}
function gameLoop(){

  gc.update();
  newPlayer.move();
  app.renderer.render(stage);
  requestAnimationFrame(gameLoop);

}
requestAnimationFrame(gameLoop);



const sockets = {
  socket: null,

  init() {
    this.socket = io('http://localhost:5000/', { transports: ['websocket'] });
    this.registerConnection();
  },

  registerConnection() {
      const connectedPromise = new Promise(resolve => {
          this.socket.on('connect', () => {
              console.log('client connected to server');
              drawMap();
              resolve();
          });
      });

      connectedPromise.then(() => {
        const syncUpdate = (update) => Game.update = update;
        this.socket.on('gameUpdate', syncUpdate);
        drawMap();
      });
 
  },
};


sockets.init();

