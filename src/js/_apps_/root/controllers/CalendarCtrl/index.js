module.exports = angular.module('app').controller('CalendarCtrl', controller);

function controller ($scope, Calendar, User, Data) {
	$scope.user = User;
	$scope.month = Calendar.getMonth(0);
	

	function pushTodoinDays() {
		User.todo.forEach((todo) => {
			todo.show = false;
			$scope.month.days.forEach((day) => {
				if (day.date <= todo.time
					&& todo.time <= moment(day.date).endOf('day').format()
					&& todo.status === false) {
					day.todoInDays.push(todo);
			}
		})
		})
	};

	pushTodoinDays();
	
	$scope.limit = 2;
	console.log ($scope.limit);
	$scope.showMore = false;
	var indexMonth = 0;

	$scope.goNextMonth = () => {
		$scope.month = Calendar.getMonth(++indexMonth);
		pushTodoinDays();
	}

	$scope.goPrevMonth = () => {
		$scope.month = Calendar.getMonth(--indexMonth);
		pushTodoinDays();
	}

	$scope.goPrevYear = () => {
		$scope.month = Calendar.getMonth(indexMonth=indexMonth-12);
		pushTodoinDays();
	}
	$scope.goNextYear = () => {
		$scope.month = Calendar.getMonth(indexMonth=indexMonth+12);
		pushTodoinDays();
	}

	$scope.todoTime = {
		hours: '',
		minutes: ''
	};

	$scope.checkTime = () => {
		return $scope.todoTime.hours >= 0
		&& $scope.todoTime.hours
		&& $scope.todoTime.hours < 24
		&& $scope.todoTime.minutes >= 0
		&& $scope.todoTime.minutes
		&& $scope.todoTime.minutes <= 60
	}
	
	$scope.changeStatusFullInfo = (todoInDay) => {
		todoInDay.show = !todoInDay.show;


		$scope.todoTime.hours = moment(todoInDay.time).hours();
		$scope.todoTime.minutes = moment(todoInDay.time).minutes();
	}

	//$scope.ShowTodoInfo = () => {
		//showTodoInfo = !showTodoInfo;
		//console.log($scope.showTodoInfo);
	//}

};