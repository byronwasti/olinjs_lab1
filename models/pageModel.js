//our model for each page has a String for the title and a String for the content of the page itself
var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
  title: String,
  content: String
});

// Technically Mongoose authomatically looks for the plural version of your collection name --> i.e. "Wikipages" instead of "wikipages"
module.exports = mongoose.model('wikipages', pageSchema);