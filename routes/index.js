//function that returns an object holding our routes
var Page = require('../models/pageModel.js');

module.exports = function(){
    return {
    	//gets all the pages from the database and only selects the titles and the ids to send to the client
        getTitles: function(req, res){
        	Page.find({}, function(err, pages){
        		if (err){
        			res.send(err).status(500);
        			console.error(err);
        		} else {
        			var titles = pages.map(function(page){
        				return {title:page.title, _id:page._id};
        			});
        			titles = {titles: titles};
        			res.json(titles);
        		}
        	});
        },
        //given an id from the client, we find that page by the id and send it to the client
      	getPage: function(req, res){
      		Page.findById(req.query.id, function(err, page){	//we chose to use query to store the id but we could have also used the body
      			if (err){
        			res.send(err).status(500);
        			console.error(err);
        		} else {
        			res.json(page);
        		}
      		});
        },
        //given a title and content in the request's body from the client, we check if they are empty and raise an error if they are.
        //Otherwise we create a new page and save it to the database
        postPage: function(req, res){
            if( req.body.title == '' || req.body.content == '' ){
                return res.send("Invalid page request").status(500);
            }
        	var newPage = new Page({title: req.body.title, content: req.body.content});
        	newPage.save(function(err, page){
        		if (err){
        			res.send(err).status(500);
        			console.error(err);
        		} else {
        			res.json(page);	//not optimistically showing the created page, we wait until it's saved in the database before sending to client
        		}
        	});
        },
        //given an id, title, and content in the request's body, we find the page to update by id and set it's title and content to the edits
        //sent by the client
        editPage: function(req, res){
        	Page.findByIdAndUpdate(req.body.id, {title:req.body.title, content:req.body.content}, {new: true}, function(err, page){
        		if (err){
        			res.send(err).status(500);
        			console.error(err);
        		} else {
        			res.json(page);
        		}
        	});
		},
		//given an id in the request's body, we find the page in the database by the id and remove it
		deletePage: function(req, res){
			Page.findByIdAndRemove(req.body.id, function(err, removed){
			 	if (err){
			 		res.send(err).status(500);
			 		console.log("Error: ", err);
			 	} else {
			 		res.json({sucess: true});
			 	}
			});
    	}
	}
}
