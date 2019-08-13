'use strict';

var post = require('../controllers/postController'),
  route = require('express').Router(),
  isLogged = require('../config/middlewares/loggedUser')

// (route path, middleware, method of controller)
route.get('/', post.list_all_posts);
route.post('/', isLogged, post.create_post);
route.get('/:postId', isLogged, post.detail_post);
route.put('/:postId', isLogged, post.update_post);
route.delete('/:postId', isLogged, post.delete_post);

module.exports = route