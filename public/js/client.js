var socket = io.connect('http://localhost:8000');
socket.on('connect', function (data) {
    console.log('connected to server:' + data);
});