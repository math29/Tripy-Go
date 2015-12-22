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

    /**
     * Edition d'une opération
     *
     * @param operation à éditer
     */
    $scope.editOperation = function(operation){
      $scope.operationEdit = operation;
    }

    $scope.saveOperation = function(operation){
      var req = {
        method: 'PUT',
        url: '../api/operations/'+operation.title,
        data: {content: operation.content, steps: operation.steps}
      };
      if(operation._id !== undefined){
        req.url = '../api/operations/'+operation._id+'/'+operation.title;
        var res = $http(req).then(function(data){
          console.log(data);
          var nRes = $http.post('../api/timeline/add/'+$scope.timeline._id+'/'+data.data._id);
            nRes.success(function(data){
            $scope.getTimelines();
            $scope.messages.push('Opération ajoutée à la timeline');
          });
          nRes.error(function(data){
            $scope.errors.push('Impossible d\'ajouter l\'opération à la timeline');
          });
        });
      }else{
        req.method = 'POST';
        var res = $http(req).then(function(data){
          if(data.status === 201){
            $scope.operations.push(data.data);
            $scope.timeline.operations.push(data.data);
            $scope.messages.push('Operation created');
          }else{
            $scope.errors.push(data.data.error);
          }

        });
      }
      $scope.operationEdit = null;
    }

    $scope.deleteOperationFromTimeline = function(timeline, operation){
      $http.post('../api/timeline/remove/'+timeline._id+'/'+operation._id)
      .then(function(data){
        if(data.status == 202){
          $scope.timeline=data.data;
          $scope.messages.push('Opération supprimée de la timeline');
        }else{
          $scope.errors.push('Impossible de supprimer l\'opération de la timeline');
        }
      });
    }

    // supprime une opération en base
    $scope.deleteOperation = function(operation){

      $http.delete('../api/operations/'+operation._id).then(function(data){
        if(data.status === 204){
          $scope.messages.push('L\'opération à bien été supprimée');
          console.log(getIndexOfOperation(operation, $scope.operations));
          $scope.operations.splice(getIndexOfOperation(operation, $scope.operations), 1);
          $scope.timeline.operations.splice(getIndexOfOperation(operation, $scope.operations), 1);
          $scope.getTimelines();
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

    function getIndexOfOperation(operation, list){
      for(var i = 0; i< list.length; i++){
        if(list[i]._id === operation._id){
          return i;
        }
      }
      return -1;
    }

    function getOperationInTimeline(operation){
      var timelinesId = [];
      // parcours l'ensble des opérations des timelines
      for(var i = 0; i<$scope.timelines.length; i++){
        var timeline = $scope.timelines[i];
        for(var j=0; j<timeline.operations.length;j++){
          if(operation._id === timeline.operations[j]){
            timelinesId.push(timeline._id);
            break;
          }
        }
      }
      console.log('ids: '+timelinesId);
      return timelinesId;
    }

    /**
     * Add timeline id to opération
     *
     */
    $scope.addToTimeline = function(timeline){
      var tmline = {id: timeline._id ,step:timeline.operations.length};
      if(!isTimelineOnOperation(timeline, $scope.operationEdit)){
        if($scope.operationEdit.steps === undefined){$scope.operationEdit.steps = [];}
        $scope.operationEdit.steps.push(tmline);
        console.log($scope.operationEdit);
      }
    }

    $scope.RemoveFromTimeline = function(timeline){
      var index = findTimelineInOperation(timeline, $scope.operationEdit);
      if(index != -1){
        $scope.operationEdit.steps.splice(index, 1);
      }
    }

    function findTimelineInOperation(timeline, operation){
      if(operation.steps !== undefined){
        for(var i = 0; i< operation.steps.length; i++){
          if(operation.steps[i]._id === timeline._id){
            return i;
          }
        }
      }
      return -1;
    }

    $scope.isTimelineOnOperation = function(timeline, operation){
      return isTimelineOnOperation(timeline, operation);
    }

    function isTimelineOnOperation(timeline, operation){
      if(operation !== null){
        if(operation.steps !== undefined){
          for(var i = 0; i < operation.steps.length; i++){
            if(operation.steps[i].id === timeline._id){
              return true;
            }
          }
        }
      }
      return false;
    }
  });
