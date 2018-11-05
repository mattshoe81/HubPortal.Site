(function () {
    "use strict";
    var app = angular.module("hubPortal");

    //app.constant("API", "http://localhost:55626/api/:controller/:action"); // Local api

    app.constant("API", "https://ynai2sf9x1.execute-api.us-east-1.amazonaws.com/sandbox/:controller/:action"); // AWS sandbox api

    //app.constant("ELASTIC_SEARCH", "http://localhost:9200/checkpoints/_search"); // Local ES instance

    app.constant("ELASTIC_SEARCH", "https://search-hubportal-test-3ag2xfrjvpj2xs4tn37tz7fwnq.us-east-1.es.amazonaws.com/checkpoints/_search"); // AWs ES sandbox instance

    app.constant("SERVICE_ENVIRONMENT", "Development");
}());
