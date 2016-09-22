bitly.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/',{
        templateUrl: 'views/main.html',
        controller: 'mainController',
        controllerAs: 'vm'
    })
    .otherwise({
        redirectTo: '/'
    });
}])