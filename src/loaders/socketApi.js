const socket_io = require('socket.io');

const io = socket_io();
const socketApi = {};

socketApi.io = io;

io.on('connection', function (socket) {
  console.log('connection');

  socket.on('login', function (data) {
    console.log('login');
  });
  socket.on('disconnect', function () {
    console.log('disconnect');
  });
});

module.exports = socketApi;
