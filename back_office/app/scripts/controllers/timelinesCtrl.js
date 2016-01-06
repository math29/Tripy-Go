'use strict';
/**
 * @ngdoc function
 * @name WTCBack.controller:TimelinesCtrl
 * @description
 * # TimelinesCtrl
 * Controller for timelines
 */
angular.module('WTCBack')
  .controller('TimelinesMgr', function($scope, $http, socket) {
    $scope.errors = [];
    $scope.messages = [];
    $scope.operations = [];
    $scope.operationEdit = null;
    $scope.newTimeline = {};
    $scope.timelineIndex = -1;
    $scope.timelines = [];
    $scope.createTimeline = false;

    $scope.getTimelines = function(){
      var res = $http.get('../api/timeline');
      res.success(function(data){
        $scope.timelines = data;
        console.log("GET timelines");
        socket.syncUpdates('timeline', $scope.timelines);

        if($scope.timelines.length == 0){
          $scope.createTimeline = true;
        }
        $scope.timelineIndex = 0;
      });
      res.error(function(data){
        $scope.errors.push(data.errors);
      });
    }

    $scope.getTimelines();

    function operationCb(event, item, array){
      $scope.getTimelines();
    }

    $scope.createThisTimeline = function(){
      var req = {
        method: 'POST',
        url: '../api/timeline/'+$scope.newTimeline.name,
        data: {description: $scope.newTimeline.description}
      };
      var res = $http(req).then(function(data){
        if(data.status == 201){
          $scope.messages.push('Timeline créée avec succés');
          $scope.createTimeline = null;
        }else{
          $scope.errors.push('Impossible de créer la timeline');
        }
      });
    }

    /**
     * Récupére l'ensemble des opérations
     */
    $scope.getOperations = function(){
      var res = $http.get('../api/operations/');
      res.success(function(data){
        $scope.operations = data;
        // synchronisation des opérations via le socket
        socket.syncUpdates('operation', $scope.operations, operationCb);
      });
      res.error(function(data){
        $scope.errors.push(data);
      });
    }



    // Clean up listeners when the controller is destroyed
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('operation');
      socket.unsyncUpdates('timeline');
    });
    /**
     * Edition d'une opération
     *
     * @param operation à éditer
     */
    $scope.editOperation = function(operation){
      $scope.operationEdit = operation;
    }

    /**
     * Sauvegarde une opération en base de donnée
     */
    $scope.saveOperation = function(operation){
      // requête de base
      var req = {
        method: 'PUT',
        url: '../api/operations/'+operation.title,
        data: {content: operation.content, steps: operation.steps}
      };
      // si l'opération posséde un ID, on la met à jour
      if(operation._id !== undefined){
        req.url = '../api/operations/'+operation._id+'/'+operation.title;
        var res = $http(req).then(function(data){
          console.log(data);
        });
      }else{
        req.method = 'POST';
        var res = $http(req).then(function(data){
          if(data.status === 201){
            $scope.messages.push('Operation created');
          }else{
            $scope.errors.push(data.data.error);
          }

        });
      }
      $scope.operationEdit = null;
      $scope.getTimelines();
    }

    /**
     * Supprime l'opération de la timeline
     */
    $scope.deleteOperationFromTimeline = function(timeline, operationId){
      var operation = null;
      for(var i = 0; i < $scope.operations.length; i++){
        if($scope.operations[i]._id == operationId){
          operation = $scope.operations[i];
          break;
        }
      }
      if(operation != null){
        var index = findTimelineInOperation(timeline, operation);
        if(index != -1){
          operation.steps.splice(index, 1);
        }
        console.log(operation);
        $scope.saveOperation(operation);
        $scope.getOperations();
      }else{
        $scope.errors.push('L\'opération n\'éxiste pas');
      }
    }

    // supprime une opération en base
    $scope.deleteOperation = function(operation){

      $http.delete('../api/operations/'+operation._id).then(function(data){
        if(data.status === 204){
          $scope.messages.push('L\'opération à bien été supprimée');
          console.log(getIndexOfOperation(operation, $scope.operations));
        }else{
          $scope.errors.push('Impossible de supprimer l\'opération');
        }
      });
    }

    $scope.createOperation = function(){
      $scope.operationEdit = {};
    }

    // get all operations
    $scope.getOperations();

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
      }
    }

    $scope.removeFromTimeline = function(timeline){
      var index = findTimelineInOperation(timeline, $scope.operationEdit);
      if(index != -1){
        $scope.operationEdit.steps.splice(index, 1);
      }
      console.log("removed");
    }

    function findTimelineInOperation(timeline, operation){
      if(operation.steps !== undefined){
        for(var i = 0; i< operation.steps.length; i++){
          if(operation.steps[i].id === timeline._id){
            return i;
          }
        }
      }
      return -1;
    }

    $scope.isTimelineOnOperation = function(timeline, operation){
      return isTimelineOnOperation(timeline, operation);
    }

    $scope.moveOperation = function(side, operationId, timelineId){
      var s = "up";
      if(side == -1){
        s = "down";
      }
      var req = {
        method: 'PUT',
        url: '../api/timeline/'+s+'/'+timelineId+'/'+operationId
      };
      var res = $http(req).then(function(data){
        $scope.getTimelines();
              });
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
