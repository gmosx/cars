var io = require('socket.io').io,
    Player = require('./player').Player;

/**
 * @param params
 * @constructor
 */
var ViewApp = function (params) {
    this.players = {};
    this.socket = undefined;
};

ViewApp.prototype.start = function () {
    new QRCode(document.getElementById("qrCode"), {
        text: window.location.host + '/player.html',
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff"//,
//        correctLevel : QRCode.CorrectLevel.H
    });

    this.$playfield = $('#track'); // TODO: temp!

    this._bindEvents();
    this._connect();
};

ViewApp.prototype._bindEvents = function () {
};

ViewApp.prototype._connect = function () {
    this.socket = io.connect();

    this.socket.on('connect', this._onConnect.bind(this));

    this.socket.on('addPlayer', this._onAddPlayer.bind(this));

    this.socket.on('killPlayer', this._onKillPlayer.bind(this));

    this.socket.on('playerAction', function (data) {
//        console.info('playerAction', arguments);
    });

    this.socket.on('gameUpdate', this._onGameUpdate.bind(this));
};

ViewApp.prototype._onConnect = function () {
    this.socket.emit('ready','observer');
};

ViewApp.prototype._onAddPlayer = function (data) {
    var player = new Player(data);
    player.append(this.$playfield);
    this.players[player.id] = player;
};

ViewApp.prototype._onKillPlayer = function (data) {
    var player = this.players[data.id];
    if (player) player.remove();
    delete this.players[data.id];
};

ViewApp.prototype._onGameUpdate = function (data) {
    var player = this.players[data.id];
    player.x = data.x;
    player.y = data.y;
    player.angle = data.angle;
    player.update();
};

exports.ViewApp = ViewApp;