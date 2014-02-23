module.exports = function(app, passport){

var index = require('../routes/index');
var info = require("../routes/info");
var users = require("../controllers/users.js");
var classes = require("../controllers/classes.js");
var placeits = require("../controllers/placeits.js");

// Add routes here
app.get('/', index.view);
app.get("/info", info.viewInfo);

app.get("/signup", function(req,res){
	res.render("signup");
});

app.post("/signup", users.create);
app.post('/login', users.session);
app.post("/logout", users.logout);


app.get("/placeits", placeits.getAllPlaceIts);
app.get("/placeits/:id", placeits.getPlaceIt);
app.post("/placeits", placeits.addPlaceIt);
app.post("/placeits/update", placeits.updatePlaceIt);
app.post("/placeits/delete", placeits.deletePlaceIt);

/*
app.get("/placeits/view", function(req, res) {
	res.render("placeits");
})*/

//app.get("/placeits/schedule/:id", placeits.getSchedule);
/*
app.post("placeits/deactivate", placeits.deactivatePlaceIt);
app.post("/placeits", addSchedule);
app.post("/placeits/delete", placeits.removeSchedule);
*/


}
