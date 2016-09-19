var express = require('express');
var app = express();
var config = require('./config');
var mongoose = require('mongoose');
var setupController = require('./controllers/setupController');
var redirectController = require('./controllers/redirectController');
var linkController = require('./controllers/linkController');
var homeController = require('./controllers/homeController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect(config.getDbConnectionString());
homeController(app);
setupController(app);
linkController(app);
redirectController(app);

app.listen(port);