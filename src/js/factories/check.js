module.exports = angular.module('app').factory('Check', function() {

    // Email regexp
    var regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    // Factory methods
    return {
        email: function(email) {
            if (!email) return false;
            if (email.length < 0) return false;
            return regexEmail.test(email);
        },
        password: function(password) {
            if (!password) return false;
            return (password.length > 7);
        }
    }
});