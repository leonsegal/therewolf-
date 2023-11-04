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

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`); // deleteme
});

server.listen(port, () => `Server is running on port ${port}`);
