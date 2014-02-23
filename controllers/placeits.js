var mongoose = require('mongoose'),
	PlaceIts = require('../models/placeits.js');

exports.getAllPlaceIts = function(req, res) {
	PlaceIts.find({user_id : req.session.user.pid}, function(err,data){
		res.json(data);
	});
}

exports.getPlaceIt = function(req, res) {
	PlaceIts.find({_id : req.params.id, user_id : req.session.user.pid},  
		function(err,data){
			res.json(data);
	});
}

exports.addPlaceIt = function(req, res) {
	req.body.user_id = req.session.user.pid;
	var placeit = new PlaceIts(req.body);
	placeit.save(function(err) {
		console.log(err);
		res.redirect("/placeits");
	});
}

exports.updatePlaceIt = function(req,res) {
	PlaceIts.update({_id : req.body.id}, 
		{active_date : req.body.active_date},
		function(err,data) {
			console.log(err);
			res.redirect("/placeits");
		});
}

exports.deletePlaceIt = function(req,res) {
	var placeit = PlaceIts.find({_id : req.body.id});
	placeit.remove(function(err) {
		console.log(err);
		res.redirect("/placeits");
	});
}




