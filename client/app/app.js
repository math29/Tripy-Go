'use strict';

angular.module('wtcApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'btford.socket-io',
  'ngAnimate',
  'uiGmapgoogle-maps',
  'wtcApp.directives',
  'wtcApp.controllers'
])

  .config(function ($routeProvider, $locationProvider, $httpProvider, uiGmapGoogleMapApiProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyC3BOlOv7Kg4XD_x3P9sAmHEEFCCyam4EU',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          event.preventDefault();
          $location.path('/login');
        }
      });
    });
  });

  angular.module('d3', []);
  angular.module('wtcApp.directives', ['d3']);
  angular.module('wtcApp.controllers', []);
