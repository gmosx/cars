var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var Player = function (socket) {
    this.socket = socket;
    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('accelerate', this.onAccelerate.bind(this));
    socket.on('brake', this.onBrake.bind(this));
    socket.on('rotate', this.onRotate.bind(this));
};

util.inherits(Player, EventEmitter);

Player.prototype.onDisconnect = function () {
    this.emit('dispose');
};

Player.prototype.onAccelerate = function (data) {
    this.emit('accelerate', data);
};

Player.prototype.onBrake = function () {
    this.emit('brake');
};

Player.prototype.onRotate = function (data) {
    this.emit('rotate', data);
};

exports.Player = Player;