describe("Login", function(){

	var $rootScope, $scope,  controller, $uibModalInstance, UserServiceMock;

	beforeEach(function (){

		module("PlacesApp");

		inject(function($injector){
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			UserServiceMock = $injector.get('UserService');
			modalInstance = {
				close: jasmine.createSpy('modalInstance.close'),
				dismiss: jasmine.createSpy('modalInstance.dismiss'),
				result: {
					then: jasmine.createSpy('modalInstance.result.then')
				}
			};
			controller = $injector.get('$controller')("LoginController",{$scope : $scope,
				UserService : UserServiceMock, $rootScope : $rootScope, $uibModalInstance : modalInstance});
			
		});

	});

	
	describe("Login",function(){
		
		// it("login", function(){
			
		// 	var user = "kevin";
		// 	$scope.login(user);
		// });
	it("The input parameters to the login function should not be empty", function(){

		$scope.user = {username : "kevin", password : "kevin"};
		$scope.login($scope.user);
		// expect($scope.login).not.toBe("");
	});

	it("The cancel method should get called", function(){
	
		$scope.cancel();
		// expect($scope.login).not.toBe("");
	});

	// it("The user should be present in the database", function(done){
	
	// 	var user = "kevin";
	// 	$scope.login(user);
	// 	console.log("SCOPE MESSAGE");
	// 	console.log($scope.message);
	// 	done();
	// });


});

});