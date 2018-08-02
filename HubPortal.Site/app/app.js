(function () {
    "use strict";

    var app = angular.module("hubPortal", ["ui.router", "shared.services", "shared.directives", "ui", "filters"]);

    app.config(function ($provide) {
        $provide.decorator("$exceptionHandler",
            ["$delegate",
                function ($delegate) {
                    return function (exception, cause) {
                        exception.message = "Something went wrong \n Message: " + exception.message;

                        $delegate(exception, cause);

                        alert(exception.message);
                    };
                }
            ]);
    });

    app.config(["$stateProvider",
        "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            var ROUTE_PREFIX = "/HubPortal/";

            $urlRouterProvider.otherwise(ROUTE_PREFIX + "transactionLookup");
            $stateProvider
                .state("transactionLookup", {
                    url: ROUTE_PREFIX + "transactionLookup",
                    templateUrl: "app/components/transactionLookup/transactionLookupView.html",
                    controller: "TransactionLookupCtrl as vm",
                    resolve: {
                        ProcessList: ["ProcessListResource", function (ProcessListResource) {
                            return ProcessListResource.query();
                        }],
                        ClientList: ["ClientListResource", function (ClientListResource) {
                            return ClientListResource.query();
                        }],
                        TransactionTypeList: ["TransactionTypeResource", function (TransactionTypeResource) {
                            return TransactionTypeResource.query();
                        }]
                    }
                })
        }]);
}());