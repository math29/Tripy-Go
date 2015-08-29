'use strict';

angular.module('wtcApp')
  .controller('StartWithCtrl', function ($scope, $http, socket, Auth) {
    $scope.message = 'Hello';

    $scope.newTravel = {
    	author: Auth.getCurrentUser()
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
  });
