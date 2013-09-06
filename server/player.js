var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var Player = function (socket) {
    this.socket = socket;
    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('accelerate', this.onAccelerate.bind(this));
    socket.on('brake', this.onBrake.bind(this));
    socket.on('turn-right', this.onTurnRight.bind(this));
    socket.on('turn-left', this.onTurnLeft.bind(this));
};

util.inherits(Player, EventEmitter);

Player.prototype.onDisconnect = function () {
    this.emit('dispose');
};

Player.prototype.onAccelerate = function () {
    this.emit('accelerate');
}

Player.prototype.onBrake = function () {
    this.emit('brake');
}

Player.prototype.onTurnRight = function () {
    this.emit('turn-right');
}

Player.prototype.onTurnLeft = function () {
    this.emit('turn-left');
}


exports.Player = Player;