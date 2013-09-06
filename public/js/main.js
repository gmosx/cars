var io = require('socket.io').io;

/**
 * @param params
 * @constructor
 */
var ViewApp = function (params) {
};

ViewApp.prototype.start = function () {
    new QRCode(document.getElementById("qrCode"), {
        text: window.location.host+'/player.html',
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff"//,
//        correctLevel : QRCode.CorrectLevel.H
    });

    this.$playfield = $(document.body); // TODO: temp!

    this._bindEvents();
    this._connect();

    this.car = new Car();
    this.car.x = 100;
    this.car.y = 200;

    this.car.append(this.$playfield);
};

ViewApp.prototype._bindEvents = function () {
    this.$playfield.on('keydown', this._onKeyDown.bind(this));
};

ViewApp.prototype._connect = function () {
    var socket = io.connect('http://localhost:8000');

    socket.on('connect', function (data) {
        console.log('connected to server:' + data);
    });
};

ViewApp.prototype._onKeyDown = function (e) {
    var handled = false;

    switch (e.keyCode) {
        case 38: // UP
            this.car.move(5);
            handled = true;
            break;

        case 40: // DOWN
            this.car.move(-5);
            handled = true;
            break;

        case 39: // LEFT
            this.car.angle += 1;
            handled = true;
            break;

        case 37: // RIGHT
            this.car.angle -= 1;
            handled = true;
            break;
    }

    if (handled) {
        this.car.update();
        e.preventDefault();
        e.stopPropagation();
    }
};

exports.ViewApp = ViewApp;