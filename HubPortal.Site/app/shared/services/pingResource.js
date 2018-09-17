(function () {
    "use strict";

    var app = angular.module("shared.services")
        .factory("PingResource", ["$resource", "API", PingResource]);

    function PingResource($resource, API) {
        return $resource(
            API,
            { controller: "Ping", action: "@action" },
            {
                test: {
                    method: "PUT",
                    params: {
                        action: "Test",
                        processName: "@processName"
                    },
                    isArray: false
                }
            }
        );
    }
}());
