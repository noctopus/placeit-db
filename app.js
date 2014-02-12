//testing commit 2

/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var passport = require("passport")
var config = require("./config/config.js")		
var mongoose = require("mongoose")
var db = mongoose.connect(config.db);
var fs = require("fs");
var classes = []; 					// temporary
var schedules = null;



// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//models
require("./models/users.js");

// Bootstrap routes
require('./config/routes')(app, passport);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var enrollments = require("./hubs/enrollments.js");
var io = require('socket.io');
io = io.listen(server);

fs.readFile("./classes.json", function(err, data){
	enrollments.classes = JSON.parse(data);
	app.post("/enrollments/add", enrollments.enroll(io.sockets));
	app.post("/enrollments/drop", enrollments.drop(io.sockets));
});

fs.readFile("./schedules.json", function(err, data){
	schedules = JSON.parse(data);
});

app.get("/classes", function(req,res){
	var classes = enrollments.classes;
	var returner = JSON.parse(JSON.stringify(classes));	console.log(req.session.user);
	for(var i = 0; i < classes.length; i++){
		if(req.session.user != null && returner[i].enrollment.indexOf(req.session.user.pid) >= 0){
			returner[i].enrolled = true;
		}else{
			returner[i].enrolled = false;
		}
		var count = returner[i].enrollment.length;
		returner[i].enrollment = count;

	}
		res.end(JSON.stringify(returner, null, '\t'));
});

app.get("/classes/:id", function(req,res){
	var _class = enrollments.classes.filter(function(e){return e.id == parseInt(req.params.id)})[0];
	_class = JSON.parse(JSON.stringify(_class));
	var users = require("./controllers/users.js").getUsers(function(users){
		var classes = [];
		console.log(_class);
		for(var i = 0; i < users.length; i++){
			if(_class.enrollment.indexOf(users[i].pid) >= 0){
				users[i].password = "";
				classes.push(users[i]);
			}
		}

		_class.info = schedules[_class.id];
		_class.enrollment = classes;
		console.log(_class);
		res.end(
			JSON.stringify(
				_class
				)
			);
	});

})

