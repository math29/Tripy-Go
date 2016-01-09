'use strict';

angular.module('wtcApp')
  .controller('OverviewCtrl', function ($scope, $http, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = $scope.getCurrentUser();

    // AVATAR Gesture
    if($scope.user.picture){
    	$scope.url_pic = "/api/files/" + $scope.user.picture + "?_ts=" + new Date().getTime();
    }else{
    	$scope.url_pic = "/assets/images/user.jpg"
    }
  });
