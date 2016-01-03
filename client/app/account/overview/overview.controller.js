'use strict';

angular.module('wtcApp')
  .controller('OverviewCtrl', function ($scope, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
