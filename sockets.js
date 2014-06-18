/*
    Dom Parise - 6/17/14 - chat app 
    sockets.js

    This file encapsulates all of the socket.io event handling logic
*/
module.exports = function (io, clients, messages) {
    io.on('connection', function (socket) {

        // join notification
        socket.on('join', function (data) { // i use this event, rather than .on('connect'), so I can bind username to socket
            socket.broadcast.emit('join',data);
            clients[data.user] = socket; // keep track of currently connected users
            socket.user = data.user; // also add the username to the socket for private messages and disconnects
        });

        // leave notification
        socket.on('disconnect', function () {
            socket.broadcast.emit('leave', { user:socket.user });
            delete clients[socket.user];
        });

        // public message
        socket.on('msg', function (data) {
            messages.newMsg(data, function () { // save the message to the database
                socket.broadcast.emit('msg', data);
            });
        });

        // private message
        socket.on('msgTo', function (data) { // note, private messages are not stored in database
            clients[data.to].emit('msgFrom', data); // send directly to the user specified in the request
        });


    });
};