var MongoClient = require('mongodb').MongoClient;
var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var ObjectID = require('mongodb').ObjectID;

var POSTS_PER_PAGE = 10;

/**
 * Constructor for the blog data provider
 * @constructor
 */
BlogProvider = function (host, port, db, cb) {
    var mongoClient = new MongoClient(new Server(host, port));

    var that = this;

    mongoClient.open(function(err, mongoClient) {
        that.db = mongoClient.db(db);
        cb();
    });
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
                        .sort({created_at: -1}) // reverse date sort
                        .limit(POSTS_PER_PAGE) // limit the number of posts per page
                        .skip((page - 1) * POSTS_PER_PAGE) // skip to desired page
                        .toArray(function (error, results) {
                            if (error) callback(error);
                            else callback(null, {
                                pages: count < POSTS_PER_PAGE ? 1 : Math.ceil(count / POSTS_PER_PAGE),
                                currentPage: page,
                                posts: results
                            });
                        });
                });
        }
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