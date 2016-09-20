bitly.controller('mainController',['$scope','$rootScope','userService','linkService', function($scope,$rootScope,userService,linkService){
    $scope.links = [];

    userService.get().then(function(user){
        $rootScope.user = user.data;
    });

    linkService.get().then(function(links){
        $scope.links = links.data;
    });
}]);