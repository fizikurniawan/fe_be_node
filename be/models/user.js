var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var PostSchema = new Schema({
    name :String,
    email: {
        type: String,
        unique:true,
        lowercase: true,
        trim: true,
        required: true,
        dropDups: true
    },
    bio: String,
    gender: [0, 1, 2],
    hash_password: {
        type: String,
        required: true,
        select: false
    },
    is_active: {
        type: Number,
        required: true,
        default: 0
    },
    joined_at: { type: Date, default: Date.now },
    
});

PostSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model('Users', PostSchema);