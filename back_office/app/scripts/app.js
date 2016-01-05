'use strict';
/**
 * @ngdoc overview
 * @name WTCBack
 * @description
 * # WTCBack
 *
 * Main module of the application.
 */
angular
  .module('WTCBack', [
    'ngResource',
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'ngCookies',
    'btford.socket-io'
  ])
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
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider', '$httpProvider', '$compileProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$httpProvider, $compileProvider) {
    $httpProvider.interceptors.push('authInterceptor');

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });
    $urlRouterProvider.otherwise('/dashboard/home');

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'WTCBack',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js',
                    'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'WTCBack',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              'scripts/directives/chat/chat.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('dashboard.form',{
        templateUrl:'views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    })
    .state('dashboard.timelines',{
      templateUrl:'views/timelines.html',
      url:'/timelines',
      controller:'TimelinesMgr',
      resolve: {
        loadMyFile: function($ocLazyLoad){
          return $ocLazyLoad.load({
            name:'WTCBack',
            files:[
          'scripts/controllers/timelinesCtrl.js',
          'scripts/directives/timeline/timeline.js',
          'scripts/directives/dashboard/stats/stats.js',
          'scripts/factories/socket.service.js',
          '../bower_components/angular-socket-io/socket.js',
          '../socket.io-client/socket.io.js',
          '../bower_components/angular-socket-io/socket.js',
          '../bower_components/lodash/lodash.js'
           ]
        });
      }
      }
    })
    .state('login',{
      templateUrl:'views/pages/login.html',
      url:'/login',
      controller:'LoginCtrl',
      resolve: {
        loadMyFile:function($ocLazyLoad){
          return $ocLazyLoad.load({
          name:'WTCBack',
          files:[
            'scripts/controllers/login.js',
            'scripts/factories/auth.service.js',
            'scripts/factories/user.service.js'
          ]
         })
        }
      }
    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'WTCBack',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
    })
      .state('dashboard.countries', {
        templateUrl: 'views/countries.html',
        url: '/countries',
        controller: 'CountryCtrl',
        resolve: {
          loadMyFile: function($ocLazyLoad){
            return $ocLazyLoad.load({
              name: 'WTCBack',
              files: ['scripts/controllers/countries.js',
              'scripts/factories/country.service.js']
            })
          }
        }
      })
      .state('dashboard.languages', {
        templateUrl: 'views/languages.html',
        url: '/languages',
        controller: 'LanguageCtrl',
        resolve: {
          loadMyFile: function($ocLazyLoad){
            return $ocLazyLoad.load({
            name: 'WTCBack',
            files: ['scripts/controllers/languages.js',
            'scripts/factories/languages.service.js']
            })
          }
        }
      })
      .state('dashboard.mongo',{
        templateUrl:'views/mongo.html',
        url:'/mongo',
        controller:'MongoCtrl',
        resolve: {
          loadMyFile: function($ocLazyLoad){
            return $ocLazyLoad.load({
            name: 'WTCBack',
            files: [
              'scripts/controllers/mongo.js'
          ]})
         }
        }
      })
      .state('dashboard.log',{
        templateUrl: 'views/logs.html',
        url:'/log',
        controller: 'LogCtrl',
        resolve: {
          loadMyFile: function($ocLazyLoad){
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),$ocLazyLoad.load({
              name: 'WTCBack',
              files: ['scripts/controllers/logs.js']
            })
          }
        }
      })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
  }])
.run(function ($rootScope, $location) {
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


