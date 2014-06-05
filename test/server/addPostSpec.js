var expect = require('expect.js');
var request = require('supertest');
var async = require('async')

var server;

describe("Post adding API", function() {
    before(function (done) {
        server = require('../test-server')(function(testServer) {
            server = testServer;
            done();
        });
    });

    after(function() {
        server.stop();
    });

    it("Calling add API should correctly save the post to DB", function(done) {
        request(server.app)
            .post('/api/post')
            .send({author: "some@email.com", title: "title", content: "content"})
            .end(function(e, res) {
                expect(res.status).to.eql(201);
                server.db.getPosts(1, function (e, postData) {
                    expect(postData.posts.length).to.eql(1);
                    expect(postData.posts[0].content).to.eql("content");
                    expect(postData.posts[0].title).to.eql("title");
                    expect(postData.posts[0].author).to.eql("some@email.com");
                    done();
                });
            });
    });
});