(function () {
    "use strict";

    angular
        .module("reports")
        .controller("SuccessReportGraphsCtrl", [SuccessReportGraphsCtrl]);

    function SuccessReportGraphsCtrl() {
        var vm = this;
        vm.title = "Success Report Graphs";
    }
}());