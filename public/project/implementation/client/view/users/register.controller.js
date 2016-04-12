(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("RegisterController", registerController);

    function registerController($location, UserService, GameService, PortfolioService, $scope) {

        $('head').append('<link rel="stylesheet" type="text/css" href="assets/css/light-bootstrap-dashboard.css">');

        var vm = this;
        $scope.message = null;
        vm.register = register;

        function init() {
        }
        init();

        function register(user) {
            $scope.message = null;

            if (user == null) {
                $scope.message = "Please fill in the required fields";
                return;
            }
            if (!user.username) {
                $scope.message = "Please provide a username";
                return;
            }
            if (!user.password || !user.password2) {
                $scope.message = "Please provide a password";
                return;
            }
            if (user.password != user.password2) {
                $scope.message = "Passwords must match";
                return;
            }
            if (user.role === null) {
                $scope.message = "Please choose the role of the user";
                return;
            }

            if (user.role === "player"){
                GameService
                    .addUserInGame(user.username, user.gameName)
                    .then(function (response) {
                        var currentUser = response.data;
                        if (currentUser === null) {
                            $scope.message = "Game not found, select another one"
                        }
                    });

                var newPortfolio = {
                    username: user.username,
                    gameName : user.gameName,
                    holdings : [],
                    cash_remaining : 1000,
                    currentTurn : 1
                };

                PortfolioService
                    .createPortfolio(newPortfolio)
                    .then(function (response) {
                        var currentPortfolio = response.data;
                        if (currentPortfolio === null) {
                            $scope.message = "We were unable to create this portfolio"
                        }
                    });
            }

            if (user.role === "admin"){
                var newGame = {
                    title: vm.game.title,
                    userId: vm.user.username,
                    players: [],
                    duration: 10,
                    universe: 10
                };
                GameService
                    .createGame(newGame)
                    .then(function (response) {
                        var currentUser = response.data;
                        if (currentUser === null) {

                        }
                    });
            }

            UserService
                .register(user)
                .then(function (response) {
                    var currentUser = response.data;
                    if (currentUser != null) {
                        UserService.setCurrentUser(currentUser);
                        $location.url("/profile/" + user.username);
                    }
                });

        }
    }
})();