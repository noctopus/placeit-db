exports.enroll = function(socket){
  return function(req,res){
    socket.emit("enrollment", {id : req.body.id, count : parseInt(req.body.count)+1});
    res.send({message : "Sent to everyone!"});
  }
}
