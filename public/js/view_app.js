var io = require('socket.io').io,
    Player = require('./player').Player;

/**
 * @param params
 * @constructor
 */
var ViewApp = function (params) {
    this.players = {};
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
    var socket = io.connect();

    socket.on('connect', function (data) {
        console.log('connected to server:' + data);
        socket.emit('ready','observer');
    });

    socket.on('addPlayer', function (data) {
        console.info('addPlayer', arguments);


        var player = new Player(data);
        player.append(this.$playfield);
        this.players[player.id] = player;
    }.bind(this));

    socket.on('killPlayer', function (data) {
        console.info('killPlayer', arguments);
    });

    socket.on('playerAction', function (data) {
//        console.info('playerAction', arguments);
    });

    socket.on('gameUpdate', function (data) {
        console.log('gameUpdate', arguments);
        var player = this.players[data.id];
        player.x = data.x;
        player.y = data.y;
        player.angle = data.angle;
        player.update();
    }.bind(this));
};

exports.ViewApp = ViewApp;