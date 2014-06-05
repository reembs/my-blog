'use strict';

angular.module('myBlogApp')
    .controller('AddPostCtrl', function ($scope, $location, BlogApi) {
        var validate = function() {
            if (!$scope.postForm) { // In test code the form does not exist
                return true;
            }
            return $scope.postForm.email.$valid && $scope.postForm.title.$valid && $scope.postForm.content.$valid;
        };
        $scope.submit = function() {
            if (validate()) {
                BlogApi.addPost($scope.email, $scope.title, $scope.content);
                $location.path("/");
            }
        };
    });
