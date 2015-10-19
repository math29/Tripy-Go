angular.module('wtcApp.controllers')
	.controller('BarChartCtrl', ['$scope', function($scope){
		$scope.greeting = "Retailler la page pour actualiser le diagramme";
		$scope.data = [
			{name: "Greg", score: 98},
			{name: "Ari": score: 96},
			{name:"Q": score: 75}
			];
		
	}]);