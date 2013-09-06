var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var Game = function (socket) {
    this.socket = socket;
    socket.on('disconnect', this.onDisconnect.bind(this));
};

util.inherits(Game, EventEmitter);

Game.prototype.onDisconnect = function () {
    this.emit('dispose');
};

Game.prototype.send = function (event, data) {
    this.socket.emit(event, data)
};

exports.Game = Game;