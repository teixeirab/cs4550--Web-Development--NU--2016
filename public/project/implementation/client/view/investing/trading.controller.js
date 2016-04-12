(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("TradingController", TradingController);

    function TradingController(CompanyService, PortfolioService, $rootScope, $scope, $uibModal) {
        var vm = this;
        $scope.showFailureMessage = false;
        $scope.showSuccessMessage = false;
        $scope.successMessage = null;
        $scope.failureMessage = null;
        vm.companies = [];
        vm.currentPortfolio = [];
        vm.currentTurn = 1;
        vm.currentUser = $rootScope.currentUser;

        vm.refresh = refresh;
        vm.buy = buy;
        vm.sell = sell;

        function init() {
            PortfolioService
                .findPortfolioForUser(vm.currentUser.username)
                .then(function(response){
                    vm.currentPortfolio = response.data;
                    vm.currentTurn = response.data.currentTurn;
                });

            CompanyService
                .findAllCompanies()
                .then(function (response){
                    if(response.data) {
                        vm.companies = response.data
                    }
                });
        }
        init();

        function refresh(selectedCompany){
            var currentPrice;
            var prices;
            for (var i = 0; i < vm.companies.length; i++){
                if (vm.companies[i].generated_name === selectedCompany.name){
                    currentPrice = vm.companies[i].summary.current_price[vm.currentTurn];
                    prices = vm.companies[i].summary.current_price;
                }
            }

            vm.selectedCompany = {
                name: selectedCompany.name,
                shares: selectedCompany.shares,
                currentPrice : currentPrice,
                tradeType: selectedCompany.tradeType,
                prices : prices,
                totalEquity: vm.totalEquity
            }
        }

        function buy(index){
            var temp;
            temp = {
                name: vm.companies[index].generated_name,
                shares: 1,
                tradeType: "Buy"
            };
            refresh(temp)

            $rootScope.modalInstance = $uibModal.open({
                templateUrl: 'view/investing/trading.popup.view.html',
                controller: 'TradingPopupController',
                controllerAs: "model",
                size: 'lg',
                resolve: {
                    selectedTrade : function () {
                        return  vm.selectedCompany
                    },
                    currentPortfolio : function () {
                        return  vm.currentPortfolio
                    }
                }
            });
        }

        function sell(index){
            var temp;
            temp = {
                name: vm.companies[index].generated_name,
                shares: 1,
                tradeType: "Sell"
            };
            refresh(temp)

            $rootScope.modalInstance = $uibModal.open({
                templateUrl: 'view/investing/trading.popup.view.html',
                controller: 'TradingPopupController',
                controllerAs: "model",
                size: 'lg',
                resolve: {
                    selectedTrade : function () {
                        return  vm.selectedCompany
                    },
                    currentPortfolio : function () {
                        return  vm.currentPortfolio
                    }
                }
            });
        }


    }
})();