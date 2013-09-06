var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var Observer = function (socket) {
    this.socket = socket;
    socket.on('disconnect', this.onDisconnect.bind(this));
};

util.inherits(Observer, EventEmitter);

Observer.prototype.onDisconnect = function () {
    this.emit('dispose');
};

exports.Observer = Observer;