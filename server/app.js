var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    gameServer = require('./game_server').createServer();

server.listen(8000);

app.use(express.static(__dirname + '/../public'));

io.set('log level', 1)
io.sockets.on('connection', function (socket) {
    socket.on('ready', function (type) {
//        console.log(type)
        if (type == 'player') {
            gameServer.addPlayer(socket)
        } else {
            gameServer.addObserver(socket)
        }
    })
});

