var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: String,
  description: String,
  author: String,
  published_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Posts', PostSchema);