module.exports = angular.module('app').factory('Rest', function($http, __settings) {
    return {
        get: function(uri) {
            return $http.get(__settings.backend + uri);
        },
        delete: function(uri) {
            return $http.delete(__settings.backend + uri);
        },
        post: function(uri, data) {
            return $http.post(__settings.backend + uri, data);
        },
        put: function(uri, data) {
            return $http.put(__settings.backend + uri, data);
        },
        patch: function(uri, data) {
            return $http.patch(__settings.backend + uri, data);
        }
    }
});