var MongoClient = require('mongodb').MongoClient;

exports.init = function (cb) {

    MongoClient.connect('mongodb://127.0.0.1:27017/chat-app', function(err, db) {
        if(err) throw err;

        var messages = db.collection('messages');
        messages.newMsg = newMessage;
        messages.loadMsgs = loadMessages;

        return cb( messages);
    });

};

function newMessage (msg, cb) {
    // assumes msg is object with fields {user, socket, text, to, datetime(unix ( Date.now() ) }
    this.insert(msg, function (err) {
        if(err) throw err;
        return cb();
    })
};

function loadMessages (cb) {
    this.find().toArray( function (err, res) {
        if(err) throw err;
        return cb(res);
    });
};
