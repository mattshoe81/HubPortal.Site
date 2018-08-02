(function () {
    "use strict";
    var app = angular.module("shared.directives");
    app.directive("hpPager", hpPager);

    app.filter("pager", function () {
        return function (input, start) {
            return input.slice(start);
        }
    })

    function hpPager() {
        return {
            restrict: "E",
            templateUrl: "app/shared/directives/pagerDirective.html",
            controller: pagerCtrl,
            controllerAs: "pager",
            bindToController: {
                currentPageModel: "=",
                itemCount: "=",
                itemsPerPage: "="
            },
            scope: {}
        };
    }

    var pagerCtrl = function ($scope) {
        var pager = this;
        // item count will change often, must watch
        $scope.$watch("pager.itemCount", function (newValue, oldValue) {
            initializePagination();
        }, true);
        $scope.$watch("pager.itemsPerPage", function (newValue, oldValue) {
            initializePagination();
        }, true);
        pager.pageButtonStart = 1;
        pager.data = [];
        pager.numberOfPages = 1;
        pager.pagerStart = 0;
        for (var i = 0; i < pager.itemCount; i++) {
            pager.data.push("Item " + i);
        }
        pager.calculateNumberOfPages = function () {
            var pagecount = Math.ceil(pager.itemCount / pager.itemsPerPage);
            pager.numberOfPages = pagecount;
        }
        pager.adjustPagers = function () {
            pager.pagerStart = Math.floor(pager.currentPageModel / 10);
        }
        pager.updatePagination = function () {
            pager.adjustCurrentPage(0);
            pager.adjustPagers();
            initializePagination();
        }
        pager.adjustCurrentPage = function (newPage) {
            pager.currentPageModel = newPage;
            pager.adjustPagers();
        }
        function initializePagination() {
            pager.currentPageModel = 0;
            pager.pageButtonStart = 1;
            pager.data = [];
            pager.pagerStart = 0;
            pager.q = '';
            for (var i = 0; i < pager.itemCount; i++) {
                pager.data.push("Item " + i);
            }
            pager.calculateNumberOfPages();
        }
    };
}());