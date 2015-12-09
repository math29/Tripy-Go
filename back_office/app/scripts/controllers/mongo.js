'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MongoCtrl
 * @description
 * # MongoCtrl
 * Controller for mongo informations
 */
angular.module('sbAdminApp')
  .controller('MongoCtrl', function($scope,$http) {
  /* get mongodb informations*/
  $scope.get = function(){
    var res = $http.get('/api/back/db');
    res.success(function(data){
      $scope.db_info = data;
      $scope.db_info.avgObjSize = Math.ceil($scope.db_info.avgObjSize)+'Kb';
      $scope.db_info.dataSize = Math.floor($scope.db_info.dataSize / 10000) + 'Mb';
    });
    res.error(function(data){
      console.log(data);
      });
    };

    $scope.get();
  });

