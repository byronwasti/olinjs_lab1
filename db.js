//sets up our connection to our database which is hosted on mongolabs
var mongoose = require('mongoose');

mongoose.connect('mongodb://olinjs:wiki@ds017688.mlab.com:17688/wikipages');
var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function(){
    console.log('Mongodb Connection Successful');
});
