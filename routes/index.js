
/*
 * GET home page.
 */

exports.view = function(req, res){
  if(req.session.user != undefined){
    res.render('index', {
      user : req.session.user,
      loggedin : true
    });
  }else{
    res.render("index",{
      notloggedin : true
    });
  }
};