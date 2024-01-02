const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/database');
const initializeSocket = require('./socket'); // Import the new socket file

const port = 3030;

const app = express();
app.use(cors());

const server = http.createServer(app);

initializeSocket(server);

app.get('/', (req, res) => {
  console.log('Route hit!');
  res.send('Hello, World!');
});

server.listen(port, async () => {
  await connectDB();
  console.log('Server Running On', port);
});
