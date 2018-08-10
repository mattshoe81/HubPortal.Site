(function () {
    "use strict";

    var app = angular.module("shared.services")
        .factory("ProcessDetailsResource", ["$resource", "API", ProcessDetailsResource]);

    function ProcessDetailsResource($resource, API) {
        return $resource(API, { controller: "Transaction", action: "GetClientNames" });
    }
}());