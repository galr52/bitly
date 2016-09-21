bitly.factory('userService', ['$http', function ($http) {
    return {
        get: function () {
            return $http.get('/api/user');
        }
    }
}]);