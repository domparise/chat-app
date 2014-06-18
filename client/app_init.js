/*
    Dom Parise - 6/17/14 - chat app 
    client/app_init.js

    express boilerplate and static file serving
*/
module.exports = function (app) {

    app.use(require('body-parser')()); // i do this to avoid unneccessary variable allocation
    app.set('views',__dirname);
    app.set('view engine','jade');

    app.get('/style.css', function (req, res) {
        res.sendfile(__dirname+'/style.css');
    });
    app.get('/client.js', function (req, res) {
        res.sendfile(__dirname+'/client.js');
    });

};