var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('express-error-handler');
var debug = require('debug')('my-blog-app');

module.exports.app = function(db) {
    var app = express();

// view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());

    switch(process.env.NODE_ENV){
        case 'production':
            app.use(errorHandler());
        default:
            app.use(errorHandler({ dumpExceptions: true, showStack: true }));
    }

    var routes = require('./routes/blog')(db);
    app.use('/api', routes);

    app.use(express.static(path.join(__dirname, 'public')));

    app.use(function(req, res, next) {
        res.sendfile('views/index.html');
    });

    return app;
};
module.exports.start = function(app, done) {
    var server = app.listen(app.get('port'), function() {
        debug('Express server listening on port ' + server.address().port);
        done();
    });
    return server;
};
