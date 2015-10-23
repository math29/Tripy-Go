'use strict';

angular.module('wtcApp')
  .controller('CountryCtrl', function ($scope, $http, Auth, Country) {

    // Use the Country $resource to fetch all countries
    $scope.countries = Country.query();
    $scope.addCountry = false;
    $scope.new_country = {};

    $scope.create = function(country){
      console.log(country);
      $http.post('/api/countries', country);
       $scope.addCountry = false;
    }

    $scope.delete = function(country) {
      Country.remove({ id: country._id });
      angular.forEach($scope.countries, function(c, i) {
        if (c === country) {
          $scope.countries.splice(i, 1);
        }
      });
    };
  });
