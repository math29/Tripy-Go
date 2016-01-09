'use strict';

angular.module('wtcApp')
  .controller('OverviewCtrl', function ($scope, $http, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = $scope.getCurrentUser();
    $scope.url_pic = "/api/files/" + $scope.user.picture + "?_ts=" + new Date().getTime();
  });
