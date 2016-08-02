console.log(typeof status);
var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
server.listen(80);
app.use(express.static("static/"))
var io = require("socket.io")(server);

io.on("connection", function(socket) {
  // Modified version of example at: http://stackoverflow.com/questions/30570658/how-to-disconnect-all-sockets-serve-side-using-socket-io
  // Enusres we only ever have one active client
  io.sockets.sockets.forEach(function(s) {
    if(s.id != socket.id) {
      s.disconnect(true);
    }
  })
  socket.on("status", function(s) {
    console.log(s);
  });
});


function send(data) {
  // TODO (jkk111): Implement this.
}
