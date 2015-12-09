describe("Register", function(){

	//UserService,$rootScope,$scope,$uibModalInstance

	var $UserService, $rootScope, $scope,  controller, $uibModalInstance, UserServiceMock;

	beforeEach(function (){

		module("PlacesApp");

		inject(function($injector){
			$rootScope = $injector.get('$rootScope');
			$scope = $rootScope.$new();
			UserServiceMock = $injector.get('UserService');
			controller = $injector.get('$controller')("RegisterController",{$scope : $scope,
				UserService : UserServiceMock, $rootScope : $rootScope, $uibModalInstance : $uibModalInstance});
			
		});

	});

	describe("Register", function(){
		it("The input parameters to the login function should not be empty", function(){
			//$scope.register = function (user) {
		var user = "kp2301";
		$scope.register(user);
		expect($scope.login).not.toBe("");
	});

		
	});
});