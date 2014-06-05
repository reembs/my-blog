var expect = require('expect.js');
var request = require('supertest');
var async = require('async')

var server;

describe("Get single post API", function() {
    before(function (done) {
        server = require('../test-server')(function(testServer) {
            server = testServer;
            done();
        });
    });

    after(function() {
        server.stop();
    });

    it("should retrieve post accurately from DB", function(done) {
        var post = {
            author: "test@test.com",
            title: "Title",
            content: "Some content..."
        };

        server.db.addPost(post, function(e, res) {
            request(server.app)
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