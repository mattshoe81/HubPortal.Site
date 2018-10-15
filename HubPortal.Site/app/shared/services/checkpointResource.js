(function () {
    "use strict";

    var app = angular.module("shared.services")
        .factory("CheckpointResource", ["$resource", "API", CheckpointResource]);

    function CheckpointResource($resource, API) {
        return $resource(API,
            {
                controller: "checkpoint",
                action: "@action"
            }
        );
    }
}());
