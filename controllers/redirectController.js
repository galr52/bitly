
var Links = require('../models/linkModel');
var bodyParser = require('body-parser');

module.exports = function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/:shortlink', function(req, res){
        Links.find({shortLink: req.params.shortlink}, function(err, links){
            if (err) throw err;

            console.log(JSON.stringify(links));

            if (!links[0]){
                res.redirect('/');
            }else{
                var link = links[0];
                linkView(link);
                res.redirect(link.originalLink);
            }
        });
    });
};

var linkView = function(link){
    ++link.views;
    link.save(function(err) {
      if (err)
        console.log('error')
      else
        console.log('success')
    });
}