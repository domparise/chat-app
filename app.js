var app = require('express')(),
    server = require('http').Server(app),
    // io = require('socket.io')(server),
    db = require('./db.js');

server.listen(3000, function () {
    console.log('listening on port:3000');
});

require('./client/app.js')(app);

// map username to socket object
var clients = {}; 
// ideally this would be a key-value store like redis
var users = [];

db.init( function (messages) {

    require('./sockets.js')( require('socket.io')(server), clients );

    app.get('/', function (req, res) {
        res.render('index',{users:users});
    });

    app.post('/', function (req, res) {
        var user = req.body.user;
        users.push( user );
        messages.loadMsgs( function (msgs) {
            console.log(msgs);
            res.render('client', {usr: user, msgs: msgs, users: users});
        });

    });


});

function makeValidName (name) {

};