(function () {
    "use strict";

    var app = angular.module("shared.services")
        .factory("TransactionResource", ["$resource", "API", "ELASTIC_SEARCH", TransactionResource]);

    function TransactionResource($resource, API, ELASTIC_SEARCH) {
        return $resource(API,
            {
                //controller: "transaction",
                //action: "@action"
            },
            {
                get: {
                    url: ELASTIC_SEARCH,
                    method: "GET",
                    isArray: false
                }
            }
        );
    }
}());
