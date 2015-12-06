app.factory("UserService",UserService);
	
	function UserService($http,$rootScope)
	{
		var service={
				createUser: createUser,
				loginUser: loginUser,
				loggedIn: loggedIn,
				logoutUser: logoutUser
		};
		return service;
		
		function createUser(user,callback)
		{
			$http.post("/rest/register",user)
			.success(callback);
		}
		
		function loginUser(user,callback)
		{
            console.log("Inside login in service");
			$http.post("/rest/login",user)
			.success(callback);
		}

		function loggedIn(){
			console.log("Inside loogedin");
			$http.get("/rest/loggedin")
			.success(function(user){
				if(user != '0'){
				console.log("User found on page refresh");
				$rootScope.currentUser = user;
			}else{
				$rootScope.currentUser = null;
			}
		});
		}

		function logoutUser(callback){
			$http.post("/rest/logout")
			.success(callback);
		}

		
	}


	function checkedLogin($q,$http,$location,$rootScope){
		var deferred = $q.defer();

		console.log("Inside checked Login");

		$http.get("/rest/loggedin")
		.success(function(user){
			if(user != '0'){
				$rootScope.currentUser = user;
				deferred.resolve();
			}else{
				$rootScope.currentUser = null;
				deferred.reject();
				$location.url("/login");
			}
		});

		return deferred.promise;
	}
	
