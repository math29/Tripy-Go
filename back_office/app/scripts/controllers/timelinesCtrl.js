'use strict';
/**
 * @ngdoc function
 * @name WTCBack.controller:TimelinesCtrl
 * @description
 * # TimelinesCtrl
 * Controller for timelines
 */
angular.module('WTCBack')
  .controller('TimelinesMgr', function($scope, $http) {
    $scope.errors = [];
    $scope.messages = [];
    $scope.operations = [];
    $scope.operationEdit = null;

    $scope.operations = function(){
      var res = $http.get('../api/operations/');
      res.success(function(data){
        $scope.operations = data;
      });
      res.error(function(data){
        $scope.errors.push(data);
      });

    }

    $scope.editOperation = function(operation){
      $scope.operationEdit = operation;
    }

    $scope.saveOperation = function(operation){
      var req = {
        method: 'PUT',
        url: '../api/operations/'+operation.title+'/1',
        data: {text: operation.content}
      };
      if(operation._id !== undefined){
        req.url = '../api/operations/'+operation._id+'/'+operation.title+'/1';
        var res = $http(req).then(function(data){

        });
      }else{
        req.method = 'POST';
        var res = $http(req).then(function(data){
          if(data.status === 200){
            $scope.operations.push(data.data);
            $scope.messages.push('Operation created');
          }else{
            $scope.errors.push(data.data.error);
          }

        });
      }
      $scope.operationEdit = null;
    }


    $scope.deleteOperation = function(operation){
      $http.delete('../api/operations/'+operation._id).then(function(data){
        if(data.status === 204){
          $scope.messages.push('L\'opération à bien été supprimée');
        }else{
          $scope.errors.push('Impossible de supprimer l\'opération');
        }
      });
    }

    $scope.createOperation = function(){
      $scope.operationEdit = {};
    }

    // get all operations
    $scope.operations();
  });
