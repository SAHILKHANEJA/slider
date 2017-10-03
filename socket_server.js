var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require("redis");
var client = redis.createClient({db: 4});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/slider.html');
});

app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', function(socket){
  console.log('A user connected');
  socket.on('disconnect',function(msg){
    console.log('A user disconnected');
  });
  socket.on('live',function(data){
    console.log(data);
    client.set('tab','live');
    io.emit('live',data);
  });
  socket.on('playback',function(data){
    console.log(data);
    client.set('tab','tab1');
    io.emit('playback',data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


