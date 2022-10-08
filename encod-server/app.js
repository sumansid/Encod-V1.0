const express = require("express");
const app = express();
const http = require("http");
require("dotenv").config();

const server = http.createServer(app);
const port = process.env.PORT || 4000;

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

server.listen(port, function () {
  console.log("listening in port ", port);
});

io.on("connection", function (client) {
  console.log("new connection");

  client.on("message", broadcastData);
  client.on("createNewRoom", createNewRoom);
  client.on("joinExistingRoom", joinExistingRoom);

  function broadcastData(data) {
    console.log("data from the client ", data);
    client.broadcast.emit(`message-${data.groupId}`, data.value);
  }
});
