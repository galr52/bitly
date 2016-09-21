var configValues = require('./config');
var files =[
        'angular/angular.js',
        'angular/angular-route.js',
        'ng-table/ng-table.js',
        'app.js',
        'directives/demo.js',
        'route.js',
        'services/userService.js',
        'services/linkService.js',
        'controllers/mainController.js'
    ];

module.exports = {
    getDbConnectionString: function(){
        return `mongodb://${configValues.database.username}:${configValues.database.password}@ds035856.mlab.com:35856/bitly`;
    },
    getFiles: function(){
        if (configValues.dev)
            return files.slice(0);
        return configValues.prod.slice(0);
    },
    isDev: function(){
        return configValues.dev;
    }
    
};