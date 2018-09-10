(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("CheckpointEmbeddedMessageCtrl", ["CheckpointMessage", CheckpointEmbeddedMessageCtrl]);

    function CheckpointEmbeddedMessageCtrl(CheckpointMessage) {
        var vm = this;
        vm.message = "";
        CheckpointMessage.$promise.then(function (response) {
            angular.forEach(response, function (char) {
                vm.message += char;
            });
        });
    }
}());
