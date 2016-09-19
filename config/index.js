var configValues = require('./config');

module.exports = {
    getDbConnectionString: function(){
        return `mongodb://${configValues.database.username}:${configValues.database.password}@ds035856.mlab.com:35856/bitly`;
    }
};