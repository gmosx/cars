/**
 * @constructor
 */
var ControlApp = function () {
};

ControlApp.prototype.start = function () {
    this.socket = socket = io.connect();

    socket.on('connect', function (data) {
        console.log('connected to server:' + data);
        socket.emit('ready', 'player');
    });

//    this.controller = new Controller();
//    $(this.controller).on('accelerate', this.onAccelerate.bind(this));
//
    this.desktopController = new DesktopController();
    $(this.desktopController).
            on('accelerate', this.onAccelerate.bind(this)).
            on('rotate', this.onRotate.bind(this));

    this.$playfield = $('#track');

    this.player = new Player({});
    this.player.x = 100;
    this.player.y = 200;

    this.player.append(this.$playfield);
};

ControlApp.prototype.onAccelerate = function (e,data) {
    $('.value').text(data);
    this.player.move(data);
    this.player.update();
    socket.emit('accelerate', data);
};

ControlApp.prototype.onBrake = function (e) {
    socket.emit('brake');
};

ControlApp.prototype.onRotate = function (e, data) {
    this.player.angle += data;
    this.player.update();
    socket.emit('rotate', data);
};

$(function () {
    new ControlApp().start();
});
