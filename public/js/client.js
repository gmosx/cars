var io = require('socket.io').io;

/**
 * @param params
 * @constructor
 */
var Client = function (params) {
};

Client.prototype.start = function () {
    var socket = io.connect('http://localhost:8000');

    socket.on('connect', function (data) {
        console.log('connected to server:' + data);
    });
};

exports.Client = Client;