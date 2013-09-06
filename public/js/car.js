/**
 * @param params
 * @constructor
 */
var Car = function (params) {
    this.$host = $('<div class="car"></div>');
    this.x = undefined;
    this.y = undefined;
    this.angle = 0; // angle in degrees.
};

Car.prototype.update = function () {
    this.$host.css({
       top: this.y,
       left: this.x,
       transform: 'rotate(' + this.angle + 'deg)'
    });
};

Car.prototype.append = function ($container) {
    $($container).append(this.$host);
    this.update();
};

Car.prototype.remove = function () {
};

//Object.defineProperties(Car.prototype, {
//    'delta': {
//        get: function () {
//            return (this.angle / 180.0) * Math.PI;
//        }
//    }
//});

Car.prototype.move = function (delta) {
    var radians = (this.angle / 180.0) * Math.PI;

    this.y += delta * Math.sin(radians);
    this.x += delta * Math.cos(radians);
};

exports.Car = Car;