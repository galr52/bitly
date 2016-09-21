angular.module("bitly").controller("mainController", mainController);
mainController.$inject = ['$scope', '$rootScope', 'userService', 'linkService', '$window', 'NgTableParams', '$resource', 'linksService'];

function mainController
    //bitly.controller('mainController', ['$scope', '$rootScope', 'userService', 'linkService', '$window', 'NgTableParams', function 
    ($scope, $rootScope, userService, linkService, $window, NgTableParams, $resource, linksService) {
    var self = this;

    self.links = [];
    self.newLink = '';
    self.baseUrl = $window.location.host;
    // var originalData = self.links;

    // var self = $scope;

    var data = [{ name: "Moroni", age: 50 },
        { id: 1, name: "Gal", age: 23 }, { id: 2, name: "Shai", age: 13 }, { id: 3, name: "Rani", age: 27 }
        , { id: 4, name: "Tal", age: 25 }, { id: 5, name: "Nitzan", age: 56 }, { id: 6, name: "Ruti", age: 54 }, { id: 7, name: "Niki", age: 4 }
        , { id: 8, name: "Chen", age: 13 }, { id: 9, name: "Badi", age: 16 }, { id: 10, name: "Lishe", age: 88 }, { id: 11, name: "Dipa", age: 55 }
        , { id: 12, name: "Dudi", age: 27 }, { id: 13, name: "Lior", age: 27 }, { id: 14, name: "Noy", age: 23 }, { id: 15, name: "John", age: 36 } /*,*/];

    userService.get().then(function (user) {
        $rootScope.user = user.data;
    });

    linkService.get().then(function (links) {
        self.links = links.data;
        // console.log(JSON.stringify(self.links));
        // console.log(JSON.stringify(angular.copy(self.links)));

        // self.tableParams.settings({
        //     dataset: angular.copy(self.links)
        // });
    });

    self.addNewLink = function () {
        if (self.newLink.trim().length > 0) {
            linkService.post(self.newLink).then(function (link) {
                self.links.unshift(link.data);
                self.newLink = '';
            });
        }
    };


    // var Api = $resource("/api/link");
    this.tableParams = new NgTableParams({}, {
        getData: //function (params) {
        //     // ajax request to api
        //     return linksService.$promise.then(function (data) {
        //         params.total(data.inlineCount); // recal. page nav controls
        //         self.links = angular.copy(data.results);
        //         return data.results;
        //     });
        // }
        function (params) {
            return linksService.query({
                page: params.page(),
                per_page: params.count(),

                state: 'all',
                username: 'esvit',
                repo: 'ng-table'
            }, function (data, headersGetter) {

                params.total(data.inlineCount);
                return data.results;
            }).$promise;
        }
    });
    // self.tableParams = new NgTableParams({}, {
    //   filterDelay: 0,
    //   dataset: angular.copy(simpleList)
    // });

    self.cancel = cancel;
    self.del = del;
    self.save = save;

    //////////

    function cancel(row, rowForm) {
        var originalRow = resetRow(row, rowForm);
        angular.extend(row, originalRow);
    }

    function del(row) {
        _.remove(self.tableParams.settings().dataset, function (item) {
            return row === item;
        });
        self.tableParams.reload().then(function (data) {
            if (data.length === 0 && self.tableParams.total() > 0) {
                self.tableParams.page(self.tableParams.page() - 1);
                self.tableParams.reload();
            }
        });
    }

    function resetRow(row, rowForm) {
        row.isEditing = false;
        rowForm.$setPristine();
        self.tableTracker.untrack(row);
        return _.findWhere(originalData, function (r) {
            return r.id === row.id;
        });
    }

    function save(row, rowForm) {
        var originalRow = resetRow(row, rowForm);
        angular.extend(originalRow, row);
    }
}
//}]);