(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("ProcessStatusCtrl", [ProcessStatusCtrl]);

    function ProcessStatusCtrl() {
        var vm = this;
        vm.title = "Process Status Page";
    }
}());