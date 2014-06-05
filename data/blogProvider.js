var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

BlogProvider = function (host, port, db, cb) {
    this.db = new Db(db, new Server(host, port, {auto_reconnect: true}, {}));
    this.db.open(cb);
};


BlogProvider.prototype.getCollection = function (callback) {
    this.db.collection('posts', function (error, post_collection) {
        if (error) callback(error);
        else callback(null, post_collection);
    });
};

BlogProvider.prototype.getPost = function (id, callback) {
    this.getCollection(function (error, collection) {
        if (error) callback(error);
        else collection.findOne({_id: ObjectID.createFromHexString(id)}, callback);
    });
};

BlogProvider.prototype.getPosts = function (page, callback) {
    if (!page) page = 1;
    this.getCollection(function (error, collection) {
        if (error) callback(error);
        else {
            collection
                .find()
                .count(function (e, count) {
                    if (e) callback(e);
                    else collection
                        .find()
                        .sort({created_at: -1})
                        .limit(10)
                        .skip((page - 1) * 10)
                        .toArray(function (error, results) {
                            if (error) callback(error);
                            else callback(null, {
                                pages: count < 10 ? 1 : Math.ceil(count / 10),
                                currentPage: page,
                                posts: results
                            });
                        });
                });
        }
        ;
    });
};

BlogProvider.prototype.addPost = function (post, callback) {
    post.created_at = new Date();
    this.getCollection(function (error, collection) {
        if (error) callback(error);
        else collection.insert(post, function (e, post) {
            callback(null, post);
        });
    });
};

BlogProvider.prototype.clear = function (callback) {
    this.getCollection(function (error, collection) {
        if (error) callback(error);
        collection.remove(callback);
    });
};

exports.BlogProvider = BlogProvider;