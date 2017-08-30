module.exports = angular.module('app').controller('SignUpCtrl', function($scope, $window, Auth, User) {
	$scope.user = User;

	// Clear error
	$scope.clearMessages = () => {
		$scope.err = false;
	}
	
	$scope.signUp = () => {
		console.log($scope.user.repassword);
		if ($scope.user.password === $scope.user.repassword) {
			Auth.signUp($scope.user, function(err, res) {
				if (err) {
					return $scope.err = true;
				}

				$window.location.href = '/';
			});
		} else {
			$scope.difpassword = true;
		}
	}
});