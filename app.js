/*
    Dom Parise - 6/17/14 - chat app 
    app.js

    This file is the main server file to host express and socket.io
*/
var app = require('express')(), // express for dynamic page rendering
    srv = require('http').Server(app), // passed to socket.io so it can listen on same port as express
    db = require('./db.js'); // mongoDB client

srv.listen(3000);

require('./client/app_init.js')(app); // hide away the express boilerplate to render the client code

var clients = {}; // associative array of clients kept in memory; ideally this would be redis or a similar key-value store

// serve the index page, which acts as an entry point into the chat client
app.get('/', function (req, res) {
    res.render('index', { users:Object.keys(clients) }); // connected users from this entry page
});

db.init( function (messages) { // connect mongodb, then clear out and return the 'messages' collection

    // serve up the chat client, to get here, one must 'log in' by joining as a user
    app.post('/', function (req, res) {
        var user = req.body.user;
        while ( clients[user] ) user += Math.floor(Math.random()*1000); // add random 3 integers to name if it already exists
        messages.loadMsgs( function (msgs) { // load all the messages previously logged this session
            res.render('client', { usr:user, msgs:msgs, users:Object.keys(clients) });
        });
    });

    // to keep the code clean, the socket.io events are handled in 'socket.js'
    require('./sockets.js')( require('socket.io')(srv), clients, messages ); // pass along the variables we need and instantiate a socket.io object

});
