function InfoModel(ViewModel){
	var self = this;
	self.ViewModel = ViewModel;

	self.GetClass = function(id, callback){
      $.get("/classes/"+id, function(_class){
        console.log(JSON.parse(_class));
        callback(JSON.parse(_class));
      });
    }


}