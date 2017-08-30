module.exports = angular.module('app').controller('TasksCtrl', controller);

function controller ($scope, $timeout, User, Data){

	console.log(User)

	$scope.options = {
		controller: 'task'
	}

	$scope.user = User;
	$scope.todoData = {
		title: '',
		time: ''
	}

	$scope.addTodo = () => {
		Data.saveTodo($scope.todoData).then((res) => {
			User.todo.unshift(res.data);
			$scope.todoData = {
				title: '',
				time: ''
			}
		}, (err) => {
			console.log ('Ошибка');	
		});
	};

	$scope.checkStatusTodo = (status) => {
		let point = false;

		$scope.user.todo.forEach((item) => {
			if (item.status === status) {
				point = true; 
				return;
			}
		});
		return point;
	}

	$scope.ChangeStatusTodo = () => {
		console.log(User.todo)
		Data.changeStatusTodo(User.todo).then((res) => {
		}, (err) => {
			console.log(err);
		});
	}

	$scope.deleteTodo = (index, todo) => {
		Data.deleteTodo(todo._id).then((res) => {
			User.todo.splice(index, 1);
		});
	}

	$scope.checkField = () => {
		return ($scope.todoData.title && $scope.todoData.time); 
	}
}