module.exports = angular.module('app').controller('IndexCtrl', function($scope, $location) {

	$scope.appEnter = function(signin){
		$location.path('/signin');
	} 
});