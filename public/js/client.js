/**
 * @constructor
 */
var Client = function () {
};

Client.prototype.start = function () {
    var socket = io.connect('http://localhost:8000');

    socket.on('connect', function (data) {
        console.log('connected to server:' + data);
        socket.emit('ready','player');
    });
};

// run client
new Client().start();
