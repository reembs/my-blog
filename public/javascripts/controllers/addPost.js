'use strict';

angular.module('myBlogApp')
    .controller('AddPostCtrl', function ($scope, $location, BlogApi) {
        $scope.submit = function() {
            BlogApi.addPost($scope.email, $scope.title, $scope.content);
            $location.path( "/" );
        };
    });
