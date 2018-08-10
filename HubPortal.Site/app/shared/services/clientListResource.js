(function () {
    "use strict";

    var app = angular.module("shared.services")
        .factory("ClientListResource", ["$resource", "API", ClientListResource]);

    function ClientListResource($resource, API) {
        return $resource(API, { controller: "Client", action: "Get" });
    }
}());