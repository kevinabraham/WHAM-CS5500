describe("Places", function(){

	var $rootScope, $scope, controller, $uibModal, GoogleMapsServiceMock;

	beforeEach(function (){

		module("PlacesApp");

		inject(function($injector){
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			GoogleMapsServiceMock = $injector.get('GoogleMapsService');
			controller = $injector.get('$controller')("myNoteCtrl",{$scope : $scope,
				GoogleMapsService : GoogleMapsServiceMock, $uibModal : $uibModal});

		});

	});

	
	describe("Events List",function(){
		
		it("Events list should only contain festival id when Festivals is checked", function(){
			
			$scope.option.festivals_parades = true;
			$scope.getevents();
			expect($scope.eventsList).toBe("festivals_parades");
			
		});		

		it("Events list should only contain music id when Music is checked", function(){
			
			$scope.option.music = true;
			$scope.getevents();
			expect($scope.eventsList).toBe("music");
			
		});

		it("Events list should only contain movies id when Movies is checked", function(){
			
			$scope.option.movies_film = true;
			$scope.getevents();
			expect($scope.eventsList).toBe("movies_film");
						
		});

		it("Events list should contain only Festival and Movie ids when Festival and Movies are checked", function(){
			
			$scope.option.festivals_parades = true;
			$scope.option.movies_film = true;
			$scope.getevents();
			expect($scope.eventsList).toBe("festivals_parades, movies_film");
		});

		it("Events list should contain only Music ids and Movie ids when Music and Movies are checked", function(){
			
			$scope.option.music = true;
			$scope.option.movies_film = true;
			$scope.getevents();
			expect($scope.eventsList).toBe("music, movies_film");
		});

	// 	// //Kaustubh

		it("Events list should contain only Festival ids and Music ids when Festival and Music are checked", function(){
			
			$scope.option.festivals_parades = true;
			$scope.option.music = true;
			$scope.getevents();
			expect($scope.eventsList).toBe("festivals_parades, music");
		});

		it("Events list should contain all ids when Festival, Music and Movies are checked", function(){
			
			$scope.option.festivals_parades = true;
			$scope.option.music = true;
			$scope.option.movies_film = true;
			$scope.getevents();
			expect($scope.eventsList).toBe("festivals_parades, music, movies_film");
		});

		it("Events list should only not contain festival id when Festival is not checked", function(){
			$scope.option.festivals_parades = false;
			$scope.getevents();
			expect($scope.eventsList).not.toBe("festivals_parades");
		});

		it("Events list should only not contain music id when Music is not checked", function(){
			$scope.option.music = false;
			$scope.getevents();
			expect($scope.eventsList).not.toBe("music");
		});

		it("Events list should only not contain Movies id when Movie is not checked", function(){
			$scope.option.movies_film = false;
			$scope.getevents();
			expect($scope.eventsList).not.toBe("movies_film");
		});

		it("Events list should only not contain Movies id, Festival id or Music id when none of them is checked", function(){
			$scope.option.festival = false;
			$scope.option.music = false;
			$scope.option.movies = false;
			$scope.getevents();
			expect($scope.eventsList).not.toBe("festivals_parades, music, movies_film");
		});
	});

describe("Test EVENTFUL API", function(){

	it("The input parameters to the eventful api should not be empty", function(done){

		var eventsList = "festivals_parades";
		$scope.getEventsEventFull(eventsList);
		expect($scope.oArgs).not.toBe("");
		done();
	});

	it("The number of list of events should be equal to the requested number when a category is passed", function(){

		var eventsList = "festivals_parades";
		$scope.pageSize = {name : "10", value : 10};
		$scope.getEventsEventFull(eventsList);
		expect($scope.oArgs.page_size).toBe($scope.pageSize.value);
		
	});

	it("The unit of distance of the events from the user's location should be in miles", function(){

		var eventsList = "festivals_parades";
		$scope.getEventsEventFull(eventsList);
		expect($scope.oArgs.units).toBe("mi");
	});

	it("The list of events displayed should be within a distance of 10 miles from the user's location", function(){

		var eventsList = "festivals_parades";
		$scope.within = {name : "10", value : 10};
		$scope.getEventsEventFull(eventsList);
		expect($scope.oArgs.within).toBe($scope.within.value);
	});

	it("The list of events displayed should be sorted according to popularity", function(){

		var eventsList = "festivals_parades";
		$scope.getEventsEventFull(eventsList);
		expect($scope.oArgs.sort_order).toBe("popularity");
	});

	it("The list of events to be displayed should be based on the event that is selected", function(){

		var eventsList = "festivals_parades";
		$scope.getEventsEventFull(eventsList);
		expect($scope.oArgs.category).toBe("festivals_parades");
	});  

	 it("The list of events returned should not be empty when an event checkbox is checked", function(){
		
		$scope.lat = 42.334247399999995;
		$scope.lng = -71.10063819999999;
		var loc = $scope.lat+","+$scope.lng;
		$scope.getEventsEventFull("festivals_parades");
		expect($scope.oArgs.location).toBe(loc);
		
	 });

});

	
});