const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let interval;

io.on('connection', (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }

  socket.emit('connection', 'client connected');
  socket.broadcast.emit('connection', 'client connected');

  socket.on('save', (msg) => {
    socket.emit('saving', msg);
    socket.broadcast.emit('saving', msg);

  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


http.listen(4000, () => {
  console.log('listening on *:4000');
});