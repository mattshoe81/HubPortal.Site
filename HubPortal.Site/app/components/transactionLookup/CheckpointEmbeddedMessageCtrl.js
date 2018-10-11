(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("CheckpointEmbeddedMessageCtrl", ["CheckpointMessage", CheckpointEmbeddedMessageCtrl]);

    function CheckpointEmbeddedMessageCtrl(CheckpointMessage) {
        var vm = this;
        vm.message = "Loading...";
        CheckpointMessage.$promise.then(function (message) {
            vm.message = message.messageData;
        }, function (error) {
            console.log("Unable to fetch checkpoint message", error.message);
            message = "Unable to load checkpoint data";
        });
    }
}());
