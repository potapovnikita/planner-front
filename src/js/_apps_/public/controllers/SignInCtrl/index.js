module.exports = angular.module('app').controller('SignInCtrl', function($scope, $window, $location, Auth, User) {

	$scope.user = User;
    
    // Clear error
    $scope.clearMessages = () => {
    	$scope.err = false;
    }
    
    // Sign in action
    $scope.signIn = () => {
        Auth.signIn($scope.user, (err) => {
            if (err && err.status === 404) return $location.path('/signup');
            if (err && err.status === 403) return $scope.err = true;
            if (err) return console.log(err); // TODO: show error message

            $window.location.href = '/';
        })
    }
});





