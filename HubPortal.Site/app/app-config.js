(function () {
    "use strict";
    var app = angular.module("hubPortal");

    //app.constant("API", "http://localhost:55626/api/:controller/:action"); // Local api

    app.constant("API", " https://ynai2sf9x1.execute-api.us-east-1.amazonaws.com/sandbox/:controller/:action"); // AWS sandbox api

    app.constant("SERVICE_ENVIRONMENT", "Development");
}());
