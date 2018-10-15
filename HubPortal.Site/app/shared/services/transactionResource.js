(function () {
    "use strict";

    var app = angular.module("shared.services")
        .factory("TransactionResource", ["$resource", "API", TransactionResource]);

    function TransactionResource($resource, API) {
        return $resource(API,
            {
                controller: "transaction",
                action: "@action"
            },
            {
                post: {
                    controller: "transaction",
                    action: "@action",
                    method: "POST",
                    params: { queryString: "@queryString" },
                    isArray: true
                }
            }
        );
    }
}());
