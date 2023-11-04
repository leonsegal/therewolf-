let express = require("express");
let app = express();
let cors = require("cors");
let http = require("http");
let { Server } = require("socket.io");

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
  let createdTime = new Date().toLocaleTimeString();

  socket.on("join_room", (data) => {
    let { userName, room } = data;
    socket.join(room);

    socket.to(room).emit("receive_message", {
      message: `${userName} has joined the chat room`,
      userName: chatBot,
      createdTime,
    });

    socket.emit("receive_message", {
      message: `Welcome ${userName}`,
      userName: chatBot,
      createdTime,
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, userName, room });
    let chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit("chat_room_users", chatRoomUsers);
    socket.emit("chat_room_users", chatRoomUsers);
  });
});

server.listen(port, () => `Server is running on port ${port}`);
