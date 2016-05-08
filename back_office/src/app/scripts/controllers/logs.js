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
    $scope.level = 'All';
    $scope.pagination = {maxPage:1};
    $scope.query = '';

    $scope.range = function(num){
      var array = new Array(num);
      return array;
    }

    function createDownloadURL(){
      var blob = new Blob([ JSON.stringify($scope.logs) ], { type : 'application/json' });

      $scope.url = (window.URL || window.webkitURL).createObjectURL( blob );
    }

    $scope.get = function(page){
      if(typeof page== 'undefined'){
        page = 1;
      }
      if($scope.query.length > 0){
        page = page + '/'+$scope.query;
      }
      var res = $http.get('../api/back/log/'+$scope.level+'/'+page);
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
        $scope.errors.push('error while getting logs');
        console.log('error while getting Logs');
      });
    };

    $scope.get(1);

    $scope.drop = function(){
      var res = $http.delete('../api/back/log/');
      res.success(function(data){
        $scope.messages.push('Base des logs vidée');
        $scope.logs = [];
      });
      res.error(function(data){
        $scope.errors.push('Erreur inconnue');
      });
    }

    $scope.delete = function(log) {
      var res = $http.delete('../api/back/log/'+log._id);
      res.success(function(data){
        $scope.messages.push('Successfully removed Log entry '+log._id);
        angular.forEach($scope.logs, function(c, i) {
          if (c === log) {
            $scope.logs.splice(i, 1);
            $scope.stats = {};
          }
        });
      });
      res.error(function(data){
        console.log('error while deleting Log');
      });
    };

    $scope.scrollTo = function(id) {
          var anchor = document.getElementById(id);
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
