(function () {
    "use strict";

    var app = angular.module("reports", ["ui.router", "shared.services", "shared.directives", "ui", "filters"]);

    app.config(function ($provide) {
        $provide.decorator("$exceptionHandler",
            ["$delegate",
                function ($delegate) {
                    return function (exception, cause) {
                        exception.message = "Something went wrong \n Message:\n" + exception.message;

                        $delegate(exception, cause);

                        alert(exception.message);
                    };
                }
            ]);
    });

    app.config(["$stateProvider",
        "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            var ROUTE_PREFIX = "/HubPortal/reports/";
            $urlRouterProvider.otherwise(ROUTE_PREFIX + "outage");
            $stateProvider
                .state("outageReport", {
                    url: ROUTE_PREFIX + "outage",
                    templateUrl: "app/components/reports/outageReport/outageReportView.html",
                    controller: "OutageReportCtrl as vm"
                })
                .state("successReport", {
                    url: ROUTE_PREFIX + "success",
                    templateUrl: "app/components/reports/successReport/successReportView.html",
                    controller: "SuccessReportCtrl as vm"
                })
                .state("successReportGraphs", {
                    url: ROUTE_PREFIX + "graphs/success",
                    templateUrl: "app/components/reports/successReportGraphs/successReportGraphsView.html",
                    controller: "SuccessReportGraphsCtrl as vm"
                })
                .state("transactionVolumeGraphs", {
                    url: ROUTE_PREFIX + "graphs/transactionVolume",
                    templateUrl: "app/components/reports/transactionVolumeGraphs/transactionVolumeGraphsView.html",
                    controller: "TransactionVolumeGraphsCtrl as vm"
                })
        }]);
}());