'use strict';

angular.module('WTCBack')
  .controller('UsersCtrl', function ($scope, $http, $window) {

    $scope.userEdit = null;

    function createDownloadURL(){
      var blob = new Blob([ JSON.stringify($scope.languages) ], { type : 'application/json' });
      if($scope.url){
        $scope.url.revokeObjectURL()
      }
      $scope.url = (window.URL || window.webkitURL).createObjectURL( blob );
    }

    $scope.edit = function(user){
      $scope.userEdit = user;
      $scope.userEdit.oldRole = user.role;
    }

    $scope.get = function(){
      var res = $http.get('../api/users/');
      res.success(function(data){
        $scope.users = data;
      });
      res.error(function(data){
        console.log(data);
      });
    };

    $scope.update_role = function(user){
      var res = $http.put('../api/users/'+user._id+'/'+user.role);
      res.success(function(data){
        $scope.userEdit = null;
      });
      res.error(function(data){
        console.log(data);
        user.role = user.oldRole;
        $scope.errors.push('Impossible de modifier le rôle de l\'utilisateur');
      });
    }


    $scope.getRoles = function(){
      var res = $http.get('../api/users/roles');
      res.success(function(data){
        $scope.roles = data.roles;
      });
      res.error(function(data){
        alert(data);
      });
    }

    $scope.getRoles();

    $scope.get();


    $scope.delete = function(language) {
      Language.remove({ id: language._id });
      angular.forEach($scope.languages, function(c, i) {
        if (c === language) {
          $scope.languages.splice(i, 1);
        }
      });
    };

    $scope.scrollTo = function(id) {
          var anchor = document.getElementById(id);
          console.log(anchor);
          //var container = angular.element(document.getElementById('scroll-container'));
          $window.container.scrollToElement(anchor, 0, 800);
    };

    $scope.getClassFromInfo = function(language){
      if(!textIsValid(language.name) || !textIsValid(language.code)){
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
