'use strict';

module.exports = function(settings) {
    let app = angular.module('app', ['ngRoute'])
        .constant('__settings', settings)
        .constant('__routing', require('./routing.json'))
        .constant('__api', require('../../../conf/api.json'))
        .config(function($routeProvider, $locationProvider, __routing) {

            // Enable HTML5 location mode
            $locationProvider.html5Mode(true);

            // Build routes by routing.json
            __routing.forEach(function(route) {
                $routeProvider.when(route.uri, {
                    controller: route.controller,
                    template: require('./controllers/' + route.controller + '/view.html'),
                    resolve: {
                        factory: function($rootScope, $q) {
                            return $q(function(resolve) {
                                // Init app environment
                                $rootScope.title = route.title;
                                resolve(true);
                            });
                        }
                    }
                });
            });

            // Set unresolved(otherwise) route
            $routeProvider.otherwise({
                redirectTo: '/'
            });

        })
        .run((__routing) => {
            console.log('Public App Runned');
        });

    // Bootstrap dependencies
    require('../../factories/auth');
    require('../../factories/check');
    require('../../factories/rest');
    require('../../factories/session');
    require('./controllers/IndexCtrl/index.js');
    require('./controllers/SignInCtrl/index.js');
    require('./controllers/SignUpCtrl/index.js');
    require('../../models/user');
}