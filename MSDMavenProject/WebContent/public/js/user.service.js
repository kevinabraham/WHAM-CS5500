app.factory("UserService",UserService);
	
	function UserService($http)
	{
		var service={
				createUser: createUser,
				loginUser: loginUser
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

		
	}
	
