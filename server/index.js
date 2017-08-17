const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const request = require('request-promise');
const config = require('config');
const port = process.env.PORT || 8080;
io.set('transports', ['websocket']);

server.listen(port, () =>
  console.log(`listening on port ${port}`));


io.on('connection', socket => {
  const storage = {};
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on('user connect', () => {
    console.log('a user has connected');
    storage[id] ? storage[id].push(socket) : storage[id] = [socket];
    let options = {
      uri: 'http://localhost:3000/auth',
      method: 'GET'
    };

  });

  socket.on('disconnect', () => {
    console.log('a user has disconnected');
    if (storage[id] && storage[id].length <= 1) {
      delete storage[id];
    } else {
      storage[id].splice(storage[id].indexOf(socket), 1);
    }
  });
});
