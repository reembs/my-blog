var expect = require('expect.js');
var request = require('supertest');
var async = require('async')

var appCtor = require('../../app.js').app;
var start = require('../../app.js').start;

var db, app, server;

describe("Post adding API", function() {
    before(function (done) {
        var BlogProvider = require('../../data/blogProvider').BlogProvider;
        db = new BlogProvider('localhost', 27017, 'my-blog-test', function() {
            db.clear(function() {
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

    it("Calling add API should correctly save the post to DB", function(done) {
        request(app)
            .post('/api/post')
            .send({author: "some@email.com", title: "title", content: "content"})
            .end(function(e, res) {
                expect(res.status).to.eql(201);
                db.getPosts(1, function (e, postData) {
                    expect(postData.posts.length).to.eql(1);
                    expect(postData.posts[0].content).to.eql("content");
                    expect(postData.posts[0].title).to.eql("title");
                    expect(postData.posts[0].author).to.eql("some@email.com");
                    done();
                });
            });
    });
});