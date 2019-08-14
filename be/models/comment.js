var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comments = new Schema({
    comment :String,    
    postId :String,
    is_anonymous : Boolean,
    user_id : String,
    created_at : { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comments', Comments);