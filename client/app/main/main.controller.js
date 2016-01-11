'use strict';

angular.module('wtcApp')
    .controller('MainCtrl', function ($scope, $http, $window, socket) {
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;

    });
