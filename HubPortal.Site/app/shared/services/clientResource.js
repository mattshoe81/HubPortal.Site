(function () {
    "use strict";

    var app = angular.module("shared.services")
        .factory("ClientResource", ["$resource", "API", ClientResource]);

    function ClientResource($resource, API) {
        return $resource(API, { controller: "Client", action: "@action" });
    }
}());
