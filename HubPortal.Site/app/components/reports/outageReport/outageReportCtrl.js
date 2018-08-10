(function () {
    "use strict";

    angular
        .module("reports")
        .controller("OutageReportCtrl", [OutageReportCtrl]);

    function OutageReportCtrl() {
        var vm = this;
        vm.title = "Outage Report";
    }
}());