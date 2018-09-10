(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("TransactionDetailCtrl", ["TransactionDetail", "Checkpoints", "$q", TransactionDetailCtrl]);

    function TransactionDetailCtrl(TransactionDetail, Checkpoints, $q) {
        var vm = this;
        vm.transaction = TransactionDetail;
        vm.checkpoints = Checkpoints;
        var previousCheckpointTime = 0;

        TransactionDetail.$promise.then(function (details) {
            vm.transaction = details;
            console.log(details);
            vm.transaction.hasCoverageInfo = hasCoverageInfo(vm.transaction);
            vm.transaction.hasCreditCardInfo = hasCreditCardInfo(vm.transaction);
            vm.transaction.hasWholesaleInfo = hasWholesaleInfo(vm.transaction);
            vm.transaction.hasShopInfo = hasShopInfo(vm.transaction);
            // Format Y or N to Yes or No
            vm.transaction.successful === "Y" || vm.transaction.successful === "y" ? vm.transaction.successful = "Yes" : vm.transaction.successful = "No";
            vm.transaction.ping === "Y" || vm.transaction.ping === "y" ? vm.transaction.ping = "Yes" : vm.transaction.ping = "No";
        });
        Checkpoints.$promise.then(function (checkpoints) {
            // Initialize the previousCheckpointTime if not null
            if (checkpoints[0]) {
                checkpoints[0].time = new Date(checkpoints[0].time);
                previousCheckpointTime = checkpoints[0].time.getTime();
            }
            // Calculate the elapsed time for each checkpoint (and convert UTC strings to date objects)
            angular.forEach(checkpoints, function (checkpoint) {
                checkpoint.time = new Date(checkpoint.time);
                checkpoint.elapsedTime = Math.abs(checkpoint.time.getTime() - previousCheckpointTime) / 1000.0;
                previousCheckpointTime = checkpoint.time.getTime();
            })

            vm.checkpoints = checkpoints;
        });
        // Need transaction and checkpoints to build location message. so have to wait until they're both resolved
        $q.all([TransactionDetail.$promise, Checkpoints.$promise]).then(function () {
            vm.checkpoints.map(checkpoint => checkpoint.location = generateLocationMessage(checkpoint, vm.transaction));
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

        function hasCoverageInfo(detail) {
            return detail.policyNumber
                || detail.referralNumber
                || detail.claimNumber
                || detail.csr
                || detail.subCompany
                || detail.referralDate
                || detail.partNumber
                || detail.zipCode
                || detail.carId
                || detail.promoCode;
        }
        function hasCreditCardInfo(detail) {
            return detail.creditCardNumber
                || detail.amount
                || detail.ctu
                || detail.workOrderNumber
                || detail.authCode
                || detail.workOrderId;
        }
        function hasWholesaleInfo(detail) {
            return detail.accountNumber
                || detail.orderId
                || detail.warehouseNumber;
        }
        function hasShopInfo(detail) {
            return detail.invoiceNumber
                || detail.shopNumber;
        }
    }
}());
