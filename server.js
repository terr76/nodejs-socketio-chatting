var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// set respond to client.html from the all request
app.get('/',function(req, res){
  res.sendFile(__dirname + '/client.html');
});

var count=1; // to change user number
io.on('connection', function(socket){
  // print out socket.id in console and emit even as change name
  // when user connected
  console.log('user connected: ', socket.id);
  var name = "user" + count++;
  io.to(socket.id).emit('change name',name);

  // print out socket.id in console when user disconnect
  socket.on('disconnect', function(){
    console.log('user disconnected: ', socket.id);
  });

  // print out message in console and send message with
  // user name&message as parameter to the client browser
  socket.on('send message', function(name,text){
    var msg = name + ' : ' + text;
    console.log(msg);
    io.emit('receive message', msg); // All client receive msg via io.emit
  });
});

http.listen(3000, function(){
  console.log('server on!');
});
