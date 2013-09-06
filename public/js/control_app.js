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

    this.desktopController = new DesktopController();
    $(this.desktopController).
            on('accelerate', this.onAccelerate.bind(this)).
            on('rotate', this.onRotate.bind(this));

    this.$playfield = $('#track');

    this.car = new Car();
    this.car.x = 100;
    this.car.y = 200;

    this.car.append(this.$playfield);
};

ControlApp.prototype.onAccelerate = function (e,data) {
    this.car.move(data);
    this.car.update();
    socket.emit('accelerate', data);
};

ControlApp.prototype.onBrake = function (e) {
    socket.emit('brake');
};

ControlApp.prototype.onRotate = function (e, data) {
    this.car.angle += data;
    this.car.update();
    socket.emit('rotate', data);
};

$(function () {
    new ControlApp().start();
});
