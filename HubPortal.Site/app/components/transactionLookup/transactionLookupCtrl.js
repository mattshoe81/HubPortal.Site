(function () {
    "use strict";

    angular
        .module("hubPortal")
        .controller("TransactionLookupCtrl",
            [
                "ProcessList",
                "ClientList",
                "TransactionTypeList",
                "$http",
                // filter and scope needed for pagination
                "$filter",
                "$scope",
                TransactionLookupCtrl
            ]);

    function TransactionLookupCtrl(ProcessList, ClientList, TransactionTypeList, $http, $filter, $scope) {
        var vm = this;

        vm.searchType = "process";
        vm.title = "The Main Page"
        vm.processList = ProcessList;
        vm.clientList = ClientList;
        vm.transactionTypeList = TransactionTypeList;
        vm.noResults = false;

        vm.hideTransactionDetails = false;
        vm.hideLookup = true;
        vm.hideOutput = true;

        vm.setSearchType = function (searchType) {
            vm.formModels.searchType = searchType;
        };
        vm.setLookupType = function (lookupType) {
            vm.formModels.lookupType = lookupType;
        }
        vm.transactionSortCriteria = '+processName';

        // Angularjs doesn't play nice with date inputs, so have to do some work
        var date = new Date();
        var startDate = new Date(date.setMonth(date.getMonth() - 3));
        date = new Date();
        var startTime = new Date(date.setHours(date.getHours() - 2));
        var endTime = new Date();
        vm.formModels = {
            transactions: [],
            searchType: "process",
            process: "All",
            client: "All",
            source: "All",
            destination: "All",
            transactionType: "All",
            startDate: startDate,
            endDate: new Date(),
            startTime: new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours(), startTime.getMinutes(), 0),
            endTime: new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), endTime.getHours(), endTime.getMinutes(), 0),
            minTime: "",
            maxTime: "",
            pingOptions: "0",
            failed: "-1",
            fnolNumber: "",
            serverName: "",
            sessionID: "",
            ignore: "",
            policyNumber: "",
            referralNumber: "",
            csr: "",
            referralDate: new Date(),
            zipCode: "",
            promoCode: "",
            creditCardNumber: "",
            ctu: "",
            authorizationCode: "",
            accountNumber: "",
            orderID: "",
            invoiceNumber: "",
            genericSearchString: "",
            includeGenericStringInTransaction: "",
            claimNumber: "",
            subCompany: "",
            partNumber: "",
            carID: "",
            amount: "",
            workOrderNumber: "",
            workOrderID: "",
            warehouseNumber: "",
            shopNumber: "",
            checkpoint: "1",
            fullListing: "true",
            pagination: true,
            transactionsPerPage: "25",
            lookupType: "generic"
        }

        /*
         * Pagination Stuff
         */
        vm.currentPage = 0;
        vm.data = [];
        vm.q = '';
        vm.getData = function () {
            return $filter('filter')(vm.data, vm.q);
        }
        $scope.$watch('q', function (newValue, oldValue) {
            if (oldValue != newValue) {
                vm.currentPage = 0;
            }
        }, true);

        vm.submit = function () {
            var button = document.getElementById("submit-button");
            button.disabled = true;
            button.textContent = "Loading...";
            $http({
                method: 'POST',
                url: "http://localhost:55626/api/TransactionLookup/Post",
                data: vm.formModels,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function (response) {
                    // Angularjs refuses to allow strings to model for date inputs, 
                    // so must convert the response data before updating models
                    startTime = new Date(response.data.startTime);
                    endTime = new Date(response.data.endTime);
                    response.data.startTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), startTime.getHours(), startTime.getMinutes(), 0)
                    response.data.endTime = new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), endTime.getHours(), endTime.getMinutes(), 0);
                    response.data.startDate = new Date(response.data.startDate);
                    response.data.endDate = new Date(response.data.endDate);
                    response.data.referralDate = new Date(response.data.referralDate);
                    vm.formModels = response.data;
                    if (vm.formModels.transactions.length < 1) {
                        vm.formModels.transactions.push("");
                    }
                    button.disabled = false;
                    button.textContent = "Submit";
                },
                function (error) {
                    console.log("Post Error", error);
                    button.disabled = false;
                    button.textContent = "Submit";
                });
        }
    }
}());