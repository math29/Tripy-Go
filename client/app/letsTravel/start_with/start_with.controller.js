'use strict';

angular.module('wtcApp')
    .controller('StartWithCtrl', function ($scope, $http, socket, Auth) {

        $scope.newTravel = {
        	author: Auth.getCurrentUser(),
            date_departure: {},
            date_return: {}
        }

        $scope.addTrip = function() {
    		$http.post('/api/travels', $scope.newTravel);
        };

        // Grab the initial set of available comments
        $http.get('/api/travels').success(function(travels) {
    		$scope.travels = travels;

    		// Update array with any new or deleted items pushed from the socket
    		socket.syncUpdates('travel', $scope.travels, function(event, travel, travels) {
    			// This callback is fired after the comments array is updated by the socket listeners
    			// sort the array every time its modified
    			travels.sort(function(a, b) {
    				a = new Date(a.date_created);
    				b = new Date(b.date_created);
    				return a>b ? -1 : a<b ? 1 : 0;
    			});
    		});
        });

        // Clean up listeners when the controller is destroyed
        $scope.$on('$destroy', function () {
    		socket.unsyncUpdates('travel');
        });







      $scope.today = function() {
        $scope.dt = new Date();
      };
      $scope.today();

      $scope.clear = function () {
        $scope.dt = null;
      };

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      };

      $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();

      $scope.open = function($event) {
        $scope.status.opened = true;
        console.log($scope.status)
      };

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];

      $scope.status = {
        opened: false
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 2);
      $scope.events =
        [
          {
            date: tomorrow,
            status: 'full'
          },
          {
            date: afterTomorrow,
            status: 'partially'
          }
        ];

      $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i=0;i<$scope.events.length;i++){
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
      };
      console.log($scope.status)
    });