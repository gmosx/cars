var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var id = 0;

var Player = function (socket) {
    this.socket = socket;
    this.id = id++;

    this.x = 390;
    this.y = 100;
    this.angle = 0; // angle in degrees.

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
    this.emit('action', {type: 'accelerate', value: data});
};

Player.prototype.onBrake = function (data) {
    this.emit('brake');
    this.emit('action', {type: 'brake', value: data});
};

Player.prototype.onRotate = function (data) {
    this.emit('rotate', data);
    this.emit('action', {type: 'rotate', value: data});
};

Player.prototype.toJSON = function () {
    return {
        id: this.id,
        x: this.x,
        y: this.y,
        angle: this.angle
    };
};

exports.Player = Player;