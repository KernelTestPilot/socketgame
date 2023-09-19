const express = require("express");
const cors = require('cors')


const app = express();

app.use(cors());
app.use(express.json())

const http = require('http');
const { Server } = require('socket.io'); 
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:1234/',
    methods: ['GET', 'POST'],
  },
});
app.get('/', (req, res) => {


  //testar så servern funkar, körs på 5000
  res.send('Hello world');
});


server.listen(5000, () => {
  console.log(`Server is up and running on 5000 ...`);
  
});

const gameLogic = {
  sockets: {},
  players: {},
  bullets: {},

  start () {
    setInterval(this.update.bind(this), 1000 / 60);
},

  joinGame(socket) {
      this.sockets[socket.id] = socket;
      this.players[socket.id] = {
          dx: 0, dy: 0, x: 10, y: 10,
          socketId: socket.id,
      };
    
  },
  updatePlayer({ dx, dy }, socketId) {
    const player = this.players[socketId];
    player.dx = dx;
    player.dy = dy;
},
createBullet(socketId) {
  console.log("fire!")
  const bulletId = socketId;
  this.bullets[bulletId] = {
    dx: 0, dy: 0, x: socketId.x, y: socketId.y,
  };
},
updateBullet({ dx, dy }, bulletId) {
  const bullet = this.bullets[bulletId];
  bullet.dx = dx;
  bullet.dy = dy;
},
  update() {

    Object.values(this.bullets).forEach(bullet => {
      bullet.x += bullet.dx;
      bullet.y += bullet.dy;
  });
    Object.values(this.players).forEach(player => {
        player.x += player.dx;
        player.y += player.dy;
    });

    Object.values(this.sockets).forEach(socket => {
        socket.emit('gameUpdate', this.currentState());
    });
  },
    removePlayer(sockeID) {
      delete this.sockets[sockeID];
      delete this.players[sockeID];
  },
  currentState() {
    return {
        players: this.players,
        bullets: this.bullets,
    };
},


}


io.on("connection", (socket) => {
  gameLogic.joinGame(socket)
    console.log('player connected', socket.id);
    socket.on('playerMove', (update) => {
      gameLogic.updatePlayer(update, socket.id);
      
  });
  socket.on('playerShoot', (update) => {
    gameLogic.createBullet(socket.id)
    gameLogic.updateBullet(update, socket.id);
  });
    socket.on('disconnect', () => {
      console.log("disconnected",socket.id)
      gameLogic.removePlayer(socket.id)
      socket.disconnect();
    });
  });
  
  gameLogic.start();
  

