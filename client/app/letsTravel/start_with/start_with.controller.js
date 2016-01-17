'use strict';

angular.module('wtcApp')
    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization,places' // Required for SearchBox.
        });
    })
    .controller('StartWithCtrl', function ($scope, $http, socket, Auth, $window, $routeParams) {
        // First focus of the MAP
        $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };

        // Get Travel if concerned
        $scope.travelID = $routeParams.travelID;
        if($scope.travelID != "new" ){
            $scope.newTravel = $http.get('/api/travels/' + $scope.travelID);
        }else{
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
        }

        /*****************************************************/
        //              New Travel Gesture
        /*****************************************************/

        $scope.addTrip = function() {
    		$http.post('/api/travels', $scope.newTravel).success(function(travel) {
                // console.log("/find_a_place/newTravel?travelID=" + travel._id);
                $window.location.href = '/find_a_place/' + travel._id;
            });
        };
    });
