var shortid = require('shortid');
var Links = require('../models/linkModel');

var Users = require('../models/userModel');
var shortid = require('shortid');
var currentUser;

Users.find({uniqueId: 'gal'}, function(err, users){
    if (err) throw err;

    if (users[0]) currentUser =  users[0];
});

module.exports = function(app){


    app.get('/api/link', function(req, res){
        if (currentUser) 
            res.send(currentUser.links);
        // Users.find({uniqueId: 'gal'}, function(err, users){
        //     if (err) throw err;

        //     console.log(JSON.stringify(users));

        //     if (users[0]){
        //         var user = users[0];
        //         res.send(user.links);
        //     }
        // });
    });

    app.post('/api/link', function(req,res){
        var newLink = Links({
            originalLink: req.body.link,
            views: 0
        });

        newLink.save(function(err, link){
            if (err) throw err;

            Users.find({uniqueId: 'gal'}, function(err, users){
                if (err) throw err;

                if (users[0]){
                    var user = users[0];
                    user.links.push(link);
                    user.save(function(err){
                        if (err) throw err;
                        res.send(link);
                    });
                }
            });
        });
    })
};
