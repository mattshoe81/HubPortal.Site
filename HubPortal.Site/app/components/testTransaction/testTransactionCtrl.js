(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("TestTransactionCtrl", [TestTransactionCtrl]);

    function TestTransactionCtrl() {
        var vm = this;
        vm.title = "Test Transaction";
    }
}());