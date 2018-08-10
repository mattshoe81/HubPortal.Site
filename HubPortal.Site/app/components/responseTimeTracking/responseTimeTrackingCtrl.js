(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("ResponseTimeTrackingCtrl", [ResponseTimeTrackingCtrl]);

    function ResponseTimeTrackingCtrl() {
        var vm = this;
        vm.title = "Response Time Tracking";
    }
}());