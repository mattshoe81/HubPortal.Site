(function () {
    "use strict";

    var app = angular.module("shared.services")
        .factory("OutageResource", ["$resource", "API", OutageResource]);

    function OutageResource($resource, API) {
        return $resource(API, { controller: "Outage", action: "@action" });
    }
}());
