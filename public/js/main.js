var io = require('socket.io').io;

/**
 * @param params
 * @constructor
 */
var ViewApp = function (params) {
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

    this.$playfield = $(document.body); // TODO: temp!

    this._bindEvents();
    this._connect();

    this.car = new Car();
    this.car.x = 100;
    this.car.y = 100;

    this.car.append(this.$playfield);
};

ViewApp.prototype._bindEvents = function () {
};

ViewApp.prototype._connect = function () {
    var socket = io.connect();

    socket.on('connect', function (data) {
        console.log('connected to server:' + data);
        socket.emit('ready','observer');
    });

    socket.on('player-connect', function (data) {
        document.getElementById("playerNum").innerText = data;
    });

    socket.on('player-disconnect', function (data) {
        document.getElementById("playerNum").innerText = data;
    });

    socket.on('gameUpdate', function (data) {
        this.car.x = data.x;
        this.car.y = data.y;
        this.car.angle = data.angle;
        this.car.update();
    }.bind(this));
};

exports.ViewApp = ViewApp;