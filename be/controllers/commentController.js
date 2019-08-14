'use strict';

var mongoose = require('mongoose'),
  Post = mongoose.model('Posts'),
  Comment = mongoose.model('Comments');

exports.addComment = function(req, res){
  var newComment = new Comment(req.body);
  var currentPost = Post.find({_id: req.body.post_id}, function(err, post){
    if(err) res.status(500).send({msg: err.message});
    if(post ==  '') res.json({'msg' : 'Post Not found'})
  })

  newComment.user_id = req.user
  newComment.postId = req.body.post_id

  newComment.save(function(err, comment){
    if(err) res.status(500).send({msg: err.message});
    res.json(comment);
  });
}

exports.getComments = function(req, res){
  Comment.find({"postId":req.params.post_id}, function(err, comments){
    if(err) res.status(500).send({msg: err.message});
    
    res.json(comments)
  })
}
