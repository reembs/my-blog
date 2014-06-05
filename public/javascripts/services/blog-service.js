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
            getPosts: function (page, cb) {
                return apiResource.list({
                    page: page
                }, cb);
            },
            getPost: function (id, cb) {
                return apiResource.show({
                    id: id
                }, cb);
            },
            addPost: function (author, title, content) {
                apiResource.add({}, {
                    author: author,
                    title: title,
                    content: content
                });
            }
        }
    });