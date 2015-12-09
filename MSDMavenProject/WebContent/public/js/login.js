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
        if(validation()){
            UserService.loginUser(user,function(response)
            {
                console.log("Returned from login service");
                if(response==null)
                {
                    console.log("User not found");
                    $scope.message={name : "User not found.Please sign up!", type: "alert alert-danger alert-dismissible"};
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

    function validation(user){
        var validated = true;
        var user = $scope.user;
        if(user.username.length>15){
            $scope.message = {name: "Username is too big", type:"alert alert-warning alert-dismissible"};
            validated = false;
        }
        if(user.username.length < 5){
            $scope.message = {name: "Username is too small", type:"alert alert-warning alert-dismissible"};
            validated = false;
        }
        if(user.password.length>15){
            $scope.message = {name: "Password is too big", type:"alert alert-warning alert-dismissible"};
             validated = false;
        }
        if(user.password.length < 5){
            $scope.message = {name: "Password is too small", type:"alert alert-warning alert-dismissible"};
             validated = false;
        }
        return validated;
    }
}

