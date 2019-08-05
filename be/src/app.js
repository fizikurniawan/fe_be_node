const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/posts');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

//import model post
var Post = require("../models/post");

// Fetch all posts
app.get('/posts', (req, res) => {
    Post.find({}, 'title description author published_at', function (error, posts) {
      if (error) { console.error(error); }
      res.send({
        posts: posts
      })
    }).sort({_id:-1})
})

app.post('/posts', (req, res) => {
    var db = req.db;
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var published_at = new Date('2019-08-08');
    var new_post = new Post({
      title: title,
      description: description,
      author: author,
      published_at: published_at
    })
  
    new_post.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Post saved successfully!'
      })
    })
})

// Fetch single post
app.get('/post/:id', (req, res) => {
    var db = req.db;
    Post.findById(req.params.id, 'title description author', function (error, post) {
      if (error) { console.error(error); }
      res.send(post)
    })
})

// update post

app.put('/posts/:id', (req, res) => {
    var db = req.db;
    Post.findById(req.params.id, 'title description', function (error, post) {
      if (error) { console.error(error); }
  
      post.title = req.body.title
      post.description = req.body.description
      post.author = req.body.author
      post.save(function (error) {
        if (error) {
          console.log(error)
        }
        res.send({
          success: true
        })
      })
    })
})

app.delete('/posts/:id', (req, res) => {
    var db = req.db;
    Post.remove({
      _id: req.params.id
    }, function(err, post){
      if (err)
        res.send(err)
      res.send({
        success: true
      })
    })
})
  

app.listen(process.env.PORT || 8081)