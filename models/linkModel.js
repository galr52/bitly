var mongoose = require('mongoose');
var shortid = require('shortid');

var Schema = mongoose.Schema;

var linkSchema = new Schema({
    originalLink: String,
    shortLink: {
        type: String,
        'default': shortid.generate,
        index: true,
        unique: true
    },
    views: Number
});

var Links = mongoose.model('Links', linkSchema);

module.exports = Links;