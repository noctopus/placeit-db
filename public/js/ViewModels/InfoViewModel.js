function getID(){
		var url = document.URL.split("?");
		var urlParam = url[1];
		var id = parseInt(urlParam.split("=")[1]);
		return id;
}

function InfoViewModel(repository, element){
	var self = this;
	self.element = element;
	self.db = new repository(self);
	var ViewModel = ko.observable({
		_class : ko.observable({name : "Not loaded yet"}),
		messages : ko.observableArray([]),
		schedule : ko.observable(),
		currentMessage : ko.observable()
	});



	ko.bindingHandlers.submitMessage = {
		init : function(element, valueAccessor){
			$(element).click(function(){
				ViewModel().messages.push(valueAccessor()());
			});
		}
	}

	self.initialize = function(){
		var id = getID();

		self.db.GetClass(id, function(_class){
			ViewModel()._class(_class);

		ko.bindingHandlers.gradechart = {
			init : function(element, valueAccessor){
				GenerateChart(element, _class);
			}
		}


			ko.applyBindings(ViewModel, self.element);
		});

	}
}