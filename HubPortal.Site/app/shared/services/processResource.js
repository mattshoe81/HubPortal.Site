(function () {
    "use strict";

    var app = angular.module("shared.services")
        .factory("ProcessResource", ["$resource", "API", ProcessResource]);

    function ProcessResource($resource, API) {
        return $resource(API, { controller: "process", action: "@action" });
    }
}());
