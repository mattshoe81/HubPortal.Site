(function () {
    "use strict";
    var app = angular.module("hubPortal");

    app.constant("API", "http://localhost:55626/api/:controller/:action"); // Local api

    app.constant("SERVICE_ENVIRONMENT", "Development");
}());