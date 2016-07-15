var express   = require('express'),
    app       = express(),
    http      = require('http'),
    server    = http.createServer(app),
    ios       = require('socket.io').listen(server),
    port      = process.env.PORT || 3000;


app.use(express.static(__dirname + '/app'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/');
});

server.listen(port, function(){
	console.log('Starting server on port: ' + port);
});

ios.on('connection', function(socket) {
  console.log('user is connected');
  socket.on('comment added', function(data){
    console.log(data,'data received from client');
    socket.broadcast.emit('notify everyone', {user: data.user, message: data.message});
  });
});

