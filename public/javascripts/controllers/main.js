'use strict';

angular.module('myBlogApp')
    .controller('MainCtrl', function ($scope, $location, $routeParams, BlogApi) {
        var currentPage = $routeParams.page;
        if (!currentPage) currentPage = 1;

        var pages=1;

        var getPosts = function(page) {
            BlogApi.getPosts(page, function (postsData) {
                $scope.posts = postsData.posts;

                pages = postsData.pages;
                currentPage = postsData.currentPage;

                $scope.hasPreviousPage = currentPage > 1;
                $scope.hasNextPage = currentPage < pages;
            });
        };

        getPosts(currentPage); // get the first page of posts by default

        $scope.previousPage = function() {
            var page = (currentPage*1-1); // *1 hack so that JS won't string concat
            if (page > 1) {
                $location.path('/p/' + page);
            } else {
                $location.path('/');
            }
        };

        $scope.nextPage = function() {
            $location.path('/p/' + (currentPage*1+1)); // *1 hack so that JS won't string concat
        };

        $scope.openPost = function(id) {
            $location.path( "/post/" + id );
        };
    });