bitly.factory('linkService', ['$http', function ($http) {
    return {
        get: function () {
            return $http.get('/api/link/username/repo');
        },
        post: function (link) {
            return $http.post('/api/link', { link: link });
        }
    }
}]);
bitly.factory('linksService', function ($resource) {
    //return $resource('/api/link/:user',{user: "@user"});

    return $resource("/api/link/:username/:repo", {
        state: "open"
    }, {
            query: {
                method: "GET",
                isArray: true
            }
        });
});