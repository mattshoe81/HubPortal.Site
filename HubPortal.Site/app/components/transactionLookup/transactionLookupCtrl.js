(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("TransactionLookupCtrl",
            [
                "ProcessList",
                "ClientList",
                "TransactionTypeList",
                TransactionLookupCtrl
            ]);

    function TransactionLookupCtrl(ProcessList, ClientList, TransactionTypeList) {
        var vm = this;
        vm.processList = ProcessList;
        vm.clientList = ClientList;
        vm.transactionTypeList = TransactionTypeList;
        // Passed into the tabset directive
        vm.setSearchType = function (searchType) { vm.form.searchType = searchType; };
        // Passed into the tabset directive
        vm.setLookupType = function (lookupType) { vm.form.lookupType = lookupType; };
        // The order in which the transactions appear in the paginated list. Used in the ng-repeat orderBy filter
        vm.transactionSortCriteria = '+processName';
        // Current page of the pagination. Used in the ng-repeat startFrom filter to determine the starting index
        // of the results to display
        vm.currentPage = 0;

        // Angularjs doesn't play nice with date inputs, so have to do some work
        // to make the dates adhere to the correct format. Probably a cleaner way to do it somehow. Meh.
        var date = new Date();
        var startDate = new Date(date.setMonth(date.getMonth() - 3));
        date = new Date();
        var startTime = new Date(date.setHours(date.getHours() - 2));
        vm.form = {
            accountNumber: "",
            amount: "",
            authorizationCode: "",
            carID: "",
            checkpoint: "All",
            claimNumber: "",
            client: "All",
            creditCardNumber: "",
            csr: "",
            ctu: "",
            destination: "All",
            // C# only likes the dates to be in this format?
            endTime: new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate(), (new Date()).getHours(), (new Date()).getMinutes(), 0),
            failed: "",
            fnolNumber: "",
            fullListing: "true",
            genericSearchString: "",
            includeGenericStringInTransaction: "",
            invoiceNumber: "",
            lookupType: "coverage",
            maxTime: "",
            minTime: "",
            orderID: "",
            partNumber: "",
            pingOptions: "",
            policyNumber: "",
            process: "All",
            promoCode: "",
            referralDate: undefined,
            referralNumber: "",
            searchType: "process",
            serverName: "",
            sessionID: "",
            shopNumber: "",
            source: "All",
            // C# only likes the dates to be in this format?
            startTime: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime.getHours(), startTime.getMinutes(), 0),
            subCompany: "",
            transactions: [],
            transactionsPerPage: "25",
            transactionType: "All",
            warehouseNumber: "",
            workOrderID: "",
            workOrderNumber: "",
            zipCode: ""
        }
        vm.onSubmit = function () {
            if (!vm.form.amount) vm.form.amount = 0;
        }
        vm.onSubmitResponse = function (response) {
            if (!response.data.amount) response.data.amount = "";
            if (response.data.length < 1) response.data.push("");
            vm.form.transactions = response.data;
        }
    }
}());