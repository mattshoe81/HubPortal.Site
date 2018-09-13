(function () {
    "use strict";

    var app = angular.module("maintenance", ["ui.router", "shared.services", "shared.directives", "ui", "filters"]);

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
