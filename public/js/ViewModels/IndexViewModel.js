function IndexViewModel(repository, element){
	var self = this;
	self.element = element;
	self.db = new repository(self);
	var ViewModel = ko.observable({
		allClasses : ko.observableArray([]),
		currentClasses : ko.observableArray([]),
		getInfo : function(model){
		},
		follow : function(model){
		},
		enroll : function(model){
			var id = model.id;
			self.db.Enroll(id);
		}
	});

	ViewModel().viewedClasses =  ko.computed(function(){
		var classes = this();
		return ViewModel().allClasses().filter(function(element){
			return classes.indexOf(element.id) >= 0
		});
	}, ViewModel().currentClasses);

	self.initialize = function(){
		ko.applyBindings(ViewModel, self.element);

		self.db.GetEnrolledClasses(0, function(classes){
			ViewModel().currentClasses(classes);
		});

		self.db.GetClasses(function(classes){
			ViewModel().allClasses(classes);
		});
	}

	self.updateClass = function(id, count){
		ViewModel().allClasses().forEach(function(element){
			if(element.id == id){
				element.enrollment(count);
			}
		});
	}
}