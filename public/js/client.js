/**
 * @constructor
 */
var Client = function () {
};

Client.prototype.start = function () {
    this.socket = socket = io.connect(window.location.hosts);

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

    this.$playfield = $(document.body); // TODO: temp!

    this.car = new Car();
    this.car.x = 100;
    this.car.y = 200;

    this.car.append(this.$playfield);
};

Client.prototype.onAccelerate = function (e,data) {
    this.car.move(data);
    this.car.update();
    socket.emit('accelerate', data);
};

Client.prototype.onBrake = function (e) {
    socket.emit('break');
};

Client.prototype.onRotate = function (e, data) {
    this.car.angle += data;
    this.car.update();
};

$(function () {
    new Client().start();
});
