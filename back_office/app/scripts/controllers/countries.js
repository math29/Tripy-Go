'use strict';

angular.module('WTCBack')
  .controller('CountryCtrl', function ($scope, $http, $window, Country) {
    // Use the Country $resource to fetch all countries
    //$scope.countries = Country.query();
    $scope.addCountry = false;
    $scope.new_country = {};
    $scope.errors = [];
    $scope.messages = [];
    $scope.keys = [];
    $scope.orderby='';
    $scope.orderOptions = ['+','-'];
    console.log($scope.orderOptions);
    $scope.orderType = $scope.orderOptions[0];
    $scope.countries = '{}';

    function createDownloadURL(){
      var blob = new Blob([ JSON.stringify($scope.countries) ], { type : 'text/plain' });
      if($scope.url){
        $scope.url.revokeObjectURL()
      }
      $scope.url = (window.URL || window.webkitURL).createObjectURL( blob );
     }

    $scope.edit = function(country){
      $scope.new_country = country;
      $scope.addCountry = true;
      scrollTo($window, 'countryForm');
    };

    $scope.get = function(){
      var res = $http.get('../api/countries');
      res.success(function(data){
        $scope.countries = data;
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
    $scope.create = function(country){
      delete country._id;
      var res = $http.post('../api/countries', country);
      res.success(function(data) {
        $scope.message = data;
        console.log(data);
        if(typeof data.nModified !== 'undefined'){
           $scope.messages.push('Country '+country.country_name+' has been modified');
           scrollTo($window, 'countryForm');
        }

      });
      res.error(function(data) {
        if(typeof data.errors !== 'undefined'){
          for(var i=0; i<data.errors.length; i++){
            $scope.errors.push(data.errors[i]);
          }
          //$scope.errors.push(data.errors);
          scrollTo($window, 'countryForm');
        }
      });
       $scope.addCountry = false;
       $scope.new_country = {};
    };

    $scope.delete = function(country) {
      Country.remove({ id: country._id });
      angular.forEach($scope.countries, function(c, i) {
        if (c === country) {
          $scope.countries.splice(i, 1);
        }
      });
    };

    $scope.scrollTo = function(id) {
          var anchor = document.getElementById(id);
          console.log(anchor);
          //var container = angular.element(document.getElementById('scroll-container'));
          $window.container.scrollToElement(anchor, 0, 800);
    };

    $scope.getClassFromInfo = function(country){
      if(!textIsValid(country.country_name) || !textIsValid(country.country_code) || !textIsValid(country.area) || !textIsValid(country.capital) || !textIsValid(country.continent)){
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
