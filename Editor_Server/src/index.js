const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/database.js');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const Api_Routes = require('./routes/index');
const  mongoose  = require('mongoose');

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
    const { room } = data;
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on('update_code', (data) => {
    const { room, code } = data;
    console.log(`Received code update from ${socket.id} in room ${room}`);
    io.to(room).emit('receive_update', { code });
  });

  // sync_code And New User

  socket.on('New_clint', (data) => {
    const { room } = data;
    socket.broadcast.to(room).emit('New_user',{room});
  })

  socket.on('sync_code',(data)=>{
    const { code,room } = data;
    console.log(`from sync_code roomid and  code ${room} in room ${code}`);
    io.to(room).emit('updated_code', { code });
  })



  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
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