'use strict';

/**
 * @ngdoc directive
 * @name stepbar
 * @description
 * # adminPosHeader
 */
angular.module('wtcApp')
	.directive('stepbar',function() {
    return {
        templateUrl:'components/stepbar/stepbar.html',
        restrict: 'E',
        replace: true,
        scope: {
          step: '='
        },
        controller: function ($scope, $location, $window) {
          $scope.isCollapsed = true;
        }

    }
  });
