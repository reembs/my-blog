'use strict';

describe('Add post control', function(){
    var $scope, controller, $httpBackend;

    beforeEach(module('myBlogApp'));

    beforeEach(inject(function($injector, $controller, $rootScope) {
        $httpBackend = $injector.get('$httpBackend');

        $scope = $rootScope.$new();

        controller = $controller('AddPostCtrl', {
            '$scope': $scope
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should post the scope variables correctly to server', function() {
        var email = $scope.email = 'some@email.com';
        var title = $scope.title = 'My Title';
        var content = $scope.content = 'Some content....';

        $scope.submit();

        $httpBackend.expectPOST('/api/post', {author: email, title: title, content: content}).respond(200);
        $httpBackend.flush();
    });
});