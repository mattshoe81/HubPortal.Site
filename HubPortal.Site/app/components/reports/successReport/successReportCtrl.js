(function () {
    "use strict";

    angular
        .module("reports")
        .controller("SuccessReportCtrl", [SuccessReportCtrl]);

    function SuccessReportCtrl() {
        var vm = this;
        vm.title = "Success Report";
    }
}());