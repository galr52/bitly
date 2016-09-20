bitly.factory('linkService',['$http', function($http){
    return{
        get: function(){
            return $http.get('/api/link');
        },
        post: function(link){
            return $http.post('/api/link', {link: link});
        }
    }
}]);