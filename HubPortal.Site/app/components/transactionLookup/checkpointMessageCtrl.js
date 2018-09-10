(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("CheckpointMessageCtrl", ["CheckpointMessage", CheckpointMessageCtrl]);

    function CheckpointMessageCtrl(CheckpointMessage) {
        var vm = this;
        vm.message = CheckpointMessage;
    }
}());
