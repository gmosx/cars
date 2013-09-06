// TODO: extract as KeyManager.

/**
 * @param params
 * @constructor
 */
var DesktopController = function (params) {
    this._bindEvents();
    this.keys = {};
};

DesktopController.prototype._bindEvents = function () {
    $(document.body).
            on('keydown', this._onKeyDown.bind(this)).
            on('keyup', this._onKeyUp.bind(this));
};

DesktopController.prototype._onKeyDown = function (e) {
    switch (e.keyCode) {
        case 32: // SPACE
        case 38: // UP
        case 40: // DOWN
        case 39: // LEFT
        case 37: // RIGHT
            this.keys[e.keyCode] = true;
            e.preventDefault();
            e.stopPropagation();
    }

    this._onKey(e);
};

DesktopController.prototype._onKeyUp = function (e) {
    switch (e.keyCode) {
        case 32: // SPACE
        case 38: // UP
        case 40: // DOWN
        case 39: // LEFT
        case 37: // RIGHT
            this.keys[e.keyCode] = false;
            e.preventDefault();
            e.stopPropagation();
    }
};

DesktopController.prototype._onKey = function (e) {
    if (this.keys[32]) $(this).trigger('break');
    if (this.keys[38]) $(this).trigger('accelerate', 1);
    if (this.keys[40]) $(this).trigger('accelerate', -1);
    if (this.keys[39]) $(this).trigger('rotate', 3);
    if (this.keys[37]) $(this).trigger('rotate', -3);
};

exports.DesktopController = DesktopController;