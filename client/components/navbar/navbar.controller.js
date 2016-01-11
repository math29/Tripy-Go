'use strict';

angular.module('wtcApp')
  .controller('NavbarCtrl', ['$scope', '$location', '$window',  function ($scope, $location, $window, Auth) {
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    // User avatar
    $scope.url_pic = Auth.getUserAvatar();

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };
    alert('OK');

    $scope.goAdmin = function(){
              $window.location = '/back';
            };
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  }]);
