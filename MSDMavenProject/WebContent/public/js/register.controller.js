/**
 * Created by bhakti on 11/29/15.
 */

app.controller("RegisterController",RegisterController);

    function RegisterController(UserService,$rootScope,$scope,$uibModalInstance) {
        $scope.currentUser = null;
        $scope.message = null;
        var vm = this;
        //vm.register=function(user)
$scope.cancel = function(){
$uibModalInstance.dismiss('cancel');
}
        $scope.register = function (user) {
            console.log("Inside register user");
            UserService.createUser(user, function (response) {
                if (response != null) {
                    $scope.currentUser = response;
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
