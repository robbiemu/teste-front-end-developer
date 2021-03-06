(function(){
    angular.module('app')
        .config(['$routeProvider', 'DOMÍNIOS', 'MÍDIA', 'ROUTE_LOGIN', 'ROUTE_REGISTER', 'ROUTE_DASHBOARD',
            function config($routeProvider, DOMÍNIOS, MÍDIA, ROUTE_LOGIN, ROUTE_REGISTER, ROUTE_DASHBOARD) {
                $routeProvider.
                when('/', {
                    templateUrl: DOMÍNIOS + '/mysql/dashboard.template.html',
                    controller: 'mysql_controller',
                    resolve: {
                        factory: function (Res, Auth, $location, $rootScope) {
                            checkRouting($rootScope, $location, Auth, '/login')
                            controllersAndServices(Res, {})
                        }
                    }
                }).
                when('/inicial', {
                    templateUrl: DOMÍNIOS + '/mysql/dashboard.template.html',
                    controller: 'mysql_controller',
                    resolve: {
                        factory: function (Res, Auth, $location, $rootScope) {
                            checkRouting($rootScope, $location, Auth, '/login')
                            controllersAndServices(Res, {})
                        }
                    }
                }).
                when('/' + ROUTE_DASHBOARD, {
                    templateUrl: DOMÍNIOS + '/mysql/dashboard.template.html',
                    controller: 'mysql_controller',
                    resolve: {
                        factory: function (Res, Auth, $location, $rootScope) {
                            checkRouting($rootScope, $location, Auth, '/login')
                            controllersAndServices(Res, {})
                        }
                    }
                }).

                when('/' + ROUTE_LOGIN, {
                    templateUrl: DOMÍNIOS + '/contas/login.template.html',
                    controller: 'contas_controller',
                    resolve: {
                        factory: function (Res) {
                            controllersAndServices(Res, {})
                        }
                    }
                }).

                when('/' + ROUTE_REGISTER, {
                    templateUrl: DOMÍNIOS + '/contas/register.template.html',
                    controller: 'contas_controller',
                    resolve: {
                        factory: function (Res) {
                            controllersAndServices(Res, {})
                        }
                    }
                }).

                otherwise('/')
            }
        ])

    const controllersAndServices = function (Res, Routes) {
        Res.clean_scripts()
        Res.clean_styles()

        if ('scripts' in Routes) {
            Res.script(Routes.scripts)
        }
        if ('styles' in Routes) {
            Res.style(Routes.styles)
        }
    }

    const checkRouting = function ($rootScope, $location, Auth, fallback_url, checkAdmin) {
        console.log('checking routing')
        if(fallback_url === undefined)
            throw '[routes] checkRouting - must provide a fallback_url'
        if (checkAdmin === undefined)
            checkAdmin = false

        var pass = true
        if (!Auth.isLoggedIn() || (checkAdmin && !Auth.isAdmin())) {
            pass = false
        }
        if(!pass) {
            console.log($location.path() + ' - route denied. User not logged in or authorized.')
            $location.path(fallback_url)
        }
    }

})()