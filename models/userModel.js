var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    uniqueId: {
        type: String,
        index: true,
        unique: true
    },
    links: [Schema.Types.ObjectId],
    name: String
});

var Users = mongoose.model('Users', userSchema);

module.exports = Users;