describe("Register", function(){

	//UserService,$rootScope,$scope,$uibModalInstance

	var $UserService, $rootScope, $scope,  controller, $uibModalInstance, UserServiceMock;

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
			controller = $injector.get('$controller')("RegisterController",{$scope : $scope,
				UserService : UserServiceMock, $rootScope : $rootScope, $uibModalInstance : modalInstance});
			
		});

	});

	describe("Register", function(){
		it("The input parameters to the login function should not be empty", function(){
			$scope.user = {username : "kevin", password : "kevin"};
			$scope.register($scope.user);
			// expect($scope.login).not.toBe("");
		});

		it("The cancel method should be called", function(){
			$scope.cancel();
		});		
	});
});