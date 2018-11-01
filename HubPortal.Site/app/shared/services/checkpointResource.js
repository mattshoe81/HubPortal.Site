(function () {
    "use strict";

    var app = angular.module("shared.services")
        .factory("CheckpointResource", ["$resource", "API", "ELASTIC_SEARCH", CheckpointResource]);

    function CheckpointResource($resource, API, ELASTIC_SEARCH) {
        return $resource(API,
            {
                //controller: "checkpoint",
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
