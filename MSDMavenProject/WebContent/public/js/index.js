var app = angular.module("PlacesApp", []);

app.controller("myNoteCtrl", function($scope) {
    $scope.message = "Hello to the project";
    $scope.option = {};
    $scope.events = null;

    $scope.getevents = function(){
    	console.log("Inside find events");
    	console.log($scope.option);
    	var eventsList = "";
    	
    	if($scope.option.festival){
    		console.log("Get festivals");
    		eventsList = eventsList + "festivals_parades";
    	}
    	if($scope.option.music){
    		console.log("Get music");
    		eventsList = eventsList + "festivals_parades";
    	}
    	if($scope.option.movies){
    		console.log("Get movies");
    		eventsList = eventsList + "festivals_parades";
    	}

    	var oArgs = {
	      app_key: "vHx53bbX7CwW3hrs",
	      // q: "music",
	      where: "Boston", 
	      category: eventsList,
	      // "date": "2013061000-2015062000",
	      page_size: 5,
	      sort_order: "popularity",
   	  };

   	  EVDB.API.call("/events/search", oArgs, function(oData) {
	        console.log(oData);
	        $scope.events = oData.events.event;
	   });
    }
});