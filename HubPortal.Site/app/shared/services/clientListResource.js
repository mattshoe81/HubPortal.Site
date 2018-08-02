(function () {
    "use strict";

    var app = angular.module("shared.services")
        .factory("ClientListResource", ["$resource", ClientListResource]);

    function ClientListResource($resource) {
        return $resource("http://localhost:55626/api/transactionLookup/getClientNames");
    }
}());