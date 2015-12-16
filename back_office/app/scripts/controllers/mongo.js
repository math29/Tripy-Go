'use strict';
/**
 * @ngdoc function
 * @name WTCBack.controller:MongoCtrl
 * @description
 * # MongoCtrl
 * Controller for mongo informations
 */
angular.module('WTCBack')
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
      console.log('error: '+data);
      });
    };

  $scope.names = function(){
    var res = $http.get('/api/back/db/names');
    res.success(function(data){
      $scope.names = data.names;
      alert($scope.names);
    });
    res.error(function(data){
      console.log('error: '+data);
    });
  }

  $scope.stats = function(){
      var res = $http.get('/api/back/db/stats');
      res.success(function(data){
        $scope.stats = data;
        alert($scope.stats);
      });
      res.error(function(data){
        console.log('error: '+data);
      });
    }

    // retrieve mongo informations
    $scope.get();
    $scope.names();
    $scope.stats();
  });

