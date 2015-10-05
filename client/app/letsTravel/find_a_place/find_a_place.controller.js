'use strict';

angular.module('wtcApp')
  .controller('FindAPlaceCtrl', function ($scope, $routeParams) {

    $scope.map = { center: { latitude: 48.451716, longitude: -4.464693 }, zoom: 14 };
	var travelID = $routeParams.travelID;
	$scope.message = "L'id est : " + travelID;
  });
