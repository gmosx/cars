var app = require('express')()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)
    , Player = require('player');

server.listen(80);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {

});

