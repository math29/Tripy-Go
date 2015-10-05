'use strict';

angular.module('wtcApp')
  .controller('ProfileCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.map = { center: { latitude: 48.451716, longitude: -4.464693 }, zoom: 14 };

    $scope.travels = [
    	{title: 'my first travel', description: 'descriptionnnnnn !'},
    	{title: 'my second travel', description: 'descriptionnnnnn !'}
    ];
  });
