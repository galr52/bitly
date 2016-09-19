var Links = require('../models/linkModel');
var Users = require('../models/userModel');

module.exports = function(app){
    app.get('/api/setupLinks', function(req, res){
        var startLinks = [{
            originalLink: 'http://google.com',
            views: 0
        },{
            originalLink: 'http://walla.co.il',
            views: 0
        },{
            originalLink: 'http://google.com',
            views: 0
        }];

        Links.create(startLinks, function(err,results){
            Users.create([{
                name: 'gal rotem',
                uniqueId: 'gal',
                links: results
            }],function(err,userResult){
                res.send({user:userResult, links:results});
            });
            // res.send(results);
        });
    });
};