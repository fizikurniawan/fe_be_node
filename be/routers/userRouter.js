'use strict';

var user = require('../controllers/userController'),
  route = require('express').Router()


route.post('/register', user.register);
route.post('/login', user.login);

module.exports = route