var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('express-error-handler');
var debug = require('debug')('my-blog-app');

/**
 * Initialize express app with DB
 * @param db {BlogProvider} instance
 * @returns Express app object instance
 */
module.exports.app = function (db) {
    var app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade'); // view engine not needed, haven't figured out how to remove

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    switch (process.env.NODE_ENV) {
        case 'production':
            app.use(errorHandler());
        default:
            app.use(errorHandler({ dumpExceptions: true, showStack: true }));
    }

    var routes = require('./routes/blog')(db);
    app.use('/api', routes);

    // public dir will contains all artifacts, statically served
    app.use(express.static(path.join(__dirname, 'public')));

    app.use(function (req, res, next) {
        // this is the only HTML we serve, used here to be the fallback content in unknown URL paths
        res.sendfile('views/index.html');
    });

    return app;
};

/**
 * Start the server after all initialization has ran
 * @param app the express app instance
 * @param done callback
 * @returns express {http.Server} object
 */
module.exports.start = function (app, done) {
    var server = app.listen(app.get('port'), function () {
        debug('Express server listening on port ' + server.address().port);
        done();
    });
    return server;
};
