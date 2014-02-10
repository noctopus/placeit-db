function IndexModel(ViewModel){
	var self = this;
  self.ViewModel = ViewModel;
 // var socket = io.connect("http://localhost:8000");
 var URI = location.origin.replace(/^http/, 'ws');
	var socket = io.connect(URI);
  	socket.on('enrollment', function (data) {
      console.log(data);
    	self.ViewModel.updateClass(data.id, data.count);
  });

  	self.GetClasses = function(callback){
      $.get("/classes", function(mockDB){
            mockDB = JSON.parse(mockDB);
            for(var i = 0; i < mockDB.length;i++){
               mockDB[i].enrollment = ko.observable(mockDB[i].enrollment);
               mockDB[i].enrolled = ko.observable(mockDB[i].enrolled);
              }
          callback(mockDB);
      })

  	}

  	self.GetEnrolledClasses = function(id, callback){
  		callback([]);
  	}

  	self.Enroll = function(id, enrollment){
  		$.post("/enrollments/add", {id : id, count : enrollment});
  	}


    self.Drop = function(id, enrollment){
      $.post("/enrollments/drop", {id : id, count : enrollment});
    }



}