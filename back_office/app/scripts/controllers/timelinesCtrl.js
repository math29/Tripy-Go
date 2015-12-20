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
    $scope.newTimeline = {};
    $scope.timeline = null;
    $scope.timelines = [];
    $scope.createTimeline = false;

    $scope.getTimelines = function(){
      var res = $http.get('../api/timeline');
      res.success(function(data){
        $scope.timelines = data;
        if($scope.timelines.length == 0){
          $scope.createTimeline = true;
        }
        $scope.timeline = $scope.timelines[0];
      });
      res.error(function(data){
        $scope.errors.push(data.errors);
      });
    }

    $scope.getTimelines();

    $scope.createThisTimeline = function(){
      var req = {
        method: 'POST',
        url: '../api/timeline/'+$scope.newTimeline.name,
        data: {description: $scope.newTimeline.description}
      };
      var res = $http(req).then(function(data){
        if(data.status == 201){
          $scope.messages.push('Timeline créée avec succés');
          $scope.timeline = data.data;
          $scope.createTimeline = null;
          $scope.timelines.push(data.data);
        }else{
          $scope.errors.push('Impossible de créer la timeline');
        }
      });
    }

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
        data: {content: operation.content}
      };
      if(operation._id !== undefined){
        req.url = '../api/operations/'+operation._id+'/'+operation.title+'/1';
        var res = $http(req).then(function(data){
        });
      }else{
        req.method = 'POST';
        var res = $http(req).then(function(data){
          if(data.status === 201){
            $scope.operations.push(data.data);
            $scope.messages.push('Operation created');
            var nRes = $http.post('../api/timeline/add/'+$scope.timeline._id+'/'+data.data._id);
            nRes.success(function(data){
              $scope.messages.push('Opération ajoutée à la timeline');
            });
            nRes.error(function(data){
              $scope.errors.push('Impossible d\'ajouter l\'opération à la timeline');
            });

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
