'use strict';

angular.module('wtcApp')
    .config(function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization,places' // Required for SearchBox.
        });
    })
    .controller('FindAPlaceCtrl', function ($scope, $http, $routeParams) {

        // First focus of the MAP
        $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };

        var events = {
            // This function allow to get searchBox results + map focus on the first place founded
            // Could be improved
            // Need to add marker system
            places_changed: function (searchBox) {
                var place = searchBox.getPlaces();
                $scope.map = {
                    center: {
                        'latitude': place[0].geometry.location.lat(),
                        'longitude': place[0].geometry.location.lng()
                    },
                    zoom: 13
                };
            }
        };

        // SearchBox allowing to research a place
        $scope.searchbox = { template:'searchbox.tpl.html', events:events};

        var travelID = $routeParams.travelID;
        console.log('Let\'s find this travel');
        var travel = $http.get('/api/travels/' + travelID);
        console.log(travel);
        $scope.message = 'L\'id est : ' + travelID;
    });
