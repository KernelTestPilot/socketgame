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

io.on("connection", (socket) => {
    console.log('player connected', socket.id);
  });


app.get('/', (req, res) => {


    //testar så servern funkar, körs på 5000
    res.send('Hello world');
  });
  

  server.listen(5000, () => {
    console.log(`Server is up and running on 5000 ...`);
    
  });