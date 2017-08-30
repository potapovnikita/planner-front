module.exports = angular.module('app').factory('Session', function(__settings) {
    return {
        get: function() {
            return localStorage.getItem(__settings.auth.tokenKey);
        },
        set: function(token) {
            localStorage.setItem(__settings.auth.tokenKey, token);
        },
        destroy: function(callback) {
            localStorage.removeItem(__settings.auth.tokenKey);
        }
    }
});