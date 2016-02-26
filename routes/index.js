var Page = require('../models/pageModel.js');

module.exports = function(){
    return {
        home: function(req, res){
        	Page.find({}, function(err, pages){
        		if (err){
        			res.send(err).status(500);
        			console.error(err);
        		} else {
        			//send title of pages to each
        		}
        	});
        },
      	getPage: function(req, res){

        },
        postPage: function(req, res){

        },
        editPage: function(req, res){

		},
		deletePage: function(req, res){
		}
    }
}
