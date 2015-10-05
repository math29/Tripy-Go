'use strict';

angular.module('wtcApp')
    .controller('StartWithCtrl', function ($scope, $http, socket, Auth, $window) {

        $scope.newTravel = {
        	author: Auth.getCurrentUser(),
            date_departure: null,
            date_return: null,
            month_departure: null,
            choose_by_dates: false,
            choose_by_month: false,
            personal_interest: {},
            selectedHashtags: []
        };

        /*****************************************************/
        //              New Travel Gesture
        /*****************************************************/

        $scope.addTrip = function() {
    		$http.post('/api/travels', $scope.newTravel).success(function(travel) {
                // console.log("/find_a_place/newTravel?travelID=" + travel._id);
                $window.location.href = '/find_a_place/' + travel._id;
            });
        };

        // Grab the initial set of available travels
      //   $http.get('/api/travels').success(function(travels) {
    		// $scope.travels = travels;

    		// // Update array with any new or deleted items pushed from the socket
    		// socket.syncUpdates('travel', $scope.travels, function(event, travel, travels) {
    		// 	// This callback is fired after the travels array is updated by the socket listeners
    		// 	// sort the array every time its modified
    		// 	travels.sort(function(a, b) {
    		// 		a = new Date(a.date_created);
    		// 		b = new Date(b.date_created);
    		// 		return a>b ? -1 : a<b ? 1 : 0;
    		// 	});
    		// });
      //   });

        /*****************************************************/
        //              Hashtags Definition
        /*****************************************************/

        $scope.allHashtags = [];

        // Grab the initial set of available hashtags
        $http.get('/api/hashtags').success(function(allHashtags) {
            $scope.allHashtags = allHashtags;
            socket.syncUpdates('hashtag', $scope.allHashtags);
            // console.log($scope.allHashtags);
        });

        $scope.createHashtag = function() {
            if($scope.newHashtag === '' || isInArray($scope.newHashtag, $scope.allHashtags)) {
                return;
            }
            $http.post('/api/hashtags', $scope.newHashtag);
            $scope.newHashtag = {};
        };

        $scope.addHashtag = function(hashtag) {
            if(!isInArray(hashtag, $scope.newTravel.selectedHashtags)){
                $scope.newTravel.selectedHashtags.push(hashtag);
            }
        }

        $scope.deSelectHashtag = function(hashtag) {
            var index = $scope.newTravel.selectedHashtags.indexOf(hashtag);
            if (index > -1) {
                $scope.newTravel.selectedHashtags.splice(index, 1);
            }
        }

        // Usefull method that allow us to check if is or not in array (Return True if it is !)
        function isInArray(value, array) {
            return array.indexOf(value) > -1;
        }


        // Clean up listeners when the controller is destroyed
        $scope.$on('$destroy', function () {
    		// socket.unsyncUpdates('travel');
            socket.unsyncUpdates('hashtag');
        });



        /*****************************************************/
        //              DatePicker Definition
        /*****************************************************/

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

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        /* ======== Datepicker Popup gesture ========== */

        // Definition
        $scope.open = function($event, select) {
            switch(select){
                case "date_departure":
                    $scope.status.date_departure = true;
                    break;
                case "date_return":
                    $scope.status.date_return = true;
                    break;
                case "month_departure":
                    $scope.status.month_departure = true;
                    break;
            }
        };

        //Initilisation
        $scope.status = {
            date_departure: false,
            date_return: false,
            month_departure: false
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
    });