var configValues = require('./config');
var files = [
    'lodash/lodash.js',
    'angular/angular.js',
    'angular/angular-route.js',
    'angular/angular-sanitize.js',
    'app.js',
    'directives/focusMe.js',
    'route.js',
    'services/userService.js',
    'services/linkService.js',
    'controllers/mainController.js'
];

module.exports = {
    getDbConnectionString: function () {
        return `mongodb://${configValues.database.username}:${configValues.database.password}@ds035856.mlab.com:35856/bitly`;
    },
    getFiles: function () {
        if (configValues.dev)
            return files.slice(0);
        return configValues.prod.slice(0);
    },
    isDev: function () {
        return configValues.dev;
    }

};