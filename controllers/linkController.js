var shortid = require('shortid');
var Links = require('../models/linkModel');

var Users = require('../models/userModel');
var shortid = require('shortid');

module.exports = function (app) {


    app.get('/api/link', function (req, res) {
        Users.findOne({ uniqueId: 'gal' })
            .populate('links')
            .exec(function (err, user) {
                if (err) throw err;

                res.json(user.links);
            });
    });

    app.post('/api/link', function (req, res) {
        var newLink = Links({
            originalLink: req.body.link,
            views: 0
        });

        newLink.save(function (err, link) {
            if (err) throw err;

            Users.findOne({ uniqueId: 'gal' }, function (err, user) {
                if (err) throw err;

                if (user) {
                    user.links.unshift(link);
                    user.save(function (err) {
                        if (err) throw err;
                        res.send(link);
                    });
                }
            });
        });
    });

    app.put('/api/link', function (req, res) {
        Links.findOneAndUpdate({ _id: req.body.link._id }, { $set: { originalLink: req.body.link.originalLinkBackup } }, function (err, doc) {
            if (err) {
                console.log("Something wrong when updating data!");
            }

            console.log(doc);
        });
    });

    app.delete('/api/link/:id', function (req, res) {
        Links.findByIdAndRemove(req.params.id, {}, function (err, doc) {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            res.send(200);
            // console.log(doc);
        });
    });
};
