(function () {
    "use strict";

    var app = angular.module("shared.services")
        .service("TransactionTypeResource", ["$resource", TransactionTypeResource]);

    function TransactionTypeResource($resource) {
        return $resource("http://localhost:55626/api/transactionLookup/getTransactionTypes");
        //return $http({
        //    url: "http://localhost:55626/api/transactionLookup/getTransactionTypes",
        //    method: "GET",
        //    params: {}
        //});
    }
}());