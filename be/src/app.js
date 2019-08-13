const express        = require('express');
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const cors           = require('cors')
const morgan         = require('morgan')
const model          = require('../models')
const app            = express();

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/posts');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});


var routers = require('../routers');
app.use('/api/v1', routers)

app.listen(process.env.PORT || 8081)