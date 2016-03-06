//our model for each page has a String for the title and a String for the content of the page itself
var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
  title: String,
  content: String
});

module.exports = mongoose.model('wikipages', pageSchema);