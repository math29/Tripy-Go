'use strict';

angular.module('wtcApp')
  .controller('FindAPlaceCtrl', function ($scope, $routeParams) {
    $scope.message = 'Hello';
    if($routeParams.travelID == "newTravel"){
    	$scope.message = "Ceci est un nouveau Voyage !";
    }else{
    	var travelID = $routeParams.travelID;
    	$scope.message = "L'id est : " + travelID;
    }
    // console.log(id);
  });
