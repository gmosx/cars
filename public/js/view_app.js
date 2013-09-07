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
        text: window.location.host + '/control_app.html',
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
    this.socket.on('playerAction', this.onPlayerAction.bind(this));
    this.socket.on('playerList', this.onPlayerList.bind(this));
    this.socket.on('gameUpdate', this._onGameUpdate.bind(this));
};

ViewApp.prototype._onConnect = function () {
    this.socket.emit('ready', 'observer');
};

ViewApp.prototype._onAddPlayer = function (data) {
    var player = new Player(data);
    player.append(this.$playfield);
    this.players[player.id] = player;
    this.addRacer(player);
};

ViewApp.prototype._onKillPlayer = function (data) {
    var player = this.players[data.id];
    if (player) {
        player.remove();
        this.removeRacer(player);
        delete this.players[data.id];
    }
};

ViewApp.prototype._onGameUpdate = function (data) {
    if (data.players !== undefined) {
        data.players.forEach(function (p) {
            var player = this.players[p.id];
            if (player) {
                player.x = p.x;
                player.y = p.y;
                player.angle = p.angle;
                player.update();
                this.updateRacer(player);
            }
        }.bind(this));
    }
};

ViewApp.prototype.addRacer = function (player) {
    var $racer = $('<div class="racer"></div>').appendTo(this.$racers);

    $racer.addClass(player.racerClassName);
    $racer.wheel = $('<span class="wheel"/>').appendTo($racer);
    $racer.name = $('<span class="name"/>').text('Player_' + player.id).appendTo($racer);
    $racer.speed = $('<span class="speed"/>').appendTo($racer);

    this.racersList[player.id] = $racer;
};

ViewApp.prototype.removeRacer = function (player) {
    var $racer = this.racersList[player.id];
    if (!$racer) return;
    $racer.remove();
    delete this.racersList[player.id];
};

ViewApp.prototype.updateRacer = function (player) {
    var $racer = this.racersList[player.id];
    $racer.speed.text(player.speed);
    $racer.wheel.css('transform', 'rotate('+ player.angle +'deg)');
};

ViewApp.prototype.onPlayerList = function (list) {
    (list || []).forEach(this._onAddPlayer, this);
    console.info('playerList', arguments);
};

ViewApp.prototype.onPlayerAction = function () {
    console.info('playerAction', arguments);
};


exports.ViewApp = ViewApp;