var Player = require('./player').Player,
    Observer = require('./observer').Observer,
    Game = require('./game.js').Game;

var Server = function () {
    this.game = new Game({server: this});
    this.game.on('update', this.onGameUpdate.bind(this))
};

Server.prototype = {
    constructor: Server,
    players: [],
    observers: [],

    addPlayer: function (socket) {
        var player = new Player(socket);
        this.players.push(player);
        player.on('dispose', this.killPlayer.bind(this, player));
        player.on('action', this.onPlayerAction.bind(this, player));
        console.log('new player added! Number of players:', this.players.length);
        this.sendToObservers('addPlayer', player.id);
        this.game.addPlayer(player);
    },

    killPlayer: function (player) {
        this.players.splice(this.players.indexOf(player), 1);
        console.log('Player killed. Number of players:', this.players.length);
        this.sendToObservers('killPlayer', player.id);
    },

    addObserver: function (socket) {
        var observer = new Observer(socket);
        this.observers.push(observer);
        observer.sendPlayers(this.players);
        observer.on('dispose', this.killObserver.bind(this, observer));
        console.log('new observer added! Number of observers:', this.observers.length);
    },

    killObserver: function (observer) {
        this.observers.splice(this.observers.indexOf(observer), 1);
        console.log('Observer killed. Number of observers:', this.observers.length);
    },

    sendToObservers: function (event, data) {
        this.observers.forEach(function (o) {
            o.send(event, data);
        })
    },

    onPlayerAction: function (player, data) {
        this.sendToObservers('playerAction', {
            id: player.id,
            action: data
        })
    },

    onGameUpdate: function (data) {
        console.log('----------2', data);

        this.sendToObservers('gameUpdate', data);
    }
};

exports.createServer = function () {
    return new Server();
};


