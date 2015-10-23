'use strict';

angular.module('wtcApp')
  .controller('CountryCtrl', function ($scope, $http, $window, Auth, Country) {

    // Use the Country $resource to fetch all countries
    $scope.countries = Country.query();
    $scope.addCountry = false;
    $scope.new_country = {};
    $scope.errors = [];
    $scope.messages = [];

    $scope.edit = function(country){
      $scope.new_country = country;
      $scope.addCountry = true;
      scrollTo($window, "countryForm");
    }

    $scope.create = function(country){
      delete country._id
      var res = $http.post('/api/countries', country);
      res.success(function(data, status, headers, config) {
        $scope.message = data;
        console.log(data);
        if(typeof data.nModified !== 'undefined'){
           $scope.messages.push("Country "+country.country_name+" has been modified");
           scrollTo($window, "countryForm");
        }

      });
      res.error(function(data, status, headers, config) {
        if(typeof data.errors !== 'undefined'){
          for(var i=0; i<data.errors.length; i++){
            $scope.errors.push(data.errors[i]);
          }
          //$scope.errors.push(data.errors);
          scrollTo($window, "countryForm");
        }
      });
       $scope.addCountry = false;
       $scope.new_country = {};
    }

    $scope.delete = function(country) {
      Country.remove({ id: country._id });
      angular.forEach($scope.countries, function(c, i) {
        if (c === country) {
          $scope.countries.splice(i, 1);
        }
      });


    $scope.scrollTo = function(id) {
      var anchor = document.getElementById(match.id);
      console.log(anchor);
      var container = angular.element(document.getElementById('scroll-container'));
      $window.container.scrollToElement(anchor, 0, 800);
    }
    };
  });
