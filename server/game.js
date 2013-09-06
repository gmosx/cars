var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var Game = function () {
};

util.inherits(Game, EventEmitter);

Game.prototype.addPlayer = function (player) {
};

exports.Game = Game;