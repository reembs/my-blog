var expect = require('expect.js');
var request = require('supertest');
var async = require('async')

var appCtor = require('../../app.js').app;
var start = require('../../app.js').start;

var db, app, server;

describe("Post listing API", function() {
    before(function (done) {
        var BlogProvider = require('../../data/blogProvider').BlogProvider;
        db = new BlogProvider('localhost', 27017, 'my-blog-test', function() {
            db.clear(function(e) {
                app = appCtor(db);
                server = start(app, function() {
                    done();
                });
            });
        });
    });

    after(function() {
        server.close();
    });

    it("should respond with with empty result set at first", function(done) {
        request(app)
            .get('/api/list')
            .end(function(e, res) {
                expect(res.body).to.eql({ pages: 1, currentPage: 1, posts: [] });
                done();
            });
    });

    it("should reflect posts accurately", function(done) {
        var post = {
            author: "test@test.com",
            title: "Title",
            content: "Some content..."
        };

        db.addPost(post, function() {
            request(app)
                .get('/api/list')
                .end(function(e, res) {
                    expect(res.body.posts.length).to.eql(1);
                    expect(res.body.posts[0].author).to.eql(post.author);
                    expect(res.body.posts[0].title).to.eql(post.title);
                    expect(res.body.posts[0].content).to.eql(post.content);
                    expect(res.body.posts[0].created_at).not.to.be(undefined);
                    expect(res.body.posts[0]._id).not.to.be(undefined);
                    done();
                });
        });
    });


    it("should reflect paging accurately", function(done) {
        db.clear(function() {
            var execution = [];
            var index = 0;

            for (var i = 0; i < 30; i++) {
                execution.push(function (done) {
                    var post = {
                        author: "test@test.com",
                        title: "Title " + (++index),
                        content: "Some content..."
                    };
                    db.addPost(post, function () {
                        setTimeout(function() {
                            done();
                        }, 10); // no timeout causes some of the timestamps to be equal...
                    });
                });
            }

            // add 30 posts to DB, then run the test
            async.series(execution, function () {
                request(app)
                    .get('/api/list')
                    .end(function (e, res) {
                        expect(res.body.posts.length).to.eql(10);
                        expect(res.body.posts[0].title).to.eql("Title 30");
                        expect(res.body.pages).to.eql(3);
                        expect(res.body.currentPage).to.eql(1);
                        request(app)
                            .get('/api/list')
                            .query({page: 2})
                            .end(function (e, res) {
                                expect(res.body.posts.length).to.eql(10);
                                expect(res.body.pages).to.eql(3);
                                expect(res.body.currentPage).to.eql(2);
                                expect(res.body.posts[0].title).to.eql("Title 20");
                                done();
                            });
                    });
            });
        });
    });
});