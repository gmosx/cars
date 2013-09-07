var Player = require('./player').Player,
    Observer = require('./observer').Observer,
    Game = require('./game.js').Game;

var Server = function () {
    this.game = new Game();
    this.game.on('update', this.onGameUpdate.bind(this))
};

Server.prototype = {
    constructor: Server,
    players: [],
    observers: [],

    addPlayer: function (socket) {
        var player = new Player(socket);
        player.on('dispose', this.killPlayer.bind(this, player));
        player.on('action', this.onPlayerAction.bind(this, player));
        this.game.addPlayer(player);
        this.sendToObservers('addPlayer', player.toJSON());
        console.log('new player added! Number of players:', this.game.players.length);
    },

    killPlayer: function (player) {
        this.game.killPlayer(player);
        this.sendToObservers('killPlayer', player.toJSON());
        console.log('Player killed. Number of players:', this.game.players.length);
    },

    addObserver: function (socket) {
        var observer = new Observer(socket);
        this.observers.push(observer);
        observer.sendPlayers(this.game.players);
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
//        console.log('player action: ', player.id, data);
        this.sendToObservers('playerAction', {
            id: player.id,
            action: data
        })
    },

    onGameUpdate: function (data) {
//        console.log('----------2', data);

        this.sendToObservers('gameUpdate', data);
    }
};

exports.createServer = function () {
    return new Server();
};


