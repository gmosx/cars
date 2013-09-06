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

//    this.controller = new Controller();
//    $(this.controller).on('accelerate', this.onAccelerate.bind(this));

    this.desktopController = new DesktopController();
    $(this.desktopController).
            on('accelerate', this.onAccelerate.bind(this)).
            on('brake', this.onBrake.bind(this)).
            on('left', this.onLeft.bind(this)).
            on('right', this.onRight.bind(this));

    this.$playfield = $(document.body); // TODO: temp!

    this.car = new Car();
    this.car.x = 100;
    this.car.y = 200;

    this.car.append(this.$playfield);


    requestAnimationFrame(this.onTick.bind(this));
};

Client.prototype.onAccelerate = function (e, data) {
    this.car.move(data);
    this.car.update();
};

Client.prototype.onBrake = function (e, data) {
    this.car.move(-data);
    this.car.update();
};

Client.prototype.onLeft = function (e, data) {
    this.car.angle -= data;
    this.car.update();
};

Client.prototype.onRight = function (e, data) {
    this.car.angle += data;
    this.car.update();
};

Client.prototype.onTick = function () {
//
//
//    function step(timestamp) {
//        var progress;
//        if (start === null) start = timestamp;
//        progress = timestamp - start;
//        d.style.left = Math.min(progress/10, 200) + "px";
//        if (progress < 2000) {
//            requestAnimationFrame(step);
//        }
//    }
//
//
//
};

$(function () {
// run client
    new Client().start();
});
