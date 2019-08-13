'use strict';
var postRoutes = require('./postRouter'),
    userRoutes = require('./userRouter'),
    route = require('express').Router()


route.use('/posts', postRoutes);
route.use('/users', userRoutes);

module.exports = route;