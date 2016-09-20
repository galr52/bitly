var configValues = require('./config');

module.exports = {
    getDbConnectionString: function(){
        return `mongodb://${configValues.database.username}:${configValues.database.password}@ds035856.mlab.com:35856/bitly`;
    },
    files:[
        'angular/angular.js',
        'angular/angular-route.js',
        'app.js',
        'route.js',
        'services/userService.js',
        'controllers/mainController.js'
    ]
};