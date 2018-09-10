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
                submit: {
                    controller: "Transaction",
                    action: "PostData",
                    method: "Post"
                },
                post: {
                    controller: "Transaction",
                    action: "@action",
                    method: "POST",
                    isArray: true
                }
            }
        );
    }
}());
