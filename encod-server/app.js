const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const roomLookup = {};
require("dotenv").config();
const port = process.env.PORT || 4000;

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

const cors = require("cors");
const { join } = require("path");
app.use(cors({
  origin:"*"
}))



server.listen(port, function(){
  console.log("listening in port ", port)
})

io.on('connection', function(client){
  console.log("new connection")
  
  client.on("message", broadcastData)
  client.on("createNewRoom", createNewRoom)
  client.on("joinExistingRoom", joinExistingRoom)
  
  function broadcastData(data){
    console.log("data from the client ", data )
    client.broadcast.emit(`message-${data.groupId}`, data.value)
    
  }
  
  function createNewRoom(){
    var newRoomID = makeNewRoomID();
    roomLookup[client.id] = newRoomID;
  }
  
})




