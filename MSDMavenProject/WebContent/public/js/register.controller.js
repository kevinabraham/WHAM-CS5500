
app.controller("RegisterController",RegisterController);

    function RegisterController(UserService,$rootScope,$scope,$uibModalInstance) {
        $scope.message = null;

        $scope.pref = {};
        $scope.within = "";
        $scope.pageSize = "";

        $scope.withinOptions = [
        {name : "1", value : 1},
        {name : "5", value : 5},
        {name : "10", value : 10},
        {name : "20", value : 20}
        ]

        $scope.pageSizeOptions = [
        {name : "5", value : 5},
        {name : "10", value : 10},
        {name : "15", value : 15},
        {name : "20", value : 20},
        {name : "25", value : 25},
        {name : "30", value : 30}
        ]

         $scope.message = null;



        $scope.cancel = function(){
         $uibModalInstance.dismiss('cancel');
        }

        $scope.register = function (user,pref) {
            console.log("Inside register user");
            console.log(user);
             console.log(pref);

             if(validation()){

                //add user preferences 
             var types = [];

             for(key in pref){
                if(pref[key])
                    types.push(key);
             }
             console.log("types");
             console.log(types);
             user.preferences = {types : types, within: $scope.within.value, pageSize: $scope.pageSize.value};



            UserService.createUser(user, function (response) {
                if (response != null) {
                    console.log("User created");
                    $rootScope.currentUser = response;
                    console.log(response);
                    $scope.message = "Welcome" + response.username;
                    $uibModalInstance.close(response);
                }
                else {
                    $scope.message = {name : "User already exists.", type: "alert alert-danger alert-dismissible" };

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
