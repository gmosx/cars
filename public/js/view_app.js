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

    socket.on('addPlayer', function (data) {
        console.info('addPlayer', arguments);
    });

    socket.on('killPlayer', function (data) {
        console.info('killPlayer', arguments);
    });

    socket.on('playerAction', function (data) {
//        console.info('playerAction', arguments);
    });

    socket.on('gameUpdate', function (data) {
        console.log('gameUpdate', arguments);
        this.car.x = data.x;
        this.car.y = data.y;
        this.car.angle = data.angle;
        this.car.update();
    }.bind(this));
};

exports.ViewApp = ViewApp;