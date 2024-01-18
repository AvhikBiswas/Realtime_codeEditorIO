const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/database.js');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const Api_Routes = require('./routes/index');
const mongoose = require('mongoose'); // Use only one import statement for mongoose

const port = 3030;
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    const { ownName, room } = data;
    console.log('---------own name ---', ownName);
    socket.join(room);
    console.log(`User ${ownName} joined room ${room}`);
    socket.to(room).emit("JOINED", { Ownname: ownName, room });
  });

  socket.on('SYNC_CODE', (data) => {
    const { code, room } = data;
    console.log(`from sync_code roomid and code ${room} in room ${code}`);
    socket.to(room).emit('CODE_CHANGE', { code });
  });

  socket.on('CODE_CHANGE', (data) => {
    const { code, room } = data;
    console.log(`from code_change roomid and code ${room} in room ${code}`);
    socket.in(room).emit('CODE_CHANGE', { code });
  });

  socket.on('Left', (data) => {
    const { ownName, room } = data;
    io.to(room).emit("Disconnected", { Ownname: ownName, room });
  });
});

// Test Route
app.get('/', (req, res) => {
  console.log('Route hit!');
  res.send('Hello, World!');
});

// API Routes
app.use('/api', Api_Routes);

server.listen(port, async () => {
  await connectDB();
  console.log('Server Running On', port);
  if (mongoose.connection.readyState !== 1) {
    console.log('Not connected to MongoDB');
    return;
  }
});
