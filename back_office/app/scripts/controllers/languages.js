'use strict';

angular.module('WTCBack')
  .controller('LanguageCtrl', function ($scope, $http, $window, Language) {
    // Use the Country $resource to fetch all countries
    //$scope.countries = Country.query();
    $scope.addLanguage = false;
    $scope.new_language = {};
    $scope.errors = [];
    $scope.messages = [];
    $scope.keys = [];
    $scope.orderby='';
    $scope.orderOptions = ['+','-'];
    $scope.orderType = $scope.orderOptions[0];
    $scope.languages = '{}';


    function createDownloadURL(){
      var blob = new Blob([ JSON.stringify($scope.languages) ], { type : 'application/json' });
      if($scope.url){
        $scope.url.revokeObjectURL()
      }
      $scope.url = (window.URL || window.webkitURL).createObjectURL( blob );
    }

    $scope.edit = function(language){
      $scope.new_language = language;
      $scope.addLanguage = true;
      scrollTo($window, 'languageForm');
    };

    $scope.get = function(){
      var res = $http.get('../api/language');
      res.success(function(data){
        $scope.languages = data;
        createDownloadURL();
        $scope.keys = Object.keys(data[0]);
        $scope.keys.splice(0,1);
        $scope.keys.splice($scope.keys.length-1,1);
          $scope.selection = $scope.keys[1];
          $scope.orderby = $scope.keys[1];
      });
      res.error(function(data){
        console.log(data);
      });
    };

    $scope.get();
    $scope.create = function(language){
      delete language._id;
      var res = $http.post('../api/language', language);
      res.success(function(data) {
        $scope.message = data;
        if(typeof data.nModified !== 'undefined'){
           $scope.messages.push('Language '+language.name+' has been modified');
           scrollTo($window, 'languageForm');
        }

      });
      res.error(function(data) {
        if(typeof data.errors !== 'undefined'){
          for(var i=0; i<data.errors.length; i++){
            $scope.errors.push(data.errors[i]);
          }
          //$scope.errors.push(data.errors);
          scrollTo($window, 'languageForm');
        }
      });
       $scope.addLanguage = false;
       $scope.new_language = {};
    };

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
