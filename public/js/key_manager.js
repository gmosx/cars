var KeyManager = function (params) {
    this._bindEvents();
};

KeyManager.prototype._bindEvents = function () {
    $(document.body).
            on('keydown', this._onKeyDown.bind(this));
            on('keyup', this._onKeyUp.bind(this));
};

KeyManager.prototype._onKeyDown = function () {
};

KeyManager.prototype._onKeyUp = function () {
};

exports.KeyManager = KeyManager;