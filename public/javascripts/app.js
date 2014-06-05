'use strict';

angular.module('myBlogApp', [
        'ngRoute', 'ngResource'
    ])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main.html',
                controller: 'MainCtrl'
            })
            .when('/add', {
                templateUrl: '/partials/addPost.html',
                controller: 'AddPostCtrl'
            })
            .when('/post/:id', {
                templateUrl: '/partials/showPost.html',
                controller: 'ShowPostCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    });