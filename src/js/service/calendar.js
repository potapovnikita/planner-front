var moment = require('moment');

module.exports = angular.module('app').service('Calendar', function() {
	this.getMonth = (index) => {
		index = index ? index : 0;
		var StartDayOfCurrentMonth = moment().add(index, 'months').startOf('month');
		var EndDayOfCurrentMonth = moment().add(index, 'months').endOf('month');
		var month = {
			title: StartDayOfCurrentMonth.format(),
			days: []
		}

		var daysPrevMonth = StartDayOfCurrentMonth.weekday();
		var firstItemCalendar = daysPrevMonth === 0 ? -5 : (1 - daysPrevMonth) + 1;
		var daysNextMonth = EndDayOfCurrentMonth.weekday();
		var lastItemCalendar = StartDayOfCurrentMonth.daysInMonth() + ((6 - daysNextMonth) + 1);

		for (var i = firstItemCalendar; i <= lastItemCalendar; i++) {
			month.days.push({
				mute: (StartDayOfCurrentMonth > moment(new Date(StartDayOfCurrentMonth.year(), StartDayOfCurrentMonth.month(), i)) || 
					EndDayOfCurrentMonth < moment(new Date(StartDayOfCurrentMonth.year(), StartDayOfCurrentMonth.month(), i))),

				date: moment(new Date(StartDayOfCurrentMonth.year(), StartDayOfCurrentMonth.month(), i)).format(),
				todoInDays:[]
			});
		}
		return month;
		console.log(month);
	}
});
