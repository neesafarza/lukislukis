const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const users = [];

io.on('connection', (socket) => {

  socket.emit('connection', socket.id);
  // socket.broadcast.emit('connection', 'client connected');

  socket.on('save', (msg) => {
    socket.broadcast.emit('saving', msg);

  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


http.listen(4000, () => {
  console.log('listening on *:4000');
});