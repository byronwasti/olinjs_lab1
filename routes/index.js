var Page = require('../models/pageModel.js');

module.exports = function(){
    return {
        home: function(req, res){
        	Page.find({}, function(err, pages){
        		if (err){
        			res.send(err).status(500);
        			console.error(err);
        		} else {
        			var titles = pages.map(function(page){
        				return page.title;
        			});
        			console.log(titles);
        			titles = {titles: titles};
        			res.json(titles);
        		}
        	});
        },
      	getPage: function(req, res){
      		Page.findById(req.query.id, function(err, page){
      			if (err){
        			res.send(err).status(500);
        			console.error(err);
        		} else {
        			res.json(page);
        		}
      		});
        },
        postPage: function(req, res){
        	var newPage = new Page({title: req.body.title, content: req.body.content});
        	newPage.save(function(err, page){
        		if (err){
        			res.send(err).status(500);
        			console.error(err);
        		} else {
        			res.json(page);
        		}
        	});
        },
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
