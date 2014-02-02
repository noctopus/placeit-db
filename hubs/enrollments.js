exports.enroll = function(socket){
  return function(req,res){
    socket.emit("enrollment", {id : req.body.id, count : 2});
    res.send({message : "Sent to everyone!"});
  }
}