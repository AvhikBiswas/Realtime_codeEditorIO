const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/database');
const initializeSocket = require('./socket');
const bodyParser = require('body-parser');

const port = 3030;
const app = express();
const server = http.createServer(app);


// middilwaires
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Socket
initializeSocket(server);

//test 
app.get('/', (req, res) => {
  console.log('Route hit!');
  res.send('Hello, World!');
});

server.listen(port, async () => {
  await connectDB();
  console.log('Server Running On', port);
});
