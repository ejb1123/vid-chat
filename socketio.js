var sio = require('socket.io');

function removecurrentUser(wsid, users) {
  for (let index = 0; index < users.length; index++) {
    const element = users[index];
    if (element.wsid == wsid) {
      users.splice(index, 1);
    }
  }
  return users;
}

module.exports = function (server) {
  var io = sio.listen(server);

  users = [];
  io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('requestusers', (fn) => {
      let nusers = users.slice();
      
      nusers = removecurrentUser(socket.id,nusers);
      console.log(nusers)
      fn(JSON.stringify(nusers));
    });

    socket.on('joinroom', (User) => {
      user = JSON.parse(User);
      users.push(user);
      console.log("new id " + user.peerid);
      socket.emit("joinsuccess");
    });

    socket.on("disconnect", () => {
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        if (user.wsid == socket.id) {
          console.log("removing " + socket.id);
          users.splice(index, 1);
        }
      }
    });
    socket.on('requestuserdata', (peerid,fn) => {
      console.log("requesting data");
      for (let index = 0; index < users.length; index++) {
        const user = users[index];
        if (user.peerid == peerid) {
          fn(JSON.stringify(user));
        }

      }
    });
    socket.on('callme', (user) => {
      luser = JSON.parse(user);
      console.log(`call user ${luser.peerid}`);
      socket.broadcast.emit('calluser', luser.peerid);
    });

  });
}