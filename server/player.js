
var Player = function (socket) {
    this.socket = socket;
    console.log('new client connected')
};

Player.prototype = {
    constructor: Player

};