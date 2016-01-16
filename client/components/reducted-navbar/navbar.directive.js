'use strict';

/**
 * @ngdoc directive
 * @name navbar
 * @description
 * # adminPosHeader
 */
angular.module('wtcApp')
	.directive('reductednavbar',function() {
    return {
        templateUrl:'components/reducted-navbar/navbar.html',
        restrict: 'E',
        replace: true,
        scope: {
          step: '='
        },
        controller: function ($scope, $location, $window, Auth) {
          $scope.isCollapsed = true;
          $scope.isLoggedIn = Auth.isLoggedIn;
          $scope.isAdmin = Auth.isAdmin;
          $scope.getCurrentUser = Auth.getCurrentUser;
          $scope.url_pic = Auth.getUserAvatar();

          $scope.logout = function() {
            Auth.logout();
            $location.path('/login');
          };

          $scope.goAdmin = function(){
            $window.location = '/back';
          };

          $scope.isActive = function(route) {
            return route === $location.path();
          };
        }

    }
  });
