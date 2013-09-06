var Server = function () {
}

Server.prototype = {
    constructor: Server,


    addPlayer: function (socket) {
        console.log('new player added!')
    }
}

exports.createServer = function () {
    return new Server();
}


