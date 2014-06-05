/**
 * Angular service that returns a resource for the blog API. All requests go through here.
 */

'use strict';

angular.module('myBlogApp')
    .factory('BlogApi', function ($resource) {
        var apiResource = $resource('/api/:operation/:id',
            {
                operation: '@operation',
                id: '@id'
            }, {
                add: {
                    method: 'POST',
                    params: {
                        operation: "post"
                    }
                },
                list: {
                    method: 'GET',
                    params: {
                        operation: "list"
                    }
                },
                show: {
                    method: 'GET',
                    params: {
                        operation: "show"
                    }
                }
            });

        return {
            /**
             * Return a paged list of posts
             * @param page the desired page
             * @param cb the callback to be called with page data as param
             */
            getPosts: function (page, cb) {
                apiResource.list({
                    page: page
                }, cb);
            },
            /**
             * Get a single post from the server
             * @param id the desired post's ID
             * @param cb the callback to be passed the post object
             */
            getPost: function (id, cb) {
                apiResource.show({
                    id: id
                }, cb);
            },
            /**
             * Add a new post to the blog
             * @param author
             * @param title
             * @param content
             */
            addPost: function (author, title, content) {
                apiResource.add({}, {
                    author: author,
                    title: title,
                    content: content
                });
            }
        }
    });