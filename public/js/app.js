var bitly = angular.module('bitly', ['ngRoute','ngSanitize']);
bitly.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|http|ftp|mailto|chrome-extension):/);
    // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
}]);