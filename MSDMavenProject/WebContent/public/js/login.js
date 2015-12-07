app.controller("LoginController",LoginController);



function LoginController($scope,UserService,$rootScope,$uibModalInstance)
{   
	$scope.user = "";
    $scope.message = null;

    $scope.cancel = function(){
    	$uibModalInstance.dismiss('cancel');
    }

    $scope.login = function(user)
    {
    	console.log(user);
    	UserService.loginUser(user,function(response)
    	{
    		console.log("Returned from login service");
    		if(response==null)
    		{
    			console.log("User not found");
    			$scope.message="User not found.Please sign up.";
    			//$uibModalInstance.dismiss('cancel');
    		}
    		else
    		{
    			console.log(response);
    			$scope.message = "Welcome  " + response.username;
    			$rootScope.currentUser=response;
    			$uibModalInstance.close(response);
    		}
    	});
    }
}

