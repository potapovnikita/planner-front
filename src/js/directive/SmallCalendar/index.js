
module.exports = angular.module('app').directive('smallCalendar', directive)

function directive() {
	return {
		template: require('./view.html'),
		scope: {
			time: '=',
			options: '=?'
		},
		link: function (scope) {
			scope.showCalendar = false;
			scope.showTimePanel = false;

			var timeInfo;
			scope.getDate = (date) => {
				scope.showCalendar = false;
				if (scope.options.controller === 'task'){
					scope.todoTime = {
						hours: 0,
						minutes: 0
					};
					scope.showTimePanel = true;
					timeInfo = date;
				}
				else {
					scope.time = date;
				}

				console.log (date)
				console.log (timeInfo)
				console.log ("1:" + scope.todoTime.hours)
				console.log ("2:" + scope.todoTime.minutes)
			};

			scope.todoTime = {
				hours: '',
				minutes: ''
			};

			scope.saveTimeTodo = () => {
				timeInfo = moment(timeInfo).hours(scope.todoTime.hours).minutes(scope.todoTime.minutes).format();
				scope.time = timeInfo;
				console.log (timeInfo)
				scope.showTimePanel = false;
			};

			scope.checkTime = () => {
				return scope.todoTime.hours >= 0
				&& scope.todoTime.hours
				&& scope.todoTime.hours < 24
				&& scope.todoTime.minutes >= 0
				&& scope.todoTime.minutes
				&& scope.todoTime.minutes <= 60
			}
			console.log(scope.options.controller)


		},
		controller: function ($scope, Calendar) {

			$scope.month = Calendar.getMonth(0);

			var indexMonth = 0;

			

			$scope.goNextMonth = () => {
				$scope.month = Calendar.getMonth(++indexMonth);
			}

			$scope.goPrevMonth = () => {
				$scope.month = Calendar.getMonth(--indexMonth);
			}
			$scope.goPrevYear = () => {
				$scope.month = Calendar.getMonth(indexMonth=indexMonth-12);
			}
			$scope.goNextYear = () => {
				$scope.month = Calendar.getMonth(indexMonth=indexMonth+12);
			}
			$scope.checkCurrentDay = (day) => {
				return moment(day).format('DD') === moment().format('DD')
				&& moment(day).format('MM') === moment().format('MM')
				&& moment(day).format('YY') === moment().format('YY')
			}

		} 
	};
}
