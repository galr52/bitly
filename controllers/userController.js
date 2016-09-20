var Users = require('../models/userModel');

module.exports= function(app){
    app.get('/api/user', function(req, res){
        Users.findOne({ uniqueId: 'gal'}, function(err, user){
            if (err) throw err;

            if (user) 
                res.json(user);
        });
    });
}

