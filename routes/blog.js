var express = require('express');
var router = express.Router();

var DB;

router.get('/list', function(req, res) {
    var page = req.query.page;
    DB.getPosts(page, function(e, result) {
        if (e) throw e;
        res.send(result);
    });
});

router.get('/show/:id', function(req, res) {
    var id = req.params.id;
    DB.getPost(id, function(e, result) {
        if (e) throw e;
        res.send(result);
    });
});

router.post('/post', function(req, res) {
    DB.addPost({
        author: req.body.author,
        title: req.body.title,
        content: req.body.content
    }, function (e, result) {
        if (e) throw e;
        res.send(201);
    });
});

module.exports = function(db) {
    DB = db;
    return router;
}
