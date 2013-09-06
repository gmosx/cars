/**
 * @param params
 * @constructor
 */
var Car = function (params) {
    this.$host = $('<div class="car"></div>');
    this.x = undefined;
    this.y = undefined;
    this.angle = 180; // angle in degrees.
};

Car.prototype.update = function () {
    this.$host.css({
       top: this.x,
       left: this.y,
       transform: 'rotate(' + this.angle + 'deg)'
    });
};

Car.prototype.append = function ($container) {
    $($container).append(this.$host);
    this.update();
};

Car.prototype.remove = function () {
};

exports.Car = Car;