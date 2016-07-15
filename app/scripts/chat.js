var socket = io();
socket.emit('comment added', {user: 'rahul', message:'is online'});

socket.on('notify everyone', function(data){
  notifyMe(data);
})