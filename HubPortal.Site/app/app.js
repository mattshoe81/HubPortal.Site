﻿(function () {
    "use strict";

    var app = angular.module("hubPortal", ["reports", "maintenance"]);

    app.config(function ($provide) {
        $provide.decorator("$exceptionHandler",
            ["$delegate",
                function ($delegate) {
                    return function (exception, cause) {
                        exception.message = "Something went wrong \n Message: " + exception.message;

                        $delegate(exception, cause);

                        console.log(exception.message);
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
                        ProcessList: ["ProcessResource", function (ProcessResource) {
                            return "";//ProcessResource.query();
                        }],
                        ClientList: ["ClientResource", function (ClientResource) {
                            return "";//ClientResource.query();
                        }],
                        TransactionTypeList: ["TransactionResource", function (TransactionResource) {
                            return "";//TransactionResource.query();
                        }]
                    }
                })
                .state("transactionDetail", {
                    url: ROUTE_PREFIX + "transaction/:transactionid",
                    templateUrl: "app/components/transactionLookup/transactionDetailView.html",
                    controller: "TransactionDetailCtrl as vm",
                    resolve: {
                        TransactionDetail: ["TransactionResource", "$stateParams", function (TransactionResource, $stateParams) {
                            var transactionid = $stateParams.transactionid;
                            return TransactionResource.get({ q: "(transactionId:\"" + transactionid + "\")" });
                        }],
                        Checkpoints: ["CheckpointResource", "$stateParams", function (CheckpointResource, $stateParams) {
                            var transactionid = $stateParams.transactionid;
                            return CheckpointResource.get({ q: "(transactionId:\"" + transactionid + "\")&sort=time:asc" });
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
                    controller: "ProcessStatusCtrl as vm",
                    resolve: {
                        ActiveProcesses: ["ProcessResource", function (ProcessResource) {
                            return ProcessResource.query({ action: "GetActiveProcesses" });
                        }],
                        InactiveProcesses: ["ProcessResource", function (ProcessResource) {
                            return ProcessResource.query({ action: "GetInactiveProcesses" });
                        }]
                    }
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
                .state("checkpointMessage", {
                    url: ROUTE_PREFIX + "checkpoint/message/:checkpointid",
                    templateUrl: "app/components/transactionLookup/checkpointMessageView.html",
                    controller: "CheckpointMessageCtrl as vm",
                    resolve: {
                        CheckpointMessage: ["CheckpointResource", "$stateParams", function (CheckpointResource, $stateParams) {
                            return CheckpointResource.get({ q: "checkpointId:\"" + $stateParams.checkpointid + "\"" });
                        }]
                    }
                })
                .state("checkpointEmbeddedMessage", {
                    url: ROUTE_PREFIX + "checkpoint/message/embedded/:checkpointid",
                    templateUrl: "app/components/transactionLookup/checkpointEmbeddedMessageView.html",
                    controller: "CheckpointEmbeddedMessageCtrl as vm",
                    resolve: {
                        CheckpointMessage: ["CheckpointResource", "$stateParams", function (CheckpointResource, $stateParams) {
                            return CheckpointResource.get({ action: "GetEmbeddedMessage", checkpointid: $stateParams.checkpointid });
                        }]
                    }
                });
        }]);
}());
