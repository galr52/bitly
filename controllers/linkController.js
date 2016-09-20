var shortid = require('shortid');
var Links = require('../models/linkModel');

var Users = require('../models/userModel');
var shortid = require('shortid');

module.exports = function(app){


    app.get('/api/link', function(req, res){
        Users.findOne({uniqueId: 'gal'})
        .populate('links')
        .exec(function (err, user) {
            if (err) throw err;

            res.json(user.links);
        });
    });

    app.post('/api/link', function(req,res){
        var newLink = Links({
            originalLink: req.body.link,
            views: 0
        });

        newLink.save(function(err, link){
            if (err) throw err;

            Users.findOne({uniqueId: 'gal'}, function(err, user){
                if (err) throw err;

                if (user){
                    user.links.unshift(link);
                    user.save(function(err){
                        if (err) throw err;
                        res.send(link);
                    });
                }
            });
        });
    })
};
