'use strict';

var post = require('../controllers/postController'),
  route = require('express').Router()

route.get('/', post.list_all_posts);
route.post('/', post.create_post);
route.get('/:postId', post.detail_post);
route.put('/:postId', post.update_post);
route.delete('/:postId', post.delete_post);

module.exports = route