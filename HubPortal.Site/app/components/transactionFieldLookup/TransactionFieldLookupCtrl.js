(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("TransactionFieldLookupCtrl", [TransactionFieldLookupCtrl]);

    function TransactionFieldLookupCtrl() {
        var vm = this;
        vm.title = "Transaction Field Lookup";
    }
}());