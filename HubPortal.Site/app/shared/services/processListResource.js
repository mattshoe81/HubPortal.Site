(function () {
    "use strict";

    var app = angular.module("shared.services")
        .service("ProcessListResource", ["$resource", ProcessListResource]);

    function ProcessListResource($resource) {
        return $resource("http://localhost:55626/api/transactionLookup/getProcessNames");
        //return $http({
        //    url: "http://localhost:55626/api/transactionLookup/getProcessNames",
        //    method: "GET",
        //    params: { }
        //});
    }
}());