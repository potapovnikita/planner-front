module.exports = angular.module('app').controller('IndexCtrl', function($scope, $location) {

	$scope.openProfile = function(profile) {
		$location.path('/profile');
	}
	$scope.openCalendar = function(calendar) {
		$location.path('/calendar');
	}
	$scope.openTasks = function(tasks) {
		$location.path('/tasks');
	}
});
