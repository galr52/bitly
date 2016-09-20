bitly.controller('mainController',['$scope','$rootScope','userService','linkService', '$window', function($scope,$rootScope,userService,linkService,$window){
    $scope.links = [];
    $scope.newLink = '';
    $scope.baseUrl = $window.location.host;

    userService.get().then(function(user){
        $rootScope.user = user.data;
    });

    linkService.get().then(function(links){
        $scope.links = links.data;
    });

    $scope.addNewLink = function(){
        linkService.post($scope.newLink).then(function(link){
            $scope.links.unshift(link.data);
            $scope.newLink = '';
        });
    };
}]);