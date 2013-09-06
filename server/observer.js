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

Observer.prototype.send = function (event, data) {
    this.socket.emit(event, data)
};

Observer.prototype.sendPlayers = function (players) {
    console.log('sending players list')
    this.socket.emit('playerList', players.map(function (p) {
        return p.toJSON();
    }))
};

exports.Observer = Observer;