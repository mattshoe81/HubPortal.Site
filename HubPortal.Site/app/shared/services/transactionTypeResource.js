(function () {
    "use strict";

    var app = angular.module("shared.services")
        .service("TransactionTypeResource", ["$resource", "API", TransactionTypeResource]);

    function TransactionTypeResource($resource, API) {
        return $resource(API, { controller: "Transaction", action: "GetTypes" });
    }
}());