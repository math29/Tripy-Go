'use strict';

angular.module('wtcApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/start_with/:travelID', {
        templateUrl: 'app/letsTravel/start_with/start_with.html',
        controller: 'StartWithCtrl',
        authenticate: true
      })
      .when('/find_a_place/:travelID', {
        templateUrl: 'app/letsTravel/find_a_place/find_a_place.html',
        controller: 'FindAPlaceCtrl'
      });
  });