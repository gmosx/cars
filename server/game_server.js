var Player = require('./player').Player,
    Observer = require('./observer').Observer;


var Server = function () {
}

Server.prototype = {
    constructor: Server,
    players: [],
    observers: [],

    addPlayer: function (socket) {
        var player = new Player(socket);
        this.players.push(player);
        player.on('dispose', this.killPlayer.bind(this, player));
        console.log('new player added! Number of players:', this.players.length);
    },

    killPlayer: function (player) {
        this.players.splice(this.players.indexOf(player), 1);
        console.log('Player killed. Number of players:', this.players.length);
    },

    addObserver: function (socket) {
        var observer = new Observer(socket);
        this.observers.push(observer);
        observer.on('dispose', this.killObserver.bind(this, observer));
        console.log('new observer added! Number of observers:', this.observers.length);
    },

    killObserver: function (observer) {
        this.observers.splice(this.observers.indexOf(observer), 1);
        console.log('Observer killed. Number of observers:', this.observers.length);
    },

}

exports.createServer = function () {
    return new Server();
}


