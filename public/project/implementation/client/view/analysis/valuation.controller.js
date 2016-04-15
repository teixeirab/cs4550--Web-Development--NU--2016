(function () {
    "use strict";
    angular
        .module("SimulyApp")
        .controller("ValuationController", ValuationController);

    function ValuationController(CompanyService , $routeParams) {
        var vm = this;
        vm.company_data = [];
        vm.generated_name = $routeParams.identifier;
        vm.turn = $routeParams.turn;
        vm.identifier = $routeParams.identifier;
        vm.generated_name = $routeParams.generatedName;

        function init() {
            CompanyService
                .getCompanyData(vm.identifier, "valuation")
                .then(function(response) {
                    if (response.data) {
                        vm.company_data = response.data;
                        renderBar();
                    }
                });
        }
        init();

        function getPeriods(){
            vm.periods = [];
            var j = 1;
            for (var i =0; i <= 10; i++){
                if (i < vm.turn){
                    vm.periods.push("t"+i);
                }
                else {
                    vm.periods.push("fy"+j);
                    j++;
                }
            }
        }

        function renderBar(){
            var pe = vm.company_data.pe.slice(0,vm.turn);
            var pb = vm.company_data.pb.slice(0,vm.turn);
            var ps = vm.company_data.ps.slice(0,vm.turn);
            var ev_ebitda = vm.company_data.ev_ebitda.slice(0,vm.turn);
            getPeriods();

            var peChartData = [];
            for( var i = 0; i < vm.periods.length; i++ ) {
                if (vm.periods[i].substring(0,1)== "t"){
                    peChartData.push( {
                        "periods": vm.periods[ i ],
                        "pe": pe[ i ],
                        "color": "#2980B9"
                    } )
                }
                else {
                    peChartData.push( {
                        "periods": vm.periods[ i ],
                        "pe": pe[ i ],
                        "color": "#633974"
                    } )
                }
            }

            CompanyService.createLineGraph(peChartData, "peChart", "pe");

            var psChartData = [];
            for( var i = 0; i < vm.periods.length; i++ ) {
                if (vm.periods[i].substring(0,1)== "t"){
                    psChartData.push( {
                        "periods": vm.periods[ i ],
                        "ps": ps[ i ],
                        "color": "#2980B9"
                    } )
                }
                else {
                    psChartData.push( {
                        "periods": vm.periods[ i ],
                        "ps": ps[ i ],
                        "color": "#633974"
                    } )
                }
            }

            CompanyService.createLineGraph(psChartData, "psChart", "ps");

            var pbChartData = [];
            for( var i = 0; i < vm.periods.length; i++ ) {
                if (vm.periods[i].substring(0,1)== "t"){
                    pbChartData.push( {
                        "periods": vm.periods[ i ],
                        "pb": pb[ i ],
                        "color": "#2980B9"
                    } )
                }
                else {
                    pbChartData.push( {
                        "periods": vm.periods[ i ],
                        "pb": pb[ i ],
                        "color": "#633974"
                    } )
                }
            }

            CompanyService.createLineGraph(pbChartData, "pbChart", "pb");

            var ev_ebitdaChartData = [];
            for( var i = 0; i < vm.periods.length; i++ ) {
                if (vm.periods[i].substring(0,1)== "t"){
                    ev_ebitdaChartData.push( {
                        "periods": vm.periods[ i ],
                        "ev_ebitda": ev_ebitda[ i ],
                        "color": "#2980B9"
                    } )
                }
                else {
                    ev_ebitdaChartData.push( {
                        "periods": vm.periods[ i ],
                        "ev_ebitda": ev_ebitda[ i ],
                        "color": "#633974"
                    } )
                }
            }

            CompanyService.createLineGraph(ev_ebitdaChartData, "ev_ebitda", "ev_ebitda");

        }
    }
})();
