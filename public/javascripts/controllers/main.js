'use strict';

angular.module('myBlogApp')
    .controller('MainCtrl', function ($scope, $location, BlogApi) {
        var currentPage=1, pages=1;

        var getPosts = function(page) {
            BlogApi.getPosts(page, function (postsData) {
                $scope.posts = postsData.posts;

                pages = postsData.pages;
                currentPage = postsData.currentPage;

                $scope.hasPreviousPage = currentPage > 1;
                $scope.hasNextPage = currentPage < pages;
            });
        };

        getPosts(1);

        $scope.previousPage = function() {
            getPosts((currentPage*1) - 1);
        };

        $scope.nextPage = function() {
            getPosts((currentPage*1) + 1);
        };

        $scope.openPost = function(id) {
            $location.path( "/post/" + id );
        };
    });