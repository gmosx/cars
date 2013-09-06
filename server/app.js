var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)
    , gameServer = require('./game_server');

server.listen(8000);

app.use(express.static(__dirname+'/../public'));


io.sockets.on('connection', function (socket) {
   server.addPlayer(socket)
});

