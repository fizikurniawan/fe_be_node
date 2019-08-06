'use strict';
var postRoutes = require('./postRouter'),
    route = require('express').Router()


route.use('/posts', postRoutes);

module.exports = route;