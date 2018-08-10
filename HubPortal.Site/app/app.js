(function () {
    "use strict";

    var app = angular.module("hubPortal", ["reports", "maintenance"]);

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
                .state("transactionFieldLookup", {
                    url: ROUTE_PREFIX + "transactionFieldLookup",
                    templateUrl: "app/components/transactionFieldLookup/transactionFieldLookupView.html",
                    controller: "TransactionFieldLookupCtrl as vm"
                })
                .state("processStatus", {
                    url: ROUTE_PREFIX + "processStatus",
                    templateUrl: "app/components/processStatus/processStatusView.html",
                    controller: "ProcessStatusCtrl as vm"
                })
                .state("responseTimeTracking", {
                    url: ROUTE_PREFIX + "responseTimeTracking",
                    templateUrl: "app/components/responseTimeTracking/responseTimeTrackingView.html",
                    controller: "ResponseTimeTrackingCtrl as vm"
                })
                .state("testTransaction", {
                    url: ROUTE_PREFIX + "test/transaction",
                    templateUrl: "app/components/testTransaction/testTransactionView.html",
                    controller: "TestTransactionCtrl as vm"
                })
                .state("transactionDetail", {
                    url: ROUTE_PREFIX + "transaction/:transactionid",
                    templateUrl: "app/components/transactionLookup/transactionDetailView.html",
                    controller: "TransactionDetailCtrl as vm",
                    resolve: {
                        ProcessDetails: ["ProcessDetailsResource", "$stateParams", function (ProcessDetailsResource, $stateParams) {
                            var transactionid = $stateParams.transactionid;
                            return ProcessResource.get({ transactionid: transactionid },
                                function (response) {
                                },
                                function (response) {
                                    if (response.status === 404) {
                                        alert("Error accessing resource: " +
                                            response.config.method + " " + response.config.url);
                                    }
                                    else {
                                        alert(response.statusText);
                                    }
                                }).$promise;
                        }],
                        Checkpoints: ["CheckpointsResource", function (CheckpointsResource) {
                            var transactionid = $stateParams.transactionid;
                            return CheckpointsResource.get({ transactionid: transactionid },
                                function (response) {
                                },
                                function (response) {
                                    if (response.status === 404) {
                                        alert("Error accessing resource: " +
                                            response.config.method + " " + response.config.url);
                                    }
                                    else {
                                        alert(response.statusText);
                                    }
                                }).$promise;
                        }]
                    }
                })
        }]);
}());