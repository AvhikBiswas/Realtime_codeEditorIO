
const { Server } = require('socket.io');

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);

    socket.on('join_room', (data) => {
      const { room } = data;
      socket.join(room);
      console.log(`User ${socket.id} connected to room ${room}`);
    });

    socket.on('update_code', (data) => {
      const { room, code } = data;
      console.log('code is', code);
      io.to(room).emit('receive_update', code);
    });
  });
}

module.exports = initializeSocket;
