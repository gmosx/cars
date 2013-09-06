/**
 * @param params
 * @constructor
 */
var Player = function (params) {

    this.$host = $('<div id="car"' + params.id + '" class="car"></div>');
    this.id = params.id;
    this.x = params.x;
    this.y = params.y;
    this.angle = params.angle; // angle in degrees.
};

Player.prototype.update = function () {
    this.$host.css({
       top: this.y,
       left: this.x,
       transform: 'rotate(' + this.angle + 'deg)'
    });
};

Player.prototype.append = function ($container) {
    $($container).append(this.$host);
    this.update();
};

Player.prototype.remove = function () {
    this.$host.remove();
};

//Object.defineProperties(Player.prototype, {
//    'delta': {
//        get: function () {
//            return (this.angle / 180.0) * Math.PI;
//        }
//    }
//});

Player.prototype.move = function (delta) {
    var radians = (this.angle / 180.0) * Math.PI;

    this.y += delta * Math.sin(radians);
    this.x += delta * Math.cos(radians);
};

exports.Player = Player;