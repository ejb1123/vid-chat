var sio = require('socket.io');

module.exports = function (server) {
  var io = sio.listen(server);
  
  users=[];
  io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('joinedroom', (User) => {
      users.push(JSON.parse(User))
      socket.emit('existingUsers',JSON.stringify(users));
      console.log("new id " + JSON.parse(User).peerid);
      socket.broadcast.emit("userjoined", User);
      socket.on("disconnect",()=>{
        for (let index = 0; index < users.length; index++) {
          const user = users[index];
          if(user.wsid==socket.id){
          console.log("removing"+ socket.id);
          users.splice(index, 1);
          }
        }
      })
    });
  });
}