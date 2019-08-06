var mongoose = require('mongoose');
var Schema = mongoose.Schema,

var Users = new Schema({
    name :String,  
    email: String,
    bio: String,
    joined_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Users', Users);