var io = require('socket.io').io,
    Player = require('./player').Player;

/**
 * @param params
 * @constructor
 */
var ViewApp = function (params) {
    this.players = {};
    this.racersList = {};
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
    this.$racers = $('#racers');

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
    this.addRacer(player);
};

ViewApp.prototype._onKillPlayer = function (data) {
    var player = this.players[data.id];
    if (player) player.remove();
    delete this.players[data.id];
    this.removeRacer(player);
};

ViewApp.prototype._onGameUpdate = function (data) {
    var player = this.players[data.id];
    player.x = data.x;
    player.y = data.y;
    player.angle = data.angle;
    player.update();
};

ViewApp.prototype.addRacer = function (player) {
    var $racer = $('<div class="racer"></div>').appendTo(this.$racers);

    $racer.wheel = $('<span class="steering-wheel"/>').appendTo($racer);
    $racer.name = $('<span class="name"/>').text('Player '+ player.id).appendTo($racer);

    this.racersList[player.id] = $racer;
};

ViewApp.prototype.removeRacer = function (player) {
    var $racer = this.racersList[player.id];
    if (!$racer) return;
    $racer.remove();
    delete this.racersList[player.id];
};

ViewApp.prototype.updateRacer = function (id) {
};


exports.ViewApp = ViewApp;