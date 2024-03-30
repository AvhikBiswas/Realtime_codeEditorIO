const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/database.js");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const Api_Routes = require("./routes/index");
const mongoose = require("mongoose");
const { compile } = require("./service/compile_service.js");
const RemoveUser = require("./service/LeftUser_service.js");
const GetAllActiveUser_Service = require("./service/ActiveUser_service");
require("dotenv").config();

const port = 8000;
const app = express();
const server = http.createServer(app);
const Client_URL = process.env.CLIENT_URL;
const io = socketIO(server, {
  cors: {
    origin: Client_URL,
    methods: ["GET", "POST"],
  },
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Socket.io connection handling
io.on("connection", (socket) => {
  const removeUser = new RemoveUser();

  console.log(`User connected: ${socket.id}`);
  socket.on("join_room", (data) => {
    const { ownName, roomId } = data;
    console.log(`---------own name -----> ${ownName}`);
    socket.join(roomId);
    socket.ownName = ownName;
    socket.roomId = roomId;
    console.log(`User ${ownName} joined room ${roomId}`);
    socket.to(roomId).emit("JOINED", { Ownname: ownName, room: roomId });
  });

  socket.on("SYNC_CODE", (data) => {
    const { code, roomId } = data;
    console.log(`from sync_code roomid and code ${roomId} in room ${code}`);
    io.to(roomId).emit("CODE_CHANGE", { code });
  });

  socket.on("CODE_CHANGE", (data) => {
    const { code, roomId } = data;
    console.log(`from code_change roomid and code ${roomId} in room ${code}`);
    socket.in(roomId).emit("CODE_CHANGE", { code });
  });

  socket.on("RUN", async (data) => {
    const { code, roomId, input } = data;
    console.log(`Received RUN event for roomId ${code}`);
    const res = await compile(code, input);
    console.log("Response from compile:", res);
    io.to(roomId).emit("RUNED", { code: res });
  });

  socket.on("Left", async (data) => {
    const { ownName, roomId } = data;
    console.log(`User ${ownName} left room ${roomId}`);

    // Remove the user from the database
    await removeUser.LeftUser(data);

    // Update the list of users in the room
    io.to(roomId).emit("USERS_UPDATE", ownName);
  });

  socket.on("disconnect", async () => {
    console.log(`User disconnected: ${socket.id}`);
    socket.disconnected = true;
    const data = {
      ownName: socket.ownName,
      roomId: socket.roomId,
    };
    await removeUser.LeftUser(data);
    io.to(data.roomId).emit("USERS_UPDATE", data.ownName);
    console.log("disconnected ", socket.ownName);
  });
});

// Test Route
app.get("/helth", (req, res) => {
  return res.status(200).json({
    mess: "Server Running.",
    err: false,
  });
});

// API Routes
app.use("/api", Api_Routes);

server.listen(process.env.PORT || port, async () => {
  await connectDB();
  console.log("Server Running On", port);
  if (mongoose.connection.readyState !== 1) {
    console.log("Not connected to MongoDB");
    return;
  }
});
