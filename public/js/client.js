/**
 * @constructor
 */
var Client = function () {

};

Client.prototype.start = function () {
    var socket = io.connect(window.location.hosts);

    socket.on('connect', function (data) {
        console.log('connected to server:' + data);
        socket.emit('ready', 'player');
    });

    this.controller = new Controller();
    $(this.controller).on('accelerate', this.onAccelerate.bind(this));

};

Client.prototype.onAccelerate = function (e,data) {
    $('#accel .value').text(data);
}


$(function () {
// run client
    new Client().start();
})
