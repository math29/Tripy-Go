'use strict';

angular.module('wtcApp')
  .controller('mapCtrl', function ($scope, $location, Auth) {

    // $scope.isLoggedIn = Auth.isLoggedIn;
    // $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });