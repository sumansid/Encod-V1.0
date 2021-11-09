const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const roomLookup = {};
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

if (process.env.NODE_ENV === "production"){
  app.use(express.static("build"))
  app.get("*", (req, res) => {
    req.sendFile(path.resolve(__dirname, "encod-client/build", "index.html"))
  })
  
}


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
  
  
  function joinExistingRoom(){
    
  }
  
})


function makeNewRoomID() {
  var generatedRoomCode = '';
  var letters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var lettersLength = letters.length;
  for ( var i = 0; i < 6; i++ ) {
    generatedRoomCode += letters.charAt(Math.floor(Math.random() * lettersLength));
  }
  return generatedRoomCode;
}


