(function () {
    "use strict";

    var app = angular.module("shared.services")
        .service("ProcessListResource", ["$resource", "API", ProcessListResource]);

    function ProcessListResource($resource, API) {
        return $resource(API, { controller: "Process", action: "Get" });
    }
}());