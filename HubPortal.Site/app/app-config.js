(function () {
    "use strict";
    var app = angular.module("hubPortal");

    app.constant("API_ROUTE", "http://localhost:55626/api/:controller/:action"); // Local api

    app.constant("SERVICE_ENVIRONMENT", "Development");
}());