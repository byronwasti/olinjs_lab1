var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
  title: String,
  content: String
});

module.exports = mongoose.model('wikipages', pageSchema);