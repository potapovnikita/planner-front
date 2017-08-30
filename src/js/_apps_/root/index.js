'use strict'

module.exports = function(settings, api, user) {
    let app = angular.module('app', ['ngRoute'])
    .constant('__settings', settings)
    .constant('__routing', require('./routing.json'))
    .constant('__api', require('../../../conf/api.json'))
    .run((User, __routing, __api) => {
        User.init(user)
    })
    .config(function($routeProvider, $locationProvider, $httpProvider, __routing) {

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

            //Set Http Interceptor
            $httpProvider.interceptors.push('HttpInterceptor');

        })

    require('./controllers/IndexCtrl/index.js');
    require('./controllers/ProfileCtrl/index.js');
    require('./controllers/CalendarCtrl/index.js');
    require('./controllers/TasksCtrl/index.js');
    require('../../factories/auth');
    require('../../factories/check');
    require('../../factories/rest');
    require('../../factories/session');
    require('../../factories/http');
    require('../../factories/data.js');
    require('../../factories/http.js');
    require('../../components/header/index.js');
    require('../../models/user.js');
    require('../../service/calendar.js');
    require('../../directive/SmallCalendar/index.js');
}