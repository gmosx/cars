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
    this.socket.emit('playerList', players.map(function (p) {
        return {
            id: p.id
        }
    }))
}

exports.Observer = Observer;