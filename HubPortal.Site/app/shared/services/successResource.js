(function () {
    "use strict";

    var app = angular.module("shared.services")
        .factory("SuccessResource", ["$resource", "API", SuccessResource]);

    function SuccessResource($resource, API) {
        return $resource(API, { controller: "Success", action: "@action" });
    }
}());
