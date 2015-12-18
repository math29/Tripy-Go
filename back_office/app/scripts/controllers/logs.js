'use strict';

angular.module('WTCBack')
  .controller('LogCtrl', function ($scope, $http, $window) {
    // Use the Country $resource to fetch all countries
    //$scope.countries = Country.query();

    $scope.errors = [];
    $scope.messages = [];
    $scope.keys = [];
    $scope.orderby='';
    $scope.orderOptions = ['+','-'];
    $scope.orderType = $scope.orderOptions[0];
    $scope.logs = '{}';

    $scope.pagination = {maxPage:1};

    $scope.range = function(num){
      var array = new Array(num);
      console.log('array length: '+array.length);
      return array;
    }

    function createDownloadURL(){
      var blob = new Blob([ JSON.stringify($scope.logs) ], { type : 'application/json' });
      /*if($scope.url){
        $scope.url.revokeObjectURL()
      }*/
      $scope.url = (window.URL || window.webkitURL).createObjectURL( blob );
    }

    $scope.get = function(page){

      var res = $http.get('../api/back/log/'+page);
      res.success(function(data){
        $scope.logs = data.logs;
        $scope.stats = data.stats;
        $scope.pagination = data.pagination;
        createDownloadURL();
        $scope.keys = Object.keys(data.logs[0]);
        $scope.keys.splice(0,1);
        $scope.keys.splice($scope.keys.length-1,1);
          $scope.selection = $scope.keys[1];
          $scope.orderby = $scope.keys[1];
      });
      res.error(function(){
        console.log('error while getting Logs');
      });
    };

    $scope.get(1);

    $scope.delete = function(log) {
      var res = $http.delete('../api/back/log/'+log._id);
      res.success(function(data){
        console.log('succes: '+data);
        angular.forEach($scope.logs, function(c, i) {
          if (c === log) {
            $scope.logs.splice(i, 1);
          }
        });
      });
      res.error(function(data){
        console.log('error while deleting Log');
      });
    };

    $scope.scrollTo = function(id) {
          var anchor = document.getElementById(id);
          console.log(anchor);
          //var container = angular.element(document.getElementById('scroll-container'));
          $window.container.scrollToElement(anchor, 0, 800);
    };

    $scope.getClassFromInfo = function(log){
      if(typeof log !== 'undefined'){
        if(!textIsValid(log.message) || !textIsValid(log.timestamp) || !textIsValid(log.level)){
          return 'danger';
        }
      }else{
        return 'danger';
      }
    };

    function textIsValid(text){
      var valid = true;

      if(typeof text === 'undefined' || text.length === 0 ){
        valid = false;
      }

      return valid;
    }


  });
