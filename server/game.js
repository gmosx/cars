var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var Game = function (params) {
};

util.inherits(Game, EventEmitter);

Game.prototype.addPlayer = function (player) {
    player.
            on('accelerate', this._onAccelerate.bind(this, player)).
            on('rotate', this._onRotate.bind(this, player));
};

Game.prototype._onAccelerate = function (player, delta) {
    var radians = (player.angle / 180.0) * Math.PI;
    player.y += delta * Math.sin(radians);
    player.x += delta * Math.cos(radians);

    this.emit('update', {x: player.x, y: player.y, angle: player.angle});
};

Game.prototype._onRotate = function (player, delta) {
    console.log('!!!!!!!!!2231312312');
    player.angle += delta;

    this.emit('update', {x: player.x, y: player.y, angle: player.angle});
};

exports.Game = Game;