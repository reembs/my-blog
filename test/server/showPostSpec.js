var expect = require('expect.js');
var request = require('supertest');
var async = require('async')

var appCtor = require('../../app.js').app;
var start = require('../../app.js').start;

var db, app, server;

describe("Get single post API", function() {
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

    it("should retrieve post accurately from DB", function(done) {
        var post = {
            author: "test@test.com",
            title: "Title",
            content: "Some content..."
        };

        db.addPost(post, function(e, res) {
            request(app)
                .get('/api/show/' + res[0]._id)
                .end(function(e, res) {
                    expect(res.body.author).to.eql(post.author);
                    expect(res.body.title).to.eql(post.title);
                    expect(res.body.content).to.eql(post.content);
                    expect(res.body.created_at).not.to.be(undefined);
                    expect(res.body._id).not.to.be(undefined);
                    done();
                });
        });
    });
});