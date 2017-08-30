
module.exports = angular.module('app').service('User', function() {
	var self = this;

	this.email = '';
	this.password = '';
	this.name = '';
	this.birthday = '';
	this.todo = [];
	this.sessions = [];

	this.init = function(user) {
		self.email = user.email;
		self.name = user.name;
		self.birthday = user.birthday;
		self.todo = user.todo;
		self.sessions = user.sessions;
		self.avatar = user.avatar;
	}
});