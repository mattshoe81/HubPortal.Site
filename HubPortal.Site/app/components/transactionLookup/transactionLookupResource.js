(function () {
    "use strict";

    var app = angular.module("hubPortal")
        .factory("TransactionLookupResource", ["$resource", "API", TransactionLookupResource]);

    function TransactionLookupResource($resource, API) {
        return $resource(API, { controller: "Transaction", action: "FindTransactions" }, {
            submit: {
                method: "POST",
                isArray: true
            }
        });
    }
}());