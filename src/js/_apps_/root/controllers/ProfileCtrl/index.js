'Use Strict'

import settings from '../../../../../conf/settings.json'
import api from '../../../../../conf/api.json'

module.exports = angular.module('app').controller('ProfileCtrl', controller); 

function controller($scope, User, Data, $window) {


	$scope.options = {
		controller: 'profile'
	}

	console.log(User)
	$scope.user = User;
	$scope.avatar = User.avatar;
	$scope.sessions = User.sessions;

	$scope.getSession = (session) => {
		return session.device + ', '+ session.os + ', ' + session.browser;
	}

	$scope.delSession = (index, session) => {
		Data.delSession(session._id).then((res) => {
			User.sessions.splice(index,1);
			if ($scope.checkCurrentSession(session)) {
				localStorage.removeItem("session");
				$window.location.href = '/';
			}
		})
	}

	$scope.checkCurrentSession = (session) => {
		return session.token === localStorage.getItem(settings.auth.tokenKey);
	}

	$scope.checkData = () => {
		return ($scope.user.name && $scope.user.birthday);
	}

	$scope.saveData = () => {
		Data.saveUserInfo($scope.user);
		console.log('Данные сохранены');
		return;
	};

	$scope.getAvatar = (avatar) => {
		return settings.backend + avatar;
	}
}