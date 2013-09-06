var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var Player = function (socket) {
    this.socket = socket;
    socket.on('disconnect', this.onDisconnect.bind(this));
    console.log('new client connected')
};

util.inherits(Player, EventEmitter);

Player.prototype.onDisconnect = function () {
    this.emit('dispose');
};

exports.Player = Player;