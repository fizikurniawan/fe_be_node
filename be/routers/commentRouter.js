'use strict';

var comment = require('../controllers/commentController'),
  loggedUser = require('../config/middlewares/loggedUser'),
  route = require('express').Router()


route.post('/', loggedUser, comment.addComment);
route.get('/:post_id', comment.getComments);

module.exports = route