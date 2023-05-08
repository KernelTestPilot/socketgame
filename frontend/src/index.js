import "./styles.css";
import * as PIXI from "pixi.js";
import { player } from "./playerClass";
import io from 'socket.io-client';

let currentPlayers = [];

  const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
  });

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
  document.body.appendChild(app.view);

