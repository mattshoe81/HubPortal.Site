(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("TransactionDetailCtrl", ["Checkpoints", TransactionDetailCtrl]);

    function TransactionDetailCtrl(Checkpoints) {
        var vm = this;
        vm.transaction = {};
        vm.checkpoints = [];
        vm.zipApi = "";
        var previousCheckpointTime = 0;

        // Process the checkpoints for this transaction once they're resolved
        Checkpoints.$promise.then(function (results) {
            var checkpoints = [];
            angular.forEach(results.hits.hits, function (searchResult) {
                var checkpoint = searchResult._source;
                checkpoint.id = searchResult._id;
                if (checkpoint.process) vm.transaction = checkpoint;
                checkpoints.push(checkpoint);
            });

            // Determine what kind of info to display
            vm.transaction.hasCoverageInfo = hasCoverageInfo(vm.transaction);
            vm.transaction.hasCreditCardInfo = hasCreditCardInfo(vm.transaction);
            vm.transaction.hasWholesaleInfo = hasWholesaleInfo(vm.transaction);
            vm.transaction.hasShopInfo = hasShopInfo(vm.transaction);

            // Format Y or N to Yes or No
            vm.transaction.successful === "Y" || vm.transaction.successful === "y" ? vm.transaction.successful = "Yes" : vm.transaction.successful = "No";
            vm.transaction.ping === "Y" || vm.transaction.ping === "y" ? vm.transaction.ping = "Yes" : vm.transaction.ping = "No";

            // Calculate the elapsed time for each checkpoint and convert unix epoch number to date objects,
            // and generate the location messages for each checkpoint
            checkpoints[0].time = new Date(checkpoints[0].time);
            previousCheckpointTime = checkpoints[0].time.getTime();
            angular.forEach(checkpoints, function (checkpoint) {
                checkpoint.location = generateLocationMessage(checkpoint, vm.transaction)
                checkpoint.time = new Date(checkpoint.time);
                checkpoint.elapsedTime = Math.abs(checkpoint.time.getTime() - previousCheckpointTime) / 1000.0;
                previousCheckpointTime = checkpoint.time.getTime();
            });

            vm.checkpoints = checkpoints;
        });

        function generateLocationMessage(checkpoint, transaction) {
            var location = "";
            switch (checkpoint.location) {
                case "OUTBOUND_REQUEST":
                    location = "Request sent to " + transaction.destination;
                    break;
                case "OUTBOUND_RESPONSE":
                    location = "Response sent to " + transaction.source;
                    break;
                case "INBOUND_REQUEST":
                    location = "Request received from " + transaction.source;
                    break;
                case "INBOUND_RESPONSE":
                    location = "Response received from " + transaction.destination;
                    break;
                case "INTRAHUB_REQUEST":
                    location = "Intrahub Request";
                    break;
                case "INTRAHUB_RESPONSE":
                    location = "Intrahub Response";
                    break;
                default:
                    location = checkpoint.location;
                    break;
            }
            return location;
        }

        vm.hasEmbeddedMessage = function (checkpoint) {
            var match1 = checkpoint.checkpointType.match('.*WS.*');
            var match2 = checkpoint.checkpointType.match('.*Web Service.*');
            var match3 = checkpoint.checkpointType.match('.*WebService.*');
            var result = Boolean(match1) || Boolean(match2) || Boolean(match3);
            return result;
        };

        function hasCoverageInfo(detail) {
            return Boolean(detail.policyNumber)
                || Boolean(detail.referralNumber)
                || Boolean(detail.claimNumber)
                || Boolean(detail.csr)
                || Boolean(detail.subCompany)
                || Boolean(detail.referralDate)
                || Boolean(detail.partNumber)
                || Boolean(detail.zipCode)
                || Boolean(detail.carId)
                || Boolean(detail.promoCode);
        }
        function hasCreditCardInfo(detail) {
            var result = Boolean(detail.creditCardNumber)
                || Boolean(detail.amount)
                || Boolean(detail.ctu)
                || Boolean(detail.workOrderNumber)
                || Boolean(detail.authCode)
                || Boolean(detail.workOrderId);
            return result;
        }
        function hasWholesaleInfo(detail) {
            return Boolean(detail.accountNumber)
                || Boolean(detail.orderId)
                || Boolean(detail.warehouseNumber);
        }
        function hasShopInfo(detail) {
            return Boolean(detail.invoiceNumber)
                || Boolean(detail.shopNumber);
        }
    }
}());
