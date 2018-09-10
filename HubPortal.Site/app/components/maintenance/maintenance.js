(function () {
    "use strict";

    var app = angular.module("maintenance", ["ui.router", "shared.services", "shared.directives", "ui", "filters"]);

    app.config(function ($provide) {
        $provide.decorator("$exceptionHandler",
            ["$delegate",
                function ($delegate) {
                    return function (exception, cause) {
                        exception.message = "Something went wrong \n Message:\n" + exception.message;

                        $delegate(exception, cause);

                        console.log(exception.message);
                    };
                }
            ]);
    });

    app.config(["$stateProvider",
        "$urlRouterProvider",
        function ($stateProvider, $urlRouterProvider) {
            var ROUTE_PREFIX = "/HubPortal/maintenance/";
            $urlRouterProvider.otherwise(ROUTE_PREFIX + "new/process");
            $stateProvider
                .state("newProcess", {
                    url: ROUTE_PREFIX + "new/process",
                    templateUrl: "app/components/maintenance/newProcess/newProcessView.html",
                    controller: "NewProcessCtrl as vm"
                })
        }]);
}());