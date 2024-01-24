const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/database.js');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const Api_Routes = require('./routes/index');
const mongoose = require('mongoose');
const { compile } = require('./service/compile_service.js');

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
    const { ownName, roomId } = data;
    console.log(`---------own name -----> ${ownName}`);
    socket.join(roomId);
    console.log(`User ${ownName} joined room ${roomId}`);
    socket.to(roomId).emit('JOINED', { Ownname: ownName, room: roomId });
  });

  socket.on('SYNC_CODE', (data) => {
    const { code, roomId } = data;
    console.log(`from sync_code roomid and code ${roomId} in room ${code}`);
    io.to(roomId).emit('CODE_CHANGE', { code });
  });

  socket.on('CODE_CHANGE', (data) => {
    const { code, roomId } = data;
    console.log(`from code_change roomid and code ${roomId} in room ${code}`);
    socket.in(roomId).emit('CODE_CHANGE', { code });
  });

  socket.on('RUN', async (data) => {
    const { code, roomId,input } = data;
    console.log(`Received RUN event for roomId ${code}`);
    const res = await compile(code,input);
    console.log('Response from compile:', res);
    io.to(roomId).emit('RUNED', { code: res });
  });
  

  socket.on('DISCONNECTING', (data) => {
    const { ownName, roomId } = data;
    socket.to(roomId).emit('DISCONNECTED', { Ownname: ownName, room: roomId });
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
