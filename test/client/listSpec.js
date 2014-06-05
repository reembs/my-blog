'use strict';

describe('Main control', function(){
    var $scope, controller, $httpBackend;

    beforeEach(module('myBlogApp'));

    beforeEach(inject(function($injector, $controller, $rootScope) {
        $httpBackend = $injector.get('$httpBackend');

        $scope = $rootScope.$new();

        controller = $controller('MainCtrl', {
                '$scope': $scope
            });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get post list form server', function() {
        $httpBackend.expect('GET', '/api/list?page=1').respond(200);
        $httpBackend.flush();
    });

    it('scope should reflect the posts returned from server', function() {
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

    it('scope should respond to paging requests correctly by incrementing/decrementing page on server requests', function() {
        $httpBackend.expect('GET', '/api/list?page=1')
            .respond(200, {
                pages: 2,
                currentPage: 1,
                posts: []});

        $httpBackend.flush();

        expect($scope.hasPreviousPage).toEqual(false);
        expect($scope.hasNextPage).toEqual(true);

        $scope.nextPage();

        $httpBackend.expect('GET', '/api/list?page=2')
            .respond(200, {
                pages: 2,
                currentPage: 2,
                posts: []});

        $httpBackend.flush();

        expect($scope.hasPreviousPage).toEqual(true);
        expect($scope.hasNextPage).toEqual(false);

        $scope.previousPage();

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