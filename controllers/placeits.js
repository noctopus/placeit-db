var mongoose = require('mongoose'),
	PlaceIts = require('../models/placeits.js');

exports.getAllPlaceIts = function(req, res) {
	PlaceIts.find({user_id : req.session.user.pid}, function(err,data){
		res.json(data);
	});
}

exports.getPlaceIt = function(req, res) {
	PlaceIts.find({id : req.params.id}, 
		function(err,data){
			res.json(data);
	});
}

exports.addPlaceIt = function(req, res) {
	var placeit = new PlaceIt(req.body);
	placeit.save(function(err) {
		console.log(err);
		res.end();
	});
}

exports.updatePlaceIt = function(req,res) {
	PlaceIt.update({id : req.body.id}, {active_date : req.body.active_date},
		function(err,data) {
			console.log(err);
			res.end();
		});
}

exports.deletePlaceIt = function(req,res) {
	var placeit = PlaceIts.find({id : req.params.id});
	placeit.remove(function(err) {
		console.log(err);
		res.end();
	});
}




