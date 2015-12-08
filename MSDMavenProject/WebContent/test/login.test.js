describe("Login", function(){

	var $rootScope, $scope,  controller, $uibModalInstance, UserServiceMock;

	beforeEach(function (){

		module("PlacesApp");

		inject(function($injector){
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			UserServiceMock = $injector.get('UserService');
			controller = $injector.get('$controller')("LoginController",{$scope : $scope,
				UserService : UserServiceMock, $rootScope : $rootScope, $uibModalInstance : $uibModalInstance});
			
		});

	});

	
	describe("Login",function(){
		
		// it("login", function(){
			
		// 	var user = "kevin";
		// 	$scope.login(user);
		// });
	// 	it("The input parameters to the login function should not be empty", function(){

	// 	var user = "kp2301";
	// 	$scope.login(user);
	// 	expect($scope.login).not.toBe("");
	// });

		
		
	});

});