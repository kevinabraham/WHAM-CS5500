/**
 * Created by bhakti on 11/29/15.
 */


//var app = angular.module("app",[]);


app.controller("LoginController",LoginController);



		function LoginController($scope,UserService,$rootScope,$uibModalInstance)
		{   $scope.user = "";
			$scope.message = null;
			var vm=this;
			//vm.login=login;

            function login(user){
                console.log("vm login");
            }
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
									console.log(vm);
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



		//function creatUser(user, callback)
		//{
		//	$http.post("/rest/register",user)
		//	.success(callback);
		//}
		//
		//function loginUser(user, callback)
		//{
		//	$http.post("/rest/login",user)
		//	.success(callback);
		//}


