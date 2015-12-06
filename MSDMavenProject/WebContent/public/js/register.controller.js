/**
 * Created by bhakti on 11/29/15.
 */

app.controller("RegisterController",RegisterController);

    function RegisterController(UserService,$rootScope,$scope,$uibModalInstance) {
        $scope.message = null;

        $scope.pref = {};



        $scope.cancel = function(){
         $uibModalInstance.dismiss('cancel');
        }

        $scope.register = function (user,pref) {
            console.log("Inside register user");
            console.log(user);
             console.log(pref);

             //add user preferences 
             var types = [];

             for(key in pref){
                if(pref[key])
                    types.push(key);
             }
             console.log("types");
             console.log(types);
             user.preferences = {types : types};



            UserService.createUser(user, function (response) {
                if (response != null) {
                    console.log("User created");
                    $rootScope.currentUser = response;
                    console.log(response);
                    $scope.message = "Welcome" + response.username;
                    $uibModalInstance.close(response);
                }
                else {
                    $scope.message = "user already exists";

                }

            });


        }
    }
