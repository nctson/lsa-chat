var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('this is socket io server');
});

//socket io
io.on('connection', function(socket){
    console.log('a user connected:' + socket.id);
    socket.on('join-room', function(data){
        socket.join(data);
        socket.roomchat = data;

        socket.on('message',(mes)=>{
            io.sockets.in(socket.roomchat).emit('server-chat',mes);
            console.log(mes);
        });

        console.log(socket.room);
      });
    socket.on('disconnect', function(){
        console.log('user disconnected:' + socket.id);
      });
  });

//server listen port 3000
http.listen(3000, function(){
  console.log('server socket io was started...');
});