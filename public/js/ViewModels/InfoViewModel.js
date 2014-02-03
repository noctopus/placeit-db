function InfoViewModel(repository, element){
	var self = this;
	self.element = element;
	self.db = new repository(self);
	var ViewModel = ko.observable({
		_class : ko.observable({name : "Not loaded yet"}),
		messages : ko.observableArray([]),
		currentMessage : ko.observable()
	});

	ko.bindingHandlers.gradechart = {
		init : function(element, valueAccessor){
			GenerateChart(element);
		}
	}

	ko.bindingHandlers.submitMessage = {
		init : function(element, valueAccessor){
			$(element).click(function(){
				ViewModel().messages.push(valueAccessor()());
			});
		}
	}

	self.initialize = function(){
		var url = document.URL.split("?");
		var urlParam = url[1];
		var id = parseInt(urlParam.split("=")[1]);

		self.db.GetClass(id, function(_class){
			ViewModel()._class(_class);
			console.log(ViewModel()._class());
			ko.applyBindings(ViewModel, self.element);
		});

	}
}