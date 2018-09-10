(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("TransactionLookupCtrl",
            [
                "ProcessList",
                "ClientList",
                "TransactionTypeList",
                "TransactionResource",
                TransactionLookupCtrl
            ]);

    function TransactionLookupCtrl(ProcessList, ClientList, TransactionTypeList, TransactionResource) {
        var vm = this;
        vm.processList = ProcessList;
        vm.clientList = ClientList;
        vm.transactionTypeList = TransactionTypeList;
        vm.loading = false;
        // Passed into the tabset directive
        vm.setSearchType = function (searchType) { vm.form.searchType = searchType; };
        // Passed into the tabset directive
        vm.setLookupType = function (lookupType) { vm.form.lookupType = lookupType; };
        // The order in which the transactions appear in the paginated list. Used in the ng-repeat orderBy filter
        vm.transactionSortCriteria = "+transactionTime";
        // Current page of the pagination. Used in the ng-repeat startFrom filter to determine the starting index
        // of the results to display
        vm.currentPage = 0;
        // The resource used to access the api, passed to the submit directive
        vm.transactionResource = TransactionResource;
        // The manner in which to display the results of the transaction search (list or count)
        vm.resultDisplay = "list";

        // Angularjs doesn't play nice with date inputs, so have to do some work
        // to make the dates adhere to the correct format. Probably a cleaner way to do it somehow. Meh.
        var date = new Date();
        var startTime = new Date(date.setMonth(date.getMonth() - 3));
        // Variable to indicate "include all" for any select element.
        vm.INCLUDE_ALL = "All"
        vm.form = {
            accountNumber: "",
            amount: "",
            authorizationCode: "",
            carID: "",
            checkpoint: vm.INCLUDE_ALL,
            claimNumber: "",
            client: vm.INCLUDE_ALL,
            creditCardNumber: "",
            csr: "",
            ctu: "",
            destination: vm.INCLUDE_ALL,
            // Datetime inputs only like the dates to be in this format. Dont care about seconds or milliseconds
            endTime: new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate(), (new Date()).getHours(), (new Date()).getMinutes(), 0),
            failed: vm.INCLUDE_ALL,
            fnolNumber: "",
            genericSearchString: "",
            includeGenericStringInTransaction: "",
            invoiceNumber: "",
            lookupType: "coverage",
            maxTime: "",
            minTime: "",
            orderID: "",
            partNumber: "",
            pingOptions: vm.INCLUDE_ALL,
            policyNumber: "",
            process: vm.INCLUDE_ALL,
            promoCode: "",
            referralDate: undefined,
            referralNumber: "",
            searchType: "process",
            serverName: "",
            sessionID: "",
            shopNumber: "",
            source: vm.INCLUDE_ALL,
            // Datetime inputs only like the dates to be in this format. Dont care about seconds or milliseconds
            startTime: new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate(), (new Date()).getHours() - 2, (new Date()).getMinutes(), 0),
            subCompany: "",
            transactions: [],
            transactionsPerPage: "250",
            transactionType: vm.INCLUDE_ALL,
            warehouseNumber: "",
            workOrderID: "",
            workOrderNumber: "",
            zipCode: ""
        }

        /*
         * Potentially a bad idea, but simplest solution to ensure local date when posting dates to api.
         * Javascript submits dates in UTC format, but they need to be local time to ensure correct query results.
         * Time zone doesnt matter since its just looking for the timestamp that is in the database.
         * AngularJS wont allow you to submit a string while bound to a datetime input.
         */
        Date.prototype.toJSON = function () {
            // Just remove the offset added for universal time, then convert to iso string.
            var adjustedHour = this.getHours() - (this.getTimezoneOffset() / 60);
            var localDate = new Date(this.getFullYear(), this.getMonth(), this.getDate(), adjustedHour, this.getMinutes(), 0);
            return localDate.toISOString();
        }

        vm.submit = function () {
            vm.loading = true;
            TransactionResource.post({ action: "PostData" }, vm.form).$promise.then(
                function (response) {
                    // Map all the start times to a date object, so they can be properly displayed and sorted
                    response.map(transaction => transaction.transactionTime = new Date(transaction.transactionTime));
                    // If no results, push empty string so the table will show
                    if (response.length < 1) response.push("");
                    vm.form.transactions = response;
                    vm.loading = false;
                }, function (error) {
                    console.log("Unable to post form data", error);
                });
        };
    }
}());
