'use strict';

angular.module('myBlogApp')
    .controller('ShowPostCtrl', function ($scope, $routeParams, BlogApi) {
        var id = $routeParams.id;

        var getPost = function(id) {
            BlogApi.getPost(id, function (post) {
                $scope.post = post;
            });
        };

        getPost(id);
    });