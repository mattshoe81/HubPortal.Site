(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("TransactionDetailCtrl", ["TransactionDetail", "Checkpoints", "API", "$q", TransactionDetailCtrl]);

    function TransactionDetailCtrl(TransactionDetail, Checkpoints, API, $q) {
        var vm = this;
        vm.transaction = TransactionDetail;
        vm.checkpoints = Checkpoints;
        vm.zipApi = "";
        var previousCheckpointTime = 0;

        TransactionDetail.$promise.then(function (details) {
            vm.transaction = details;
            vm.transaction.hasCoverageInfo = hasCoverageInfo(vm.transaction);
            vm.transaction.hasCreditCardInfo = hasCreditCardInfo(vm.transaction);
            vm.transaction.hasWholesaleInfo = hasWholesaleInfo(vm.transaction);
            vm.transaction.hasShopInfo = hasShopInfo(vm.transaction);
            // Format Y or N to Yes or No
            switch (vm.transaction.successful) {
                case "Y":
                    vm.transaction.successful = "Yes";
                    break;
                case "N":
                    vm.transaction.successful = "No";
                    break;
                case "U":
                    vm.transaction.successful = "Unknown";
                    break;
                case "-":
                    vm.transaction.successful = "-";
                    break;
                default:
                    vm.transaction.successful = "Unknown";
                    break;
            }
            vm.transaction.ping === "Y" || vm.transaction.ping === "y" ? vm.transaction.ping = "Yes" : vm.transaction.ping = "No";
            // Don't think i like this. Straightforward enough, but hacky
            vm.zipApi = API.replace(":controller", "Transaction").replace(":action", "Zip") + "?id=" + vm.transaction.transactionId;
        });
        Checkpoints.$promise.then(function (checkpoints) {
            // Initialize the previousCheckpointTime if not null
            if (checkpoints[0]) {
                checkpoints[0].time = new Date(checkpoints[0].time);
                previousCheckpointTime = checkpoints[0].time.getTime();
            }
            // Calculate the elapsed time for each checkpoint and convert UTC strings to date objects
            angular.forEach(checkpoints, function (checkpoint) {
                checkpoint.time = new Date(checkpoint.time);
                checkpoint.elapsedTime = Math.abs(checkpoint.time.getTime() - previousCheckpointTime) / 1000.0;
                previousCheckpointTime = checkpoint.time.getTime();
                checkpoint.embeddedMessageLink = API.replace(":controller", "Checkpoint").replace(":action", "GetEmbeddedMessage") + "?checkpointid=" + checkpoint.checkpointId + "&location=" + checkpoint.location;
                checkpoint.messageLink = API.replace(":controller", "Checkpoint").replace(":action", "GetMessage") + "?checkpointid=" + checkpoint.checkpointId;
            });
            vm.checkpoints = checkpoints;
        });
        // Need transaction and checkpoints to build location messages, so have to wait until they're both resolved
        $q.all([TransactionDetail.$promise, Checkpoints.$promise]).then(function () {
            vm.checkpoints.map(checkpoint => checkpoint.locationMessage = generateLocationMessage(checkpoint, vm.transaction));
        });

        function generateLocationMessage(checkpoint, transaction) {
            var locationMessage = "";
            switch (checkpoint.location) {
                case "OUTBOUND_REQUEST":
                    locationMessage = "Request sent to " + transaction.destination;
                    break;
                case "OUTBOUND_RESPONSE":
                    locationMessage = "Response sent to " + transaction.source;
                    break;
                case "INBOUND_REQUEST":
                    locationMessage = "Request received from " + transaction.source;
                    break;
                case "INBOUND_RESPONSE":
                    locationMessage = "Response received from " + transaction.destination;
                    break;
                case "INTRAHUB_REQUEST":
                    locationMessage = "Intrahub Request";
                    break;
                case "INTRAHUB_RESPONSE":
                    locationMessage = "Intrahub Response";
                    break;
                default:
                    locationMessage = checkpoint.location;
                    break;
            }
            return locationMessage;
        }

        vm.hasEmbeddedMessage = function (checkpoint) {
            var match1 = checkpoint.type.match('.*WS.*');
            var match2 = checkpoint.type.match('.*Web Service.*');
            var match3 = checkpoint.type.match('.*WebService.*');
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
