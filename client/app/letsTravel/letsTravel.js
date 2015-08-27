'use strict';

angular.module('wtcApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/start_with', {
        templateUrl: 'app/letsTravel/start_with/start_with.html',
        controller: 'StartWithCtrl',
        authenticate: true
      });
  });