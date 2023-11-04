let express = require("express");
let app = express();
let http = require("http");
let cors = require("cors");

app.use(cors());

let server = http.createServer(app);
let port = process.env.PORT || 4000;

server.listen(port, () => `Server is running on port ${port}`);
