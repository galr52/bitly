bitly.factory('linkService',['$http', function($http){
    return{
        get: function(){
            return $http.get('/api/link');
        }
    }
}]);