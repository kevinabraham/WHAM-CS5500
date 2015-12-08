describe("Places", function(){

	var $rootScope, $scope, controller, $uibModal, GoogleMapsServiceMock;

	beforeEach(function (){

		module("PlacesApp");

		inject(function($injector){
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			GoogleMapsServiceMock = $injector.get('GoogleMapsService');
			//$uibModal = $injector.get('ui.bootstrap');
			controller = $injector.get('$controller')("myNoteCtrl",{$scope : $scope,
				GoogleMapsService : GoogleMapsServiceMock, $uibModal : $uibModal});

		});

	});

	
	describe("Events List",function(){
		
		it("Events list should only contain festival id when Festival is checked", function(){
			GoogleMapsServiceMock.mapsInitialized.then(function(){
				$scope.option.festival = true;
				$scope.getevents();
				expect($scope.eventsList).toBe("festivals_parades");
			});
		});

		// it("Events list should only contain music id when Music is checked", function(){
		// 	GoogleMapsServiceMock.mapsInitialized.then(function(){
		// 	$scope.option.music = true;
		// 	$scope.getevents();
		// 	expect($scope.eventsList).toBe("music");
		// 	});
		// });

		// it("Events list should only contain movies id when Movies is checked", function(){
		// 	GoogleMapsServiceMock.mapsInitialized.then(function(){
		// 		$scope.option.movies = true;
		// 	$scope.getevents();
		// 	expect($scope.eventsList).toBe("movies_film");
			
		// 	});
			
		// });

		// it("Events list should contain only Festival and Movie ids when Festival and Movies are checked", function(){
			
		// 	$scope.option.festival = true;
		// 	$scope.option.movies = true;
		// 	$scope.getevents();
		// 	expect($scope.eventsList).toBe("festivals_parades, movies_film");
		// });

		// it("Events list should contain only Music ids and Movie ids when Music and Movies are checked", function(){
			
		// 	$scope.option.music = true;
		// 	$scope.option.movies = true;
		// 	$scope.getevents();
		// 	expect($scope.eventsList).toBe("music, movies_film");
		// });

		// //Kaustubh

		// it("Events list should contain only Festival ids and Music ids when Festival and Music are checked", function(){
			
		// 	$scope.option.festival = true;
		// 	$scope.option.music = true;
		// 	$scope.getevents();
		// 	expect($scope.eventsList).toBe("festivals_parades, music");
		// });

		// it("Events list should contain all ids when Festival, Music and Movies are checked", function(){
			
		// 	$scope.option.festival = true;
		// 	$scope.option.music = true;
		// 	$scope.option.movies = true;
		// 	$scope.getevents();
		// 	expect($scope.eventsList).toBe("festivals_parades, music, movies_film");
		// });

		// it("Events list should only not contain festival id when Festival is not checked", function(){
		// 	$scope.option.festival = false;
		// 	$scope.getevents();
		// 	expect($scope.eventsList).not.toBe("festivals_parades");
		// });

		// it("Events list should only not contain music id when Music is not checked", function(){
		// 	$scope.option.music = false;
		// 	$scope.getevents();
		// 	expect($scope.eventsList).not.toBe("music");
		// });

		// it("Events list should only not contain Movies id when Movie is not checked", function(){
		// 	$scope.option.music = false;
		// 	$scope.getevents();
		// 	expect($scope.eventsList).not.toBe("movies_film");
		// });

		// it("Events list should only not contain Movies id, Festival id or Music id when none of them is checked", function(){
		// 	$scope.option.festival = false;
		// 	$scope.option.music = false;
		// 	$scope.option.movies = false;
		// 	$scope.getevents();
		// 	expect($scope.eventsList).not.toBe("festivals_parades, music, movies_film");
		// });
	});

	// describe("Test for Errors in request for Geolocation",function(){

	// 	it("When user denies the request for Geolocation",function(){
	// 		$scope.showError(error.PERMISSION_DENIED);
	// 		expect($scope.error).toBe("User denied the request for Geolocation.");
	// 	});

	// });

describe("Test EVENTFUL API", function(){

	// it("The input parameters to the eventful api should not be empty", function(){

	// 	var eventsList = "festivals_parades";
	// 	$scope.getEventsEventFull(eventsList);
	// 	expect($scope.oArgs).not.toBe("");
	// });

	// it("The list of events returned should be equal to 10 when a category is passed", function(){

	// 	var eventsList = "festivals_parades";
	// 	$scope.getEventsEventFull(eventsList);
	// 	expect($scope.oArgs.page_size).toBe(10);
	// });

	// it("The unit of distance of the events from the user's location should be in miles", function(){

	// 	var eventsList = "festivals_parades";
	// 	$scope.getEventsEventFull(eventsList);
	// 	expect($scope.oArgs.units).toBe("mi");
	// });

	// it("The list of events displayed should be within a distance of 10 miles from the user's location", function(){

	// 	var eventsList = "festivals_parades";
	// 	$scope.getEventsEventFull(eventsList);
	// 	expect($scope.oArgs.within).toBe(10);
	// });

	// it("The list of events displayed should be sorted according to popularity", function(){

	// 	var eventsList = "festivals_parades";
	// 	$scope.getEventsEventFull(eventsList);
	// 	expect($scope.oArgs.sort_order).toBe("popularity");
	// });  

	//  it("The list of events returned should not be empty when an event checkbox is checked", function(done){

	//  			// 42.334247399999995 -71.10063819999999
	//  			$scope.lat = 42.334247399999995;
	//  			$scope.lng = -71.10063819999999;
	//  			$scope.getEventsEventFull("festivals_parades");
	//  			console.log("SCOPE EVENTS -----------");
	//  			console.log($scope.oData);
	//  			expect($scope.oData).not.toBe(null);
	//  			done();
	//  		});

	//  it("The list of events returned should be null when a category is not passed to the eventful api", function(){

	//  	var eventsList = "";
	//  	$scope.getEventsEventFull(eventsList);
	//  	expect($scope.events).toBe(null);
	//  });

	//  it("The list of events returned should be null when a category is not passed to the eventful api", function(){

	//  	$scope.signin
	//  	expect($scope.events).toBe(null);
	//  });


	 

});

	/*describe("Test Sign In", function(){
		it("Call sign in function", function(){
			$scope.signin();
		});
	});*/

	// describe("", function(){
	// 	it("", function(){

	// 	});
	// });

});