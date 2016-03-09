'use strict';

angular.module('wtcApp')
  .controller('OverviewCtrl', function ($scope, $http, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = $scope.getCurrentUser();

    // AVATAR Gesture
    $scope.url_pic = Auth.getUserAvatar();
  });
