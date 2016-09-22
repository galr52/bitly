angular.module("bitly").controller("mainController", mainController);
mainController.$inject = ['$scope', '$rootScope', 'userService', 'linkService', '$window'];

function mainController($scope, $rootScope, userService, linkService, $window) {
    var self = this;

    self.links = [];
    self.newLink = '';
    self.baseUrl = $window.location.origin; //$window.location.host;

    userService.get().then(function (user) {
        $rootScope.user = user.data;
    });

    linkService.get().then(function (links) {
        self.links = links.data;
    });

    self.addNewLink = function () {
        if (self.newLink.trim().length > 0) {
            linkService.post(self.newLink).then(function (link) {
                self.links.unshift(link.data);
                self.newLink = '';
            });
        }
    };

    self.startEditMode = function (link) {
        link.isEditMode = true;
        link.originalLinkBackup = link.originalLink;
    };

    self.stopEditMode = function (link) {
        link.isEditMode = false;

        if (link.originalLink.trim() !== link.originalLinkBackup.trim()) {
            var temp = link.originalLink;
            link.originalLink = link.originalLinkBackup;
            link.originalLinkBackup = temp;

            linkService.update(link).then(function (response) {
                link.originalLink = link.originalLinkBackup;
                link.originalLinkBackup = '';
            });
        }
    };

    self.del = function (link) {
        linkService.remove(link).then(function (response) {
            _.remove(self.links, function (item) {
                return item._id === link._id;
            });
        });
    };
}