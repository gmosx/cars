var io = require('socket.io').io;

/**
 * @param params
 * @constructor
 */
var ViewApp = function (params) {
};

ViewApp.prototype.start = function () {
    var socket = io.connect('http://localhost:8000');

    socket.on('connect', function (data) {
        console.log('connected to server:' + data);
    });
};

exports.ViewApp = ViewApp;