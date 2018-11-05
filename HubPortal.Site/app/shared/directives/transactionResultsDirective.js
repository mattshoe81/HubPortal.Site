(function () {
    "use strict";
    var app = angular.module("shared.directives");
    app.directive("hpTransactionResults", hpTransactionResults);

    function hpTransactionResults() {
        return {
            restrict: "E",
            templateUrl: "app/shared/directives/transactionResultsDirective.html",
            controller: resultsCtrl,
            controllerAs: "results",
            bindToController: {
                transactions: "<",
                transactionsPerPage: "<",
                displayType: "<"
            },
            scope: {}
        };
    }

    var resultsCtrl = function ($scope) {
        var results = this;
        results.transactionsPerPage = 250;
        // If there is no value passed to the directive for displayType, set it to list by default
        $scope.$watch("results.displayType", function (newValue, oldValue) {
            if (!newValue) {
                results.displayType = "list";
            }
        }, true);
        // The order in which the transactions appear in the paginated list. Used in the ng-repeat orderBy filter
        results.transactionSortCriteria = "+transTime";
        // Current page of the pagination. Used in the ng-repeat startFrom filter to determine the starting index
        // of the results to display
        results.currentPage = 0;
    };
}());
