(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("ProcessStatusCtrl",
            ["ActiveProcesses",
                "InactiveProcesses",
                "ProcessResource",
                "TransactionResource",
                "QueryBuilderService",
                "PingService",
                "$q",
                ProcessStatusCtrl]);

    function ProcessStatusCtrl(ActiveProcesses, InactiveProcesses, ProcessResource, TransactionResource, QueryBuilderService, PingService, $q) {
        var vm = this;
        vm.process = {
            active: ActiveProcesses,
            inactive: InactiveProcesses
        };

        //vm.testPing = function (process) {
        //    process.loading = true;
        //    console.log("Pretending to ping '" + process.processName + "'");
        //    PingService.test(process.processName)
        //        .then(
        //            function (response) {
        //                process.loading = false;
        //                console.log(response);
        //            }, function (error) {
        //                process.loading = false;
        //                console.log(error);
        //            }
        //        );
        //}

        vm.transactions = [];
        var queryString = "FINDALL transaction WHERE";
        vm.getProcessActivity = function (process) {
            process.loading = true;
            var symbols = QueryBuilderService.symbols;
            var queryString = QueryBuilderService.getQuery(symbols.FINDALL, symbols.TRANSACTION);
            queryString += QueryBuilderService.refinement(symbols.PROCESS_NAME, process.processName);
            TransactionResource.post({ action: "Query", queryString: queryString }).$promise.then(
                function (response) {
                    // Map all the start times to a date object
                    response.map(transaction => transaction.transactionTime = new Date(transaction.transactionTime));
                    // Map null elapsed times to 0
                    response.map(transaction => transaction.totalElapsedTime ? void 0 : transaction.totalElapsedTime = 0);
                    // If no results, push empty string so the table will show
                    if (response.length < 1) response.push("");
                    vm.transactions = response;
                    process.loading = false;
                }, function (error) {
                    console.log("Unable to Get Transactions", error);
                    process.loading = false;
                });
        }

        // Dictates the order in which the processes appear in the ng-repeat
        // They are sorted by their success status
        vm.comparator = function (successStatus1, successStatus2) {
            var order = ["P", "C", "S", "I", "D"];
            var result = order.indexOf(successStatus1.value) - order.indexOf(successStatus2.value);
            return result;
        };

        function formatProcess(process) {
            if (process.pingTime) process.pingTime = new Date(process.pingTime);
            if (process.successPingTime) process.successPingTime = new Date(process.successPingTime);
            if (process.pingable === "N" || process.pingable === "n") process.status = "D";
            process.active = process.status !== "D"
            process.disabled = false;
            process.pingable = process.pingable === 'Y' || process.pingable === 'y';
            process.pingDesirable = process.pingDesirable === 'Y' || process.pingDesirable === 'y';
        }

        $q.all([ActiveProcesses.$promise, InactiveProcesses.$promise]).then(function () {
            angular.forEach(ActiveProcesses, function (process) {
                formatProcess(process);
                process.loading = false;
            });
            angular.forEach(InactiveProcesses, function (process) {
                formatProcess(process);
            });
            vm.process.active = ActiveProcesses;
            vm.process.inactive = InactiveProcesses;
        });
    }
}());
