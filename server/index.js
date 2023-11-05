require("dotenv").config();

let express = require("express");
let app = express();
let cors = require("cors");
let http = require("http");
let { Server } = require("socket.io");
const { saveMessage } = require("./dbHandler");

app.use(cors()); // middleware

let server = http.createServer(app);
let port = process.env.PORT || 4000;

let io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let chatBot = "ChatBot";
let chatRoom = "";
let allUsers = [];

io.on("connection", (socket) => {
  let createdTime = Date.now();

  socket.on("join_room", (data) => {
    let { username, room } = data;
    socket.join(room);

    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: chatBot,
      createdTime,
    });

    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: chatBot,
      createdTime,
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    let chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chat_room_users", chatRoomUsers);
    socket.emit("chat_room_users", chatRoomUsers);
  });

  socket.on("send_message", async (data) => {
    io.in(data.room).emit("receive_message", data);
    try {
      await saveMessage(data);
    } catch (e) {
      console.error(e);
    }
  });
});

server.listen(port, () => `Server is running on port ${port}`);
