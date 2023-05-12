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
  coins: [],

  start () {
    setInterval(this.update.bind(this), 1000 / 60);
},

  joinGame(socket) {
      this.sockets[socket.id] = socket;
      this.players[socket.id] = {
          dx: 0, dy: 0, x: 10, y: 10,
          socketId: socket.id,
      };
      console.log(this.players)
  },
  updatePlayer({ dx, dy }, socketId) {
    const player = this.players[socketId];
    player.dx = dx;
    player.dy = dy;
},
  update() {
  
    Object.values(this.players).forEach(player => {
        player.x += player.dx;
        player.y += player.dy;
    });

    Object.values(this.sockets).forEach(socket => {
        socket.emit('gameUpdate', this.currentState());
    });
  },
  currentState() {
    return {
        players: this.players,
    };
},


}


io.on("connection", (socket) => {
  gameLogic.joinGame(socket)
    console.log('player connected', socket.id);
  });
  gameLogic.start();
  

