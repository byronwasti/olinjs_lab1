var express = require('express');
var db = require('./db');
var sassMiddleware = require('node-sass-middleware');

var index = require('./routes/index')();

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.use(logger('dev'));
app.use(sassMiddleware({
  src: path.join(__dirname, '/sass'),
  dest: path.join(__dirname, '/public/styles'),
  debug: true,
  outputStyle: 'compressed',
  response: false,
  prefix: '/styles'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

// Base Routes
app.get('/api/titles', index.getTitles);
app.get('/api/page', index.getPage);
app.post('/api/page', index.postPage);
app.put('/api/page', index.editPage);
app.delete('/api/page', index.deletePage);

app.listen(process.env.PORT || 3000);
