var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    cluster = require('cluster');

var WAITING = 0,
    STARTED = 1;

var Game = function (params) {
    this.state = WAITING;
    this.round = 0;
    this.players = [];

    setInterval(this._onTick.bind(this), 17);
};

util.inherits(Game, EventEmitter);

Game.prototype.addPlayer = function (player) {
    this.players.push(player);

    player.
            on('accelerate', this._onAccelerate.bind(this, player)).
            on('rotate', this._onRotate.bind(this, player));
};

Game.prototype.killPlayer = function (player) {
    this.players.splice(this.players.indexOf(player), 1);
};

Game.prototype._onTick = function () {
//    console.log('------ tick');

    this.players.forEach(function (p) {
        p.updatePosition();
    });

    this.emit('update', {
        players: this.players.map(function (p) { return p.toJSON(); })
    });
};

Game.prototype._onAccelerate = function (player, delta) {
    console.log('accelerate ', player.id, delta)

    player.a = delta / 100;

//    var radians = (player.angle / 180.0) * Math.PI;
//    player.y += delta * Math.sin(radians);
//    player.x += delta * Math.cos(radians);

//    this.emit('update', player.toJSON());
};

Game.prototype._onRotate = function (player, delta) {
    player.angle += delta;

//    this.emit('update', player.toJSON());
};

exports.Game = Game;