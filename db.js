/*
    Dom Parise - 6/17/14 - chat app 
    db.js

    This file encapsulates the initialization of the mongodb client  
        returning the 'messages' collection, along with a few useful methods 
*/
var MongoClient = require('mongodb').MongoClient; // native mongo client, rather than the mongoose ODM, for simplicity

exports.init = function (cb) {
    MongoClient.connect('mongodb://127.0.0.1:27017/chat-app', function(err, db) { // mongo version 2.6.1
        if(err) throw err; // I don't handle database errors for this simple app, sorry :/

        var messages = db.collection('messages');  
        
        messages.remove({}, function (err) { // empty the collection, for a fresh client when the app is restarted
            if(err) throw err;
        
            // utility method to save a msg to the collection
            messages.newMsg = function (msg, cb) {
                this.insert(msg, function (err) {
                    if(err) throw err;
                    return cb();
                })
            };
            
            // utility method to load all prior messages 
            messages.loadMsgs = function (cb) {
                this.find().toArray( function (err, res) {
                    if(err) throw err;
                    return cb(res);
                });
            };

            return cb( messages ); // collection is now initialized, pass it to application logic 
        });
    });
};
