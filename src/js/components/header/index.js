module.exports = angular.module('app').component('header', {
	template: require('./view.html'),
	controller: controller
});

function controller($scope, $window, Auth, $location) {
    $scope.signOut = function() {
        Auth.signOut(function(err, res) {
            $window.location.href = '/';
        });
    };

    $scope.checkPath = () => {
    	return location.pathname != '/' ;
    };

    $scope.goBack = (back) => {
        $location.path('/');
    }
}

require("../../factories/auth.js");
require("../../factories/rest");
require("../../factories/session");
require("../../models/user");
