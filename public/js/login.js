app.controller("LoginController",LoginController);



function LoginController($scope,UserService,$rootScope,$uibModalInstance)
{   
	$scope.user = "";
    $rootScope.message = null;

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
                    $rootScope.message={name : "User not found. Please sign up!", type: "alert alert-danger alert-dismissible"};
                //$uibModalInstance.dismiss('cancel');
            }
            else
            {
                console.log(response);
                $rootScope.message = "Welcome  " + response.username;
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
            $rootScope.message = {name: "Username is too big", type:"alert alert-warning alert-dismissible"};
            validated = false;
        }
        if(user.username.length < 5){
            $rootScope.message = {name: "Username is too small", type:"alert alert-warning alert-dismissible"};
            validated = false;
        }
        if(user.password.length>15){
            $rootScope.message = {name: "Password is too big", type:"alert alert-warning alert-dismissible"};
             validated = false;
        }
        if(user.password.length < 5){
            $rootScope.message = {name: "Password is too small", type:"alert alert-warning alert-dismissible"};
             validated = false;
        }
        return validated;
    }
}

app.factory('authHttpResponseInterceptor',['$q','$location','$rootScope',function($q,$location,$rootScope){
    return {
        response: function(response){
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                $rootScope.message = {name : "User not found. Please sign up!", type: "alert alert-danger alert-dismissible"};
                $location.path('/login').search('returnTo', $location.path());
            }
            return $q.reject(rejection);
        }
    }
}])
.config(['$httpProvider',function($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}]);