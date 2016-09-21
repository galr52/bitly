var config = require('../config');

module.exports = function (app) {
    app.get('/api/config/scripts', function (req, res) {
        res.json(config.getFiles());
    });
}