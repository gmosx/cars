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

    this.controller = new Controller();
    $(this.controller).
        on('accelerate', this.onAccelerate.bind(this)).
        on('rotate', this.onRotate.bind(this));

    this.desktopController = new DesktopController();
    $(this.desktopController).
            on('accelerate', this.onAccelerate.bind(this)).
            on('rotate', this.onRotate.bind(this)).
            on('break', this.onBrake.bind(this));

    this.$playfield = $('#track');
    this.$gas = $('#pedal_gas').on('click', this.onGasPress.bind(this));
    this.$brake = $('#pedal_brake').on('click', this.onBrakePress.bind(this));

    this.player = new Player({});
    this.player.x = 100;
    this.player.y = 200;
    this.player.append(this.$playfield);
};

ControlApp.prototype.onAccelerate = function (e,data) {
//    alert(data)
//    $('.value').text(data);
    this.player.move(data);
    this.player.update();
    setSpeed(data * 3);
    socket.emit('accelerate', data);
};

ControlApp.prototype.onBrake = function (e, data) {
    socket.emit('brake', data);
};

ControlApp.prototype.onRotate = function (e, data) {
    this.player.angle += data;
    this.player.update();
    socket.emit('rotate', data);
};

var speed = 0;
ControlApp.prototype.onGasPress = function (e) {
    console.info('Give me fucking gas!');
    setSpeed(speed++);
};

ControlApp.prototype.onBrakePress = function (e) {
    console.info('Keep calm and slow down!');
};

$(function () {
    new ControlApp().start();
});
