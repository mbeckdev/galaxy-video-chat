const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'));
//app.use(express.static(__dirname + '/../../build'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

// runs everytime a client connects to our server
//   gives a socket instance for each one of them
//       you can see console.log(socket.id)
io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    // console.log(roomId, userId);
    socket.join(roomId);
    // socket.to(roomId).broadcast.emit('user-connected', userId);
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      // socket.to(roomId).broadcast.emit('user-disconnected', userId);
      socket.to(roomId).emit('user-disconnected', userId);
    });
    console.log('someone joined - roomId: ', roomId, ' userId: ', userId);
  });
});

// server.listen(3004);
// will use 3004 when testing locally, but will aslo work with heroku
server.listen(process.env.PORT || 3004);

//server.listen(PORT, ()=>{
//console.log("Connected to port:" + PORT)
//})
