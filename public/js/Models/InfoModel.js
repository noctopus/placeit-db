function InfoModel(ViewModel){
	var self = this;
	self.ViewModel = ViewModel;

	self.GetClass = function(id, callback){
      $.get("/classes/"+id, function(_class){
        _class = JSON.parse(_class);
        _class.enrollment = ko.observableArray(_class.enrollment);
        callback(_class);
      });
    }


}