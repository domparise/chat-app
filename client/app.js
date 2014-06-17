module.exports = function (app) {

    app.use(require('body-parser')());
    app.set('views',__dirname);
    app.set('view engine','jade');

    app.get('/style.css', function (req, res) {
        res.sendfile(__dirname+'/style.css');
    });
    app.get('/client.js', function (req, res) {
        res.sendfile(__dirname+'/client.js');
    });

};