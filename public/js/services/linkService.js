bitly.factory('linkService', ['$http', function ($http) {
    return {
        get: function () {
            return $http.get('/api/link');
        },
        post: function (link) {
            return $http.post('/api/link', { link: link });
        },
        update: function (link) {
            return $http.put('/api/link', { link: link });
        },
        remove: function (link) {
            return $http.delete('/api/link/' + link._id);
        }
    }
}]);