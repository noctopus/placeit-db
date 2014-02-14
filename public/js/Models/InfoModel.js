function InfoModel(ViewModel){
	var self = this;
	self.ViewModel = ViewModel;

	self.GetClass = function(id, callback){
      $.get("/classes/"+id, function(_class){
        _class = JSON.parse(_class);
        
        var capes = _class.info.cape_review.split("|");
        
        for (var i = 0; i < capes.length; i++) {
        	capes[i] = capes[i].split("*");
        }

        console.log(capes);

        _class.info.cape_review = capes;

        _class.enrollment = ko.observableArray(_class.enrollment);
        callback(_class)


      });
    }


}