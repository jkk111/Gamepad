var express = require("express");
var app = express();
var http = require("http");
var server = http.createServer(app);
server.listen(80);
app.use(express.static("static/"))
var io = require("socket.io")(server);
var ffmpeg = require("fluent-ffmpeg");
// var vid = ffmpeg("/dev/video0")
// .save("test.mp4").on("start", function() {
//   console.log("Started capturing video stream", arguments);
// }).on("error", function() {
//   console.error("Broke", arguments);
// }).on("end", function() {
//   console.info("End of stream");
// })
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
  socket.on("disconnect", function() {
    console.info("Socket disconnected cleaning up!");
  })
});


function send(data) {
  // TODO (jkk111): Implement this.
}

function cleanUp() {
  console.log("Cleaning ffmpeg");
  vid.kill();
  process.exit();
}

process.on("SIGKILL", cleanUp)
process.on("SIGTERM", cleanUp)
process.on("SIGTERM", cleanUp)
