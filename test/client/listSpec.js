'use strict';

describe('Main control', function(){
    var $scope, $httpBackend, $routeParams, $controller;

    beforeEach(module('myBlogApp'));

    beforeEach(inject(function($injector, $rootScope) {
        $httpBackend = $injector.get('$httpBackend');
        $routeParams = $injector.get('$routeParams');

        // not creating the actual controller here since some tests require path changes, and recreation on controller
        $controller = $injector.get('$controller');

        $scope = $rootScope.$new();
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get post list form server', function() {
        $controller('MainCtrl', {
            '$scope': $scope
        });
        $httpBackend.expect('GET', '/api/list?page=1').respond(200);
        $httpBackend.flush();
    });

    it('scope should reflect the posts returned from server', function() {
        $routeParams.page = 1;
        $controller('MainCtrl', {
            '$scope': $scope
        });
        $httpBackend.expect('GET', '/api/list?page=1')
            .respond(200, {
                pages: 1,
                currentPage: 1,
                posts: [
                    {
                        id: 1,
                        author: "ME!!",
                        title: "My first post",
                        content: "My first blog post content...",
                        time: new Date()
                    }]});

        $httpBackend.flush();

        expect($scope.posts).toBeDefined();
        expect($scope.posts.length).toEqual(1);
        expect($scope.hasPreviousPage).toBeDefined();
        expect($scope.hasNextPage).toBeDefined();
        expect($scope.hasPreviousPage).toEqual(false);
        expect($scope.hasNextPage).toEqual(false);
    });

    it('should respond to paging requests correctly by incrementing/decrementing page on server requests', function() {
        $controller('MainCtrl', {
            '$scope': $scope
        });

        $httpBackend.expect('GET', '/api/list?page=1')
            .respond(200, {
                pages: 2,
                currentPage: 1,
                posts: []});

        $httpBackend.flush();

        expect($scope.hasPreviousPage).toEqual(false);
        expect($scope.hasNextPage).toEqual(true);

        // set page param in route, and recreate the controller to initiate the request
        $routeParams.page = 2;
        $controller('MainCtrl', {
            '$scope': $scope
        });

        $httpBackend.expect('GET', '/api/list?page=2')
            .respond(200, {
                pages: 2,
                currentPage: 2,
                posts: []});

        $httpBackend.flush();

        expect($scope.hasPreviousPage).toEqual(true);
        expect($scope.hasNextPage).toEqual(false);

        // set page param in route, and recreate the controller to initiate the request
        $routeParams.page = 1;
        $controller('MainCtrl', {
            '$scope': $scope
        });

        $httpBackend.expect('GET', '/api/list?page=1')
            .respond(200, {
                pages: 2,
                currentPage: 1,
                posts: []});

        $httpBackend.flush();

        expect($scope.hasPreviousPage).toEqual(false);
        expect($scope.hasNextPage).toEqual(true);
    });
});