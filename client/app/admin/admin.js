'use strict';

angular.module('wtcApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/countries_management', {
        templateUrl: 'app/countries/countries.html',
        controller: 'CountryCtrl'
      });
  });
