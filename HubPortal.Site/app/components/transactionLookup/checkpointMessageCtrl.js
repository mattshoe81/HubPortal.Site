(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("CheckpointMessageCtrl", ["CheckpointMessage", CheckpointMessageCtrl]);

    function CheckpointMessageCtrl(CheckpointMessage) {
        var vm = this;
        vm.message = "Loading...";

        CheckpointMessage.$promise.then(function (result) {
            vm.message = vkbeautify.xml(result.hits.hits[0]._source.message);
        })
    }
}());
