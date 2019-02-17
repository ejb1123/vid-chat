var sio = require('socket.io');

module.exports = function(server){
  var io = sio.listen(server); 

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('newid',(name)=>{
    console.log("new id " + name);
    socket.broadcast.emit("incomingnewid",name);
  });
  socket.on('hello',function(peerid){
    Users.push({
      id:peerid,
      wsid:null
    });
    console.log("user "+ peerid +" added");
    if(Users.length!=1)
      socket.emit('addexistingpeers',Users);
  });
});
}