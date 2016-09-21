var express = require('express');
var app = express();
var config = require('./config');
var mongoose = require('mongoose');
var setupController = require('./controllers/setupController');
var redirectController = require('./controllers/redirectController');
var linkController = require('./controllers/linkController');
var homeController = require('./controllers/homeController');
var userController = require('./controllers/userController');
var configController = require('./controllers/configController');
var bodyParser = require('body-parser');
var compressor = require('node-minify');

var port = process.env.PORT || 3000;

// compress application
// Using YUI Compressor for JS 
new compressor.minify({
  type: 'uglifyjs',
  publicFolder: 'public/js/',
  fileIn: config.getFiles(),
  fileOut: 'public/js-dist/app.min.js',
  sync: true,
  callback: function (err, min) {
    console.log(err);
    console.log(min);
  }
});

// global config
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.getDbConnectionString());

homeController(app);
setupController(app);
linkController(app);
redirectController(app);
userController(app);
configController(app);

app.listen(port);