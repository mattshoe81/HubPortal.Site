(function () {
    "use strict";

    angular
        .module("reports")
        .controller("TransactionVolumeGraphsCtrl", [TransactionVolumeGraphsCtrl]);

    function TransactionVolumeGraphsCtrl() {
        var vm = this;
        vm.title = "Transaction Volume Graphs";
    }
}());