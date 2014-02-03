function IndexViewModel(repository, element){
	var self = this;
	self.element = element;
	self.db = new repository(self);
	var ViewModel = ko.observable({
		allClasses : ko.observableArray([]),
		currentClasses : ko.observableArray([]),
		getInfo : function(model){
			window.open("/info?id="+model.id);
		},
		enroll : function(model){
			var id = model.id;
			var confirm = window.confirm("Are you sure you want to enroll?");
			if(confirm){
				self.db.Enroll(id, model.enrollment());
			}
			
		}
	});

	ko.bindingHandlers.info = {
		init : function(element, valueAccessor){
			$(element).click(function(){
				ViewModel().getInfo(valueAccessor());
			});
		}
	}

	ko.bindingHandlers.toggle = {
		init : function(element, valueAccessor){
			$(element).click(function(){
				ViewModel().toggle(valueAccessor());
			});
		}
	}

	ko.bindingHandlers.gradechart = {
		init : function(element, valueAccessor){
			GenerateChart(element);
		}
	}

	ViewModel().toggle = function(model){
		console.log(model);
		if(model.followed() == true){
			var id = model.id;
			var returner = [];
			var arr = ViewModel().currentClasses().filter(function(element){
				return element != model.id;
			});
			ViewModel().currentClasses(arr);
		}else{
			var arr = ViewModel().currentClasses();
			arr.push(model.id);
			ViewModel().currentClasses(arr);
		}
	};

	ViewModel().viewedClasses =  ko.computed(function(){
		var classes = this();
		return ViewModel().allClasses().filter(function(element){
			return classes.indexOf(element.id) >= 0
		});
	}, ViewModel().currentClasses);

	ViewModel().groupedClasses = ko.computed(function(){
		var returner = {};
		var classes = ViewModel().allClasses();
		var enrolled = this();
		classes.forEach(function(element){
			if(returner[element.group] == null){
				returner[element.group] = [];
			}

			returner[element.group].push(element);
		});
		return returner;
	},ViewModel().currentClasses);

	self.initialize = function(){
		ko.applyBindings(ViewModel, self.element);

		self.db.GetClasses(function(classes){
			self.db.GetEnrolledClasses(0, function(currclasses){
				ViewModel().currentClasses(currclasses);
			});
			var enrolled = ViewModel().currentClasses();
			classes.forEach(function(element, index){
				classes[index].followed = ko.computed(function(){
					var enrolled = this();
					return enrolled.indexOf(element.id) >= 0
				},ViewModel().currentClasses);

			});

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