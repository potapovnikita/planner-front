module.exports = angular.module('app').factory('Auth', function(Rest, Session, __api) {
    return {
        signIn: (user, callback) => {
            Rest.post(__api.auth.in, user).then((res) => {
                Session.set(res.data.token || '');
                callback(null);
            }, callback);
        },
        signUp: (user, callback) => {
            Rest.post(__api.auth.up, user).then((res) => {
                Session.set(res.data.token || '');
                callback(null);
            }, callback);
        },
        signOut: (callback) => {
            Rest.post(__api.auth.out).then((res) => {
                Session.destroy();
                callback(null, true);
            }, callback)
        },
        check: function(callback) {
            callback(null, true)
        }
    }
});
