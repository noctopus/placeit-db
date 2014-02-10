exports.enroll = function(socket){
  return function(req,res){
  		var _class = null;
  			console.log(exports.classes);
  		for(var i = 0; i < exports.classes.length; i++){
  			if(exports.classes[i].id == req.body.id){
  					_class = i;
  			}
  		}
  	console.log(exports.classes[_class]);
   	if(req.session.user != null && _class != null && exports.classes[_class].enrollment.indexOf(req.session.user.pid) < 0){
   		exports.classes[_class].enrollment.push(req.session.user.pid);
   	    socket.emit("enrollment", {id : req.body.id, count : exports.classes[_class].enrollment.length});
   		res.send({message : "Sent to everyone!"});
   	}else{
   		res.send({message : "Unable to do action", user : req.session.user, class : _class})
   	}


  }
}

exports.drop = function(socket){
  return function(req,res){
  		var _class = null;

  		for(var i = 0; i < exports.classes.length; i++){
  			if(exports.classes[i].id == parseInt(req.body.id)){
  					_class = i;
  			}
  		}

   	if(req.session.user != null && _class != null && exports.classes[_class].indexOf(req.session.user.pid)  >= 0){
   		exports.classes[_class].enrollment.splice(exports.classes[_class].enrollment.indexOf(req.session.user.pid),1);
		socket.emit("enrollment", {id : req.body.id, count : exports.classes[_class].enrollment.length});
   		res.send({message : "Sent to everyone!"});
   	}else{
   		res.send({message :"Unable to do action"});
   	}

  }
}