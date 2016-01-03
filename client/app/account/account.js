'use strict';

angular.module('wtcApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/profile/:step', {
        templateUrl: 'app/account/profile/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/profile/overview', {
        templateUrl: 'app/account/overview/overview.html',
        controller: 'OverviewCtrl'
      });
  });