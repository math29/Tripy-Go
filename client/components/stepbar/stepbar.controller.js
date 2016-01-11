'use strict';

angular.module('wtcApp')
  .controller('StepbarCtrl', function ($scope, $location, $window) {
    $scope.isCollapsed = true;
    $scope.step = 1;
  });
