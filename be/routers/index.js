'use strict';
var postRoutes = require('./postRouter'),
    userRoutes = require('./userRouter'),
    commentRoutes = require('./commentRouter'),
    route = require('express').Router()


route.use('/posts', postRoutes);
route.use('/users', userRoutes);
route.use('/comments', commentRoutes);

module.exports = route;