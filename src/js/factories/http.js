module.exports = angular.module('app').factory('HttpInterceptor', function($q, Session, __settings) {
    return {
        request: function(config) {
            config.headers[__settings.auth.headerName] = Session.get() || '';
            return config || $q.when(config);
        }
    }
});