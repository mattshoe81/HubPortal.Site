(function () {
    "use strict";

    var app = angular.module("shared.services")
        .factory("TransactionResource", ["$resource", "API", TransactionResource]);

    function TransactionResource($resource, API) {
        return $resource(API,
            {
                controller: "Transaction",
                action: "@action"
            },
            {
                post: {
                    controller: "Transaction",
                    action: "@action",
                    method: "POST",
                    params: { queryString: "@queryString" },
                    isArray: true
                }
            }
        );
    }
}());
