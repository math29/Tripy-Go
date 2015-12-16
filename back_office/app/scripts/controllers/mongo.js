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
    });
    res.error(function(data){
      console.log('error: '+data);
    });
  }

  $scope.stats = function(){
      var res = $http.get('/api/back/db/stats');
      res.success(function(data){
        $scope.stats = data;
        for(var i=0; i<$scope.stats.length; i++){
          $scope.stats[i].avgObjSize = avgSize($scope.stats[i].avgObjSize);
          $scope.stats[i].size = sizeToMb($scope.stats[i].size)
        }
      });
      res.error(function(data){
        console.log('error: '+data);
      });
    }

    // retrieve mongo informations
    $scope.get();
    $scope.names();
    $scope.stats();

    function avgSize(data){
      return Math.ceil(data)+'Kb'
    }

    function sizeToMb(data){
      return Math.floor(data / 10000) + 'Mb'
    }
  });

