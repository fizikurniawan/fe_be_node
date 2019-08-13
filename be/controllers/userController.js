'use strict';

var mongoose = require('mongoose'),
   User = mongoose.model('Users'),
   bcrypt = require('bcrypt-nodejs'),
   jwt = require('jsonwebtoken');

exports.register = function(req, res){
    var new_user = new User(req.body);
    new_user.hash_password = bcrypt.hashSync(req.body.password);

    new_user.save(function(err, user){
        if(err) res.status(500).send({msg: err.message});
        res.json(user);
    });
};

exports.login = function(req, res){
    var expired = '1d',
      secret_key = "RESTFULAPIs",
      token_encode = ''
  
    User.findOne({email: req.body.email
        }, function(err, user){
          if(err) throw err;
          if(user && user.comparePassword(req.body.password)){
            token_encode = jwt.sign(
              {email: user.email, name: user.name, _id: user._id, is_active: user.is_active},
              secret_key,
              {expiresIn: expired}
            )
            return res.json({token: token_encode});
          }else{
            res.status(401).json({ message: 'Authentication failed. Please Check your email or password!' });
          }
        }
    ).select("+hash_password")
};