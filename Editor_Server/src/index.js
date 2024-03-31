const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/database.js");
const socketIO = require("socket.io");
const bodyParser = require("body-parser");
const Api_Routes = require("./routes/index.js");
const mongoose = require("mongoose");
const { compile } = require("./service/compile_service.js");
const RemoveUser = require("./service/LeftUser_service.js");
const GetAllActiveUser_Service = require("./service/ActiveUser_service.js");
require("dotenv").config();

const port = process.env.PORT || 8000;
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
app.use(
  cors({
    origin: Client_URL,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Socket.io connection handling
io.on("connection", (socket) => {
  const removeUser = new RemoveUser();
  socket.on("join_room", (data) => {
    const { ownName, roomId } = data;
    socket.join(roomId);
    socket.ownName = ownName;
    socket.roomId = roomId;
    socket.to(roomId).emit("JOINED", {
      Ownname: ownName,
      room: roomId,
    });
  });
  socket.on("SYNC_CODE", (data) => {
    const { code, roomId } = data;
    io.to(roomId).emit("CODE_CHANGE", {
      code,
    });
  });
  socket.on("CODE_CHANGE", (data) => {
    const { code, roomId } = data;
    socket.in(roomId).emit("CODE_CHANGE", {
      code,
    });
  });
  socket.on("RUN", async (data) => {
    const { code, roomId, input } = data;
    const res = await compile(code, input);
    io.to(roomId).emit("RUNED", {
      code: res,
    });
  });
  socket.on("Left", async (data) => {
    const { ownName, roomId } = data;
    // Remove the user from the database
    await removeUser.LeftUser(data);

    // Update the list of users in the room
    io.to(roomId).emit("USERS_UPDATE", ownName);
  });
  socket.on("disconnect", async () => {
    socket.disconnected = true;
    const data = {
      ownName: socket.ownName,
      roomId: socket.roomId,
    };
    await removeUser.LeftUser(data);
    io.to(data.roomId).emit("USERS_UPDATE", data.ownName);
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
server.listen(port, async () => {
  await connectDB();
  console.log("server running on ", port);
  if (mongoose.connection.readyState !== 1) {
    return;
  }
});
