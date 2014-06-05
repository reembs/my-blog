'use strict';

describe('Show single post control', function(){
    var $scope, controller, $httpBackend, $routeParams;

    beforeEach(module('myBlogApp'));

    var id = "1231";

    beforeEach(inject(function($injector, $controller, $rootScope) {
        $httpBackend = $injector.get('$httpBackend');
        $routeParams = $injector.get('$routeParams');

        $routeParams.id = id;

        $scope = $rootScope.$new();

        controller = $controller('ShowPostCtrl', {
            '$scope': $scope
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should call the correct api in server according to route ID', function() {
        $httpBackend.expect('GET', '/api/show/' + id).respond(200);
        $httpBackend.flush();
    });
});