module.exports = function (io,clients) {
    io.on('connection', function (socket) {

        socket.on('join', function (data) {
            io.emit('join',data);
            clients[data.user] = socket;
            socket.user = data.user;
        });

        socket.on('msg', function (data) {
            messages.newMsg(data, function () {
                io.emit('msg', data);
            });
        });

        socket.on('msgTo', function (data) {
            clients[data.to]
        });

        socket.on('disconnect', function () {
            io.emit('leave');
        });

    });

};