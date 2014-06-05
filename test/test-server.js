/**
 * this is in charge of setting up the test environment with a clean DB
 */

var appCtor = require('../app.js').app;

var start = require('../app.js').start;

var BlogProvider = require('../data/blogProvider').BlogProvider;

var app, server;

module.exports = function (done) {
    var db = new BlogProvider('localhost', 27017, 'my-blog-test', function () {
        db.clear(function () {
            app = appCtor(db);
            server = start(app, function () {
                done({
                    db: db,
                    app: app,
                    stop: function () {
                        server.close();
                    }
                });
            });
        });
    });
};