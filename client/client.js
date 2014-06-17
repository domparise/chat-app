var socket = io('http://localhost');

var usr = document.getElementById('usr').innerText;
var txt = document.getElementById('txt');
var btn = document.getElementById('btn');
var users = document.getElementById('users').children;

socket.on('connect', function () {
    console.log('connected');
    socket.emit('join', { user:usr });
});

btn.addEventListener('click', function() {
    socket.emit('msg', { user:usr, msg:txt.value });
});

socket.on('join', function (data) {
    console.log(data.user);
});