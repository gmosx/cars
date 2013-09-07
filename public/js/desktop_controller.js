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
            $(this).trigger('break', 1);
            e.preventDefault();
            e.stopPropagation();
            break;

        case 38: // UP
        case 40: // DOWN
        case 39: // LEFT
        case 37: // RIGHT
            this.keys[e.keyCode] = true;
            e.preventDefault();
            e.stopPropagation();
    }

    this._onKey('down');
};

DesktopController.prototype._onKeyUp = function (e) {
    switch (e.keyCode) {
        case 32: // SPACE
            $(this).trigger('break', 0);
            e.preventDefault();
            e.stopPropagation();
            break;

        case 38: // UP
        case 40: // DOWN
        case 39: // LEFT
        case 37: // RIGHT
            this.keys[e.keyCode] = false;
            e.preventDefault();
            e.stopPropagation();
    }
    this._onKey('up')
};

DesktopController.prototype._onKey = function (type) {
    if (type == 'down') {
        if (this.keys[38]) $(this).trigger('accelerate', 100);
        if (this.keys[39]) $(this).trigger('rotate', 30);
        if (this.keys[37]) $(this).trigger('rotate', -30);
    } else {
        if (!this.keys[38]) $(this).trigger('accelerate',0);
        if (!this.keys[39]) $(this).trigger('rotate', 0);
        if (!this.keys[37]) $(this).trigger('rotate', 0);

    }
};

exports.DesktopController = DesktopController;