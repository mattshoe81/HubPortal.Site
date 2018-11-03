(function () {
    "use strict";

    var app = angular.module("shared.services")
        .factory("TransactionQueryResource", ["$resource", "ELASTIC_SEARCH", TransactionQueryResource]);

    function TransactionQueryResource($resource, ELASTIC_SEARCH) {
        return $resource(ELASTIC_SEARCH,
            {
            },
            {
                query: {
                    url: ELASTIC_SEARCH,
                    method: "GET",
                    headers: { "Content-Type": "text/plain" },
                    isArray: false
                }
            }
        );
    }
}());
