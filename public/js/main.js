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

    var socket = io.connect('http://localhost:8000');

    socket.on('connect', function (data) {
        console.log('connected to server:' + data);
        socket.emit('ready','observer');
    });

    socket.on('player-connect', function (data) {
        document.getElementById("playerNum").innerText = data;
    })

    socket.on('player-disconnect', function (data) {
        document.getElementById("playerNum").innerText = data;
    })
};

exports.ViewApp = ViewApp;