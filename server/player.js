var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var availableCars = [1, 2, 3, 4, 5];
var id = 0;

var Player = function (socket) {
    this.socket = socket;

    this.id = id++;
    this.carNumber = availableCars.shift();
    this.x = 300;
    this.y = 50 + (this.carNumber - 1) * 30;
    this.angle = 0; // angle in degrees.
    this.v = 0; // speed
    this.a = 0; // acceleration

    this.isBraking = false;

    socket.on('disconnect', this.onDisconnect.bind(this));
    socket.on('accelerate', this.onAccelerate.bind(this));
    socket.on('brake', this.onBrake.bind(this));
    socket.on('rotate', this.onRotate.bind(this));
};

util.inherits(Player, EventEmitter);

Player.prototype.onDisconnect = function () {
    availableCars.push(this.carNumber);
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
        x: this.body.m_position.x,
        y: this.body.m_position.y,
        carNumber: this.carNumber,
        angle: this.body.m_rotation * 180 / Math.PI
    };
};

exports.Player = Player;