console.log(typeof status);
var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
server.listen(80);
app.use(express.static("static/"))
var io = require("socket.io")(server);
io.on("connection", function(socket) {
  socket.on("status", function(s) {
    console.log(s);
  });
});
