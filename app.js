var app = require('./config/server.js');
var server = app.listen(8080, function(){
  console.log('server on');
});

var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket){
  console.log('User connected');

  socket.on('disconnect', function() {
    console.log('User disconnected');
  });

  socket.on('msgToServer', function(data){
    socket.emit('msgForClient', {name: data.name, mensagem: data.message});

    socket.broadcast.emit('msgForClient', {name: data.name, mensagem: data.message});

  });

});
