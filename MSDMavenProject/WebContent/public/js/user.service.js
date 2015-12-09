app.factory("UserService",UserService);
	
	function UserService($http,$rootScope)
	{
		var service={
				createUser: createUser,
				loginUser: loginUser,
				loggedIn: loggedIn,
				logoutUser: logoutUser,
				updatePreference: updatePreference
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

		function loggedIn(callback){
			console.log("Inside loogedin");
			$http.get("/rest/loggedin")
			.success(function(user){
				if(user != '0'){
				console.log("User found on page refresh");
				callback(user);
			}else{
				callback(null);
			}})
			.error(function(err){
				console.log(err);
				callback(null)});
		}

		function logoutUser(callback){
			$http.post("/rest/logout")
			.success(callback);
		}

		function updatePreference(pref,callback){
			console.log("Inside Update Preference");
			$http.post("/rest/updatePref",pref)
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
	
