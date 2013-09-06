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

    this.connect();

    var $playfield = $(document.body);

    var car = new Car();
    car.x = 100;
    car.y = 200;

    car.append($playfield);
};

ViewApp.prototype.bindEvents = function () {
};

ViewApp.prototype.connect = function () {
    var socket = io.connect('http://localhost:8000');

    socket.on('connect', function (data) {
        console.log('connected to server:' + data);
    });
};

exports.ViewApp = ViewApp;