(function(){
    angular
        .module("SimulationApp")
        .controller("AdminController", adminController);

    function adminController($scope, UserService, $location, $rootScope) {
        $scope.users = UserService.users;
    }
})();

