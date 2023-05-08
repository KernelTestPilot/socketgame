import "./styles.css";
import * as PIXI from "pixi.js";
import { player } from "./playerClass";
import io from 'socket.io-client';


  const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    resolution: window.devicePixelRatio || 1,
  });

  const player1 = new player(100, 1, 'Oskar' )


app.stage.addChild(player1);




const sockets = {
  sockets: null,

  init() {
      const socketProtocol = (window.location.protocol.includes('https')) ? 'wss' : 'ws';
      this.socket = io(`${socketProtocol}://${window.location.host}`, { reconnection: false });
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
          const syncUpdate = (update) => renderer.gameUpdate = update;
          const syncMatch = (match) => renderer.match = match;
          this.socket.on('gameUpdate', syncUpdate);
          this.socket.on('match', syncMatch);
      });
  },
};

// Main initialization
sockets.init();
  document.body.appendChild(app.view);

