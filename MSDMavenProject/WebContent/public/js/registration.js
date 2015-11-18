


app.controller("registrationCtrl", function($scope) {

console.log("helloooooooooo");
 $scope.hello = "helloooooooooo";

	$scope.register = function(){
		console.log("IN REGISTER");
		console.log($scope.field.firstName);
	}

});