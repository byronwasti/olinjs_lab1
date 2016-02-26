var express = require('express');
var db = require('./db');

var index = require('./routes/index')();

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

// Base Routes
app.get('/', index.home);

app.listen(process.env.PORT || 3000);
