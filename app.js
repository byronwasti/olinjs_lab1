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
app.get('/api/page', index.getPage);
app.post('/api/page', index.postPage);
app.put('/api/page', index.editPage);
app.delete('/api/page', index.deletePage);

app.listen(process.env.PORT || 3000);
