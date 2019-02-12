var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('newid',(name)=>{
//     console.log("new id " + name);
//     socket.broadcast.emit("incomingnewid",name);
//   });
// });
module.exports = router;
