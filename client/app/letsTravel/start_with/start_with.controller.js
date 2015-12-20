'use strict';

angular.module('wtcApp')
    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization,places' // Required for SearchBox.
        });
    })
    .controller('StartWithCtrl', function ($scope, $http, socket, Auth, $window) {

        // First focus of the MAP
        $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };

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
        };

        $scope.deSelectHashtag = function(hashtag) {
            var index = $scope.newTravel.selectedHashtags.indexOf(hashtag);
            if (index > -1) {
                $scope.newTravel.selectedHashtags.splice(index, 1);
            }
        };

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

        //Initilisation
        $scope.status = {
            date_departure: false,
            date_return: false,
            month_departure: false
        };

    });
