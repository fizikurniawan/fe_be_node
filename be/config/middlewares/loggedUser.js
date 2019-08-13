'use strict';
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    var headers = req.headers || 'Nojwt' , 
    authorization = headers.authorization || 'Nojwt',
    JWT = authorization.split(' '),
    current_time = new Date().getTime()/1000

  if(headers && authorization && JWT[0] === 'JWT'){
    try{
        jwt.verify(JWT[1], 'RESTFULAPIs', function(err, decode){
            if (err){
              req.user = false;
              res.status(403).json({message: 'Unauthorized User!'});
            }else{
              req.user = decode;
            }
            next();
        })
    }catch{
        res.status(403).json({message: 'Unauthorized User!'});
    }
  }else{
    req.user = false;
    res.status(403).json({message: 'Unauthorized User!'});
  }
};
